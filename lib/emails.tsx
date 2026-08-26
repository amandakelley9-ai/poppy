import { site } from "@/content/site";
import type { BookingData } from "./booking-schema";

const CREAM = "#fdf8f3";
const CREAM_DEEP = "#f9efe3";
const BURGUNDY = "#700a06";
const INK = "#000000";
const GOLD = "#c9a06a";
const HAIRLINE = "#e3d6c6";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Every row of the inquiry, in the order it was asked. */
function summaryRows(d: BookingData): [string, string][] {
  const location = [d.venueName, d.city, d.zip].filter(Boolean).join(", ");
  return (
    [
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Event type", d.eventType],
      ["Event date", formatDate(d.eventDate)],
      ["Start time", d.startTime],
      ["Service duration", d.duration],
      ["Location", location],
      ["Guest count", String(d.guestCount)],
      ["Service style", d.serviceStyles.join(", ")],
      ["Indoor / outdoor", d.setting],
      ["Budget range", d.budget],
      ["Heard about us", d.referral],
      ["Details", d.details],
    ] as [string, string | undefined][]
  ).filter((row): row is [string, string] => Boolean(row[1]));
}

function rowsHtml(rows: [string, string][]) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${HAIRLINE};color:${INK};opacity:.65;font-size:13px;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${HAIRLINE};color:${INK};font-size:15px;vertical-align:top;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");
}

/** Poppy motif as an inline SVG data URI, so it renders without an attachment. */
const poppyMark = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="${BURGUNDY}" d="M12 2c2.6 0 4.4 2 4.9 4.4 2.2-.9 4.5.2 5.1 2.3.6 2.1-.9 4-3.1 4.4 1.3 1.8 1 4.2-.9 5.4-1.8 1.2-4.1.6-5.2-1.3-1.1 1.9-3.4 2.5-5.2 1.3-1.9-1.2-2.2-3.6-.9-5.4-2.2-.4-3.7-2.3-3.1-4.4C4.2 6.6 6.5 5.5 8.7 6.4 9.2 4 11 2 12 2Z"/></svg>`;

/** The inquiry that lands in the business inbox. */
export function inquiryEmail(d: BookingData) {
  const rows = summaryRows(d);
  return {
    subject: `New Event Inquiry — ${d.eventType} — ${d.eventDate} — ${d.name}`,
    html: `<!doctype html>
<html><body style="margin:0;padding:0;background:${CREAM};">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${GOLD};">New event inquiry</p>
    <h1 style="margin:0 0 24px;font-size:28px;line-height:1.15;color:${BURGUNDY};font-weight:600;">${escapeHtml(d.name)} — ${escapeHtml(d.eventType)}</h1>
    <table style="width:100%;border-collapse:collapse;">${rowsHtml(rows)}</table>
    <p style="margin:26px 0 0;font-size:13px;color:${INK};opacity:.6;">Reply directly to this email to reach ${escapeHtml(d.name)}.</p>
  </div>
</body></html>`,
    text: rows.map(([l, v]) => `${l}: ${v}`).join("\n"),
  };
}

/** The branded confirmation the customer receives. */
export function autoReplyEmail(d: BookingData) {
  const rows = summaryRows(d).filter(([label]) =>
    ["Event type", "Event date", "Guest count", "Location", "Service style"].includes(label),
  );

  return {
    subject: `We got your inquiry — ${site.name}`,
    html: `<!doctype html>
<html><body style="margin:0;padding:0;background:${CREAM};">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div style="text-align:center;">
      ${poppyMark}
      <p style="margin:10px 0 0;font-size:22px;letter-spacing:-.02em;color:${INK};font-weight:600;">poppy crêpes</p>
      <p style="margin:4px 0 0;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${GOLD};">${site.descriptor}</p>
    </div>

    <h1 style="margin:34px 0 0;font-size:32px;line-height:1.1;color:${BURGUNDY};font-weight:600;letter-spacing:-.02em;">thanks, ${escapeHtml(d.name.split(" ")[0])}</h1>
    <p style="margin:14px 0 0;font-size:16px;line-height:1.65;color:${INK};">
      We have your inquiry and we'll come back to you within <strong>${site.responseTime}</strong> with availability and a menu built for your event.
    </p>

    <div style="margin:28px 0 0;background:${CREAM_DEEP};border-radius:10px;padding:22px 24px;">
      <p style="margin:0 0 12px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${GOLD};">What you sent us</p>
      <table style="width:100%;border-collapse:collapse;">${rowsHtml(rows)}</table>
    </div>

    <p style="margin:26px 0 0;font-size:15px;line-height:1.65;color:${INK};">
      Anything to add in the meantime, just reply to this email or call
      <a href="tel:${site.phoneHref}" style="color:${BURGUNDY};">${site.phone}</a>.
    </p>

    <p style="margin:34px 0 0;padding-top:20px;border-top:1px solid ${HAIRLINE};font-size:13px;color:${INK};opacity:.6;">
      ${site.name} · ${site.tagline}<br>Serving ${site.serviceArea}.
    </p>
  </div>
</body></html>`,
    text: `Thanks, ${d.name.split(" ")[0]} — we have your inquiry and will reply within ${site.responseTime}.\n\n${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\n${site.name} · ${site.tagline}`,
  };
}
