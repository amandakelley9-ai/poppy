import { Container, Eyebrow, Button } from "./ui";
import { PoppyStem } from "./poppy";
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
      {/* Cropped stem, bleeding off the right edge. Decorative. */}
      <PoppyStem
        className={`pointer-events-none absolute -right-14 -top-[6%] hidden h-[132%] opacity-95 md:block ${
          full ? "lg:-right-6" : "lg:-right-14"
        }`}
      />
      {/* On narrow screens the stem sits behind the copy at low opacity
          instead of beside it, so it never crowds the text. */}
      <PoppyStem className="pointer-events-none absolute -right-24 top-0 h-full opacity-20 md:hidden" />

      <Container className={full ? "relative py-24 sm:py-28 lg:py-36" : "relative py-16 sm:py-20"}>
        {/* The notched gold frame from the menu board's catering banner. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 inset-y-8 border border-gold/35 sm:inset-x-8 lg:inset-y-14"
          style={{
            clipPath:
              "polygon(0 18px, 18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px))",
          }}
        />

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
