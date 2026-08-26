"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { bookingSchema, todayISO, MIN_FILL_MS, type BookingData } from "@/lib/booking-schema";
import { bookingEventTypes, serviceStyles } from "@/content/events";
import { site } from "@/content/site";
import { PoppyBloom } from "./poppy";

type Errors = Partial<Record<string, string>>;

/**
 * Flattens the validated form into the shape the form service posts on.
 *
 * Labels are spelled out because these land in an email as-is — `venueName`
 * reads badly in an inbox, "Venue" doesn't. `email` is named exactly that so
 * the service sets reply-to from it automatically.
 */
function submissionBody(d: BookingData) {
  const location = [d.venueName, d.city, d.zip].filter(Boolean).join(", ");
  return {
    access_key: site.form.accessKey,
    subject: `New Event Inquiry — ${d.eventType} — ${d.eventDate} — ${d.name}`,
    from_name: d.name,
    email: d.email,
    Name: d.name,
    Phone: d.phone,
    "Event type": d.eventType,
    "Event date": d.eventDate,
    "Start time": d.startTime || "—",
    "Service duration": d.duration || "—",
    Location: location || "—",
    "Guest count": String(d.guestCount),
    "Service style": d.serviceStyles.join(", ") || "—",
    "Indoor / outdoor": d.setting ?? "—",
    "Budget range": d.budget || "—",
    "Heard about us": d.referral || "—",
    Details: d.details || "—",
  };
}

/** Field-level error text, tied to its input via aria-describedby. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-poppy">
      {message}
    </p>
  );
}

const settings = ["Indoor", "Outdoor", "Both", "Not sure"] as const;

const inputClass =
  "min-h-[44px] w-full rounded-[10px] border border-hairline bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-poppy";

export function BookingForm() {
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);
  const errorSummary = useRef<HTMLDivElement>(null);
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  /**
   * /book?event=holiday pre-selects Holiday Party. The mapping is explicit so
   * an unknown query value quietly falls through to the default.
   */
  const presetEvent =
    ({ holiday: "Holiday Party", wedding: "Wedding", corporate: "Corporate" } as Record<string, string>)[
      searchParams.get("event") ?? ""
    ] ?? "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const raw = new FormData(form);

    const payload = {
      name: String(raw.get("name") ?? ""),
      email: String(raw.get("email") ?? ""),
      phone: String(raw.get("phone") ?? ""),
      eventType: String(raw.get("eventType") ?? ""),
      eventDate: String(raw.get("eventDate") ?? ""),
      startTime: String(raw.get("startTime") ?? ""),
      duration: String(raw.get("duration") ?? ""),
      venueName: String(raw.get("venueName") ?? ""),
      city: String(raw.get("city") ?? ""),
      zip: String(raw.get("zip") ?? ""),
      guestCount: String(raw.get("guestCount") ?? ""),
      serviceStyles: raw.getAll("serviceStyles").map(String),
      setting: String(raw.get("setting") ?? "") || undefined,
      budget: String(raw.get("budget") ?? ""),
      referral: String(raw.get("referral") ?? ""),
      details: String(raw.get("details") ?? ""),
      consent: raw.get("consent") === "on",
      company: String(raw.get("company") ?? ""),
      startedAt: startedAt.current,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      setFormError("Please check the highlighted fields.");
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }

    // Spam checks. On a static host these run here rather than on a server, so
    // they only stop unsophisticated bots — the form service does the heavier
    // filtering on its end. Both report success so a bot learns nothing.
    if (payload.company) {
      setStatus("sent");
      return;
    }
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }

    if (!site.form.accessKey) {
      setFormError(
        `This form isn't connected yet — please email us at ${site.cateringEmail} and we'll get straight back to you.`,
      );
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");

    try {
      const response = await fetch(site.form.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(submissionBody(parsed.data)),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok || body.success === false) {
        setFormError(
          body.message ??
            `We couldn't send that just now. Please email us at ${site.cateringEmail}.`,
        );
        setStatus("idle");
        requestAnimationFrame(() => errorSummary.current?.focus());
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        `We couldn't reach the server. Please email us at ${site.cateringEmail}.`,
      );
      setStatus("idle");
      requestAnimationFrame(() => errorSummary.current?.focus());
    }
  }

  // Success replaces the form entirely, rather than firing an alert.
  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-[10px] border border-hairline bg-cream-deep p-10 text-center sm:p-14"
      >
        <PoppyBloom className="mx-auto h-14 w-auto" treatment="solid" />
        <h3 className="mt-6 text-3xl sm:text-4xl">that&apos;s with us</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/75">
          Thanks — your inquiry is in. We&apos;ll come back to you within{" "}
          <strong className="font-semibold text-ink">{site.responseTime}</strong> with
          availability and a menu for your event. Check your inbox for a confirmation.
        </p>
        <p className="mt-6 text-sm text-ink/60">
          Need us sooner? Call{" "}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-poppy underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (name: string) => ({
    id: fid(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fid(name)}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Errors are announced, and focus moves here so a screen reader hears them. */}
      <div
        ref={errorSummary}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={formError ? "rounded-[10px] border border-poppy/40 bg-poppy/5 p-4" : "sr-only"}
      >
        {formError && <p className="text-sm font-medium text-poppy">{formError}</p>}
      </div>

      <fieldset className="space-y-5">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink">
          About you
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fid("name")} className="mb-2 block text-sm font-medium">
              Full name <span className="text-poppy">*</span>
            </label>
            <input {...field("name")} type="text" autoComplete="name" required className={inputClass} />
            <FieldError id={`${fid("name")}-error`} message={errors.name} />
          </div>

          <div>
            <label htmlFor={fid("email")} className="mb-2 block text-sm font-medium">
              Email <span className="text-poppy">*</span>
            </label>
            <input {...field("email")} type="email" autoComplete="email" required className={inputClass} />
            <FieldError id={`${fid("email")}-error`} message={errors.email} />
          </div>

          <div>
            <label htmlFor={fid("phone")} className="mb-2 block text-sm font-medium">
              Phone <span className="text-poppy">*</span>
            </label>
            <input {...field("phone")} type="tel" autoComplete="tel" required className={inputClass} />
            <FieldError id={`${fid("phone")}-error`} message={errors.phone} />
          </div>

          <div>
            <label htmlFor={fid("eventType")} className="mb-2 block text-sm font-medium">
              Event type <span className="text-poppy">*</span>
            </label>
            <select {...field("eventType")} required defaultValue={presetEvent} className={inputClass}>
              <option value="">Choose one…</option>
              {bookingEventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError id={`${fid("eventType")}-error`} message={errors.eventType} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink">
          The event
        </legend>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor={fid("eventDate")} className="mb-2 block text-sm font-medium">
              Event date <span className="text-poppy">*</span>
            </label>
            <input {...field("eventDate")} type="date" min={todayISO()} required className={inputClass} />
            <FieldError id={`${fid("eventDate")}-error`} message={errors.eventDate} />
          </div>

          <div>
            <label htmlFor={fid("startTime")} className="mb-2 block text-sm font-medium">
              Start time
            </label>
            <input {...field("startTime")} type="time" className={inputClass} />
          </div>

          <div>
            <label htmlFor={fid("duration")} className="mb-2 block text-sm font-medium">
              Service duration
            </label>
            <input
              {...field("duration")}
              type="text"
              placeholder="e.g. 2 hours"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor={fid("venueName")} className="mb-2 block text-sm font-medium">
              Venue name
            </label>
            <input {...field("venueName")} type="text" className={inputClass} />
          </div>

          <div>
            <label htmlFor={fid("city")} className="mb-2 block text-sm font-medium">
              City
            </label>
            <input
              {...field("city")}
              type="text"
              autoComplete="address-level2"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={fid("zip")} className="mb-2 block text-sm font-medium">
              ZIP
            </label>
            <input
              {...field("zip")}
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fid("guestCount")} className="mb-2 block text-sm font-medium">
              Estimated guests <span className="text-poppy">*</span>
            </label>
            <input
              {...field("guestCount")}
              type="number"
              inputMode="numeric"
              min={1}
              required
              className={inputClass}
            />
            <FieldError id={`${fid("guestCount")}-error`} message={errors.guestCount} />
          </div>

          <div>
            <label htmlFor={fid("budget")} className="mb-2 block text-sm font-medium">
              Budget range <span className="text-ink/60">(optional)</span>
            </label>
            <input {...field("budget")} type="text" className={inputClass} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink">
          What you&apos;d like served
        </legend>
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {serviceStyles.map((style) => (
            <label
              key={style}
              className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm"
            >
              <input
                type="checkbox"
                name="serviceStyles"
                value={style}
                className="size-5 shrink-0 rounded border-hairline accent-poppy"
              />
              {style}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink">
          Indoor or outdoor
        </legend>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {settings.map((option) => (
            <label
              key={option}
              className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm"
            >
              <input
                type="radio"
                name="setting"
                value={option}
                className="size-5 shrink-0 accent-poppy"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink">
          Anything else
        </legend>

        <div>
          <label htmlFor={fid("referral")} className="mb-2 block text-sm font-medium">
            How did you hear about us? <span className="text-ink/60">(optional)</span>
          </label>
          <input {...field("referral")} type="text" className={inputClass} />
        </div>

        <div>
          <label htmlFor={fid("details")} className="mb-2 block text-sm font-medium">
            Additional details
          </label>
          <textarea
            {...field("details")}
            rows={5}
            placeholder="Dietary needs, timing, the vibe you're going for — anything helps."
            className={`${inputClass} min-h-[140px] resize-y`}
          />
        </div>
      </fieldset>

      {/* Honeypot. Hidden from sight and from assistive tech, but a bot fills it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fid("company")}>Company</label>
        <input id={fid("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-3 text-sm">
          <input
            type="checkbox"
            {...field("consent")}
            className="mt-0.5 size-5 shrink-0 rounded border-hairline accent-poppy"
          />
          <span>
            It&apos;s OK to contact me about this event. <span className="text-poppy">*</span>
          </span>
        </label>
        <FieldError id={`${fid("consent")}-error`} message={errors.consent} />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-poppy px-8 text-base font-semibold text-cream transition-colors hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" && <Loader2 size={18} className="animate-spin" aria-hidden />}
          {status === "sending" ? "Sending…" : "Send Inquiry"}
        </button>
        <p className="text-sm text-ink/60">We reply within {site.responseTime}.</p>
      </div>
    </form>
  );
}
