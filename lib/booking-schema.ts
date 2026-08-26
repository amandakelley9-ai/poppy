import { z } from "zod";
import { bookingEventTypes, serviceStyles } from "@/content/events";

/** Today as YYYY-MM-DD in local time — used to reject past event dates. */
export function todayISO(): string {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

/**
 * One schema, imported by both the form and the API route, so the client and
 * the server can never drift apart. The server re-parses every submission —
 * client validation is a convenience, not a control.
 */
export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(40),

  eventType: z.enum(bookingEventTypes, {
    message: "Please choose an event type.",
  }),

  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose your event date.")
    .refine((v) => v >= todayISO(), "Please choose a date in the future."),

  startTime: z.string().trim().max(40).optional().or(z.literal("")),
  duration: z.string().trim().max(80).optional().or(z.literal("")),

  venueName: z.string().trim().max(160).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  zip: z.string().trim().max(20).optional().or(z.literal("")),

  guestCount: z.coerce
    .number({ message: "Please enter an estimated guest count." })
    .int("Please enter a whole number.")
    .min(1, "Please enter at least 1 guest.")
    .max(100_000, "That looks too large — please contact us directly."),

  serviceStyles: z.array(z.enum(serviceStyles)).default([]),

  setting: z.enum(["Indoor", "Outdoor", "Both", "Not sure"]).optional(),

  budget: z.string().trim().max(120).optional().or(z.literal("")),
  referral: z.string().trim().max(200).optional().or(z.literal("")),
  details: z.string().trim().max(4000).optional().or(z.literal("")),

  consent: z.literal(true, {
    message: "Please confirm we can contact you about your event.",
  }),

  /* --- spam controls, never shown to a real visitor --- */

  /**
   * Honeypot. A bot fills it; a human never sees it.
   *
   * Deliberately permissive here — if the schema rejected a filled honeypot,
   * the bot would get a validation error naming the field and learn about the
   * trap. The route accepts it, drops it, and reports success instead.
   */
  company: z.string().max(200).optional(),

  /** Milliseconds since epoch when the form mounted. */
  startedAt: z.coerce.number().optional(),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;

/** Anything faster than this is a script, not a person filling in a form. */
export const MIN_FILL_MS = 3_000;
