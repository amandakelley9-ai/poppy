import { Container, Eyebrow, Button } from "./ui";
import { PoppyBloom } from "./poppy";
import { holiday, holidayIsActive } from "@/content/holiday";
import Link from "next/link";

function deadlineLabel(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

/**
 * The Holiday & Winter Events band — the visual peak of the site.
 *
 * Full-bleed burgundy with cream type reversed out and a large cropped poppy
 * stem bleeding off the right edge, so the section reads as the crepe cone.
 * `variant="banner"` is the slimmer repeat used on /catering.
 *
 * Renders nothing at all when the band is disabled or out of its date range.
 */
export function HolidayBand({ variant = "full" }: { variant?: "full" | "banner" }) {
  if (!holidayIsActive()) return null;

  const full = variant === "full";

  return (
    <section
      className="on-burgundy relative overflow-hidden bg-burgundy text-cream"
      aria-labelledby="holiday-heading"
    >
      {/* Cropped mark, bleeding off the right edge. Decorative. */}
      <PoppyBloom
        tone="cream"
        className={`pointer-events-none absolute top-1/2 hidden h-[68%] -translate-y-1/2 opacity-95 md:block ${
          full ? "-right-10 lg:-right-4" : "-right-12 lg:-right-8"
        }`}
      />
      {/* On narrow screens the mark sits behind the copy at low opacity
          instead of beside it, so it never crowds the text. */}
      <PoppyBloom tone="cream" className="pointer-events-none absolute -right-16 top-1/2 h-[60%] -translate-y-1/2 opacity-20 md:hidden" />

      <Container className={full ? "relative py-24 sm:py-28 lg:py-36" : "relative py-16 sm:py-20"}>
        <div className={`relative ${full ? "max-w-2xl" : "max-w-3xl"}`}>
          <Eyebrow align="left" surface="burgundy">
            {holiday.eyebrow}
          </Eyebrow>

          <h2
            id="holiday-heading"
            className={`mt-6 ${full ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl"}`}
          >
            {holiday.headline}
          </h2>

          <p
            className={`mt-6 leading-relaxed text-cream/85 ${full ? "text-lg" : "text-base sm:text-lg"}`}
          >
            {holiday.body}
          </p>

          {holiday.weekendsRemaining > 0 && (
            <p className="mt-6 text-sm font-semibold text-cream sm:text-base">
              December dates are limited — {holiday.weekendsRemaining} weekend
              {holiday.weekendsRemaining === 1 ? "" : "s"} remaining.
              {holiday.bookingDeadline && (
                <>
                  {" "}
                  <span className="font-normal text-cream/75">
                    Book by {deadlineLabel(holiday.bookingDeadline)}.
                  </span>
                </>
              )}
            </p>
          )}

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href={holiday.ctaPrimary.href} variant="cream">
              {holiday.ctaPrimary.label}
            </Button>
            <Link
              href={holiday.ctaSecondary.href}
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-cream underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-gold sm:text-base"
            >
              {holiday.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
