import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingSchema, MIN_FILL_MS } from "@/lib/booking-schema";
import { inquiryEmail, autoReplyEmail } from "@/lib/emails";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

export const runtime = "nodejs";

/** Best-effort client IP, for rate limiting only. */
function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many inquiries from this connection. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Never trust the client: the same schema runs again here.
  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  if (data.company) {
    // Report success so the bot doesn't learn it was caught.
    return NextResponse.json({ ok: true });
  }

  // Timestamp: a human cannot complete this form in under a few seconds.
  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = inquiryEmail(data);
  const autoReply = autoReplyEmail(data);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL ?? site.cateringEmail;
  const from = process.env.BOOKING_FROM_EMAIL;

  // In development without Resend configured, log the payload instead of
  // failing, so the form is testable before the account exists.
  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("[booking] RESEND_API_KEY or BOOKING_FROM_EMAIL missing in production.");
      return NextResponse.json(
        { error: "We couldn't send that just now. Please email us directly." },
        { status: 500 },
      );
    }

    console.info(
      "\n[booking] Resend not configured — inquiry logged instead of sent.\n" +
        `  to:      ${to}\n` +
        `  subject: ${inquiry.subject}\n` +
        `  replyTo: ${data.email}\n\n` +
        inquiry.text +
        "\n",
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);

  try {
    const sent = await resend.emails.send({
      from,
      to,
      replyTo: data.email, // so a plain reply reaches the customer
      subject: inquiry.subject,
      html: inquiry.html,
      text: inquiry.text,
    });

    if (sent.error) {
      console.error("[booking] inquiry send failed:", sent.error);
      return NextResponse.json(
        { error: "We couldn't send that just now. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[booking] inquiry send threw:", error);
    return NextResponse.json(
      { error: "We couldn't send that just now. Please email us directly." },
      { status: 502 },
    );
  }

  // The customer's copy is a courtesy — if it fails, the inquiry still landed,
  // so the visitor should still see success.
  try {
    await resend.emails.send({
      from,
      to: data.email,
      replyTo: to,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    });
  } catch (error) {
    console.error("[booking] auto-reply failed (inquiry was delivered):", error);
  }

  return NextResponse.json({ ok: true, delivered: true });
}
