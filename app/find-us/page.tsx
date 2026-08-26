import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { InstagramIcon } from "@/components/social-icons";
import { futureEntries, regularSpots, fixedLocation } from "@/content/schedule";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Find Us",
  description: `Upcoming dates and locations for the Poppy Crêpes trailer around ${site.serviceArea}.`,
};

function longDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function FindUsPage() {
  const upcoming = futureEntries();

  return (
    <>
      <Section className="pb-0">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Find Us</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">where we&apos;re parked</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              The trailer moves around {site.serviceArea}. Here&apos;s where it&apos;ll be next.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Upcoming dates */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Upcoming" title="dates on the books" />
          </Reveal>

          {upcoming.length > 0 ? (
            <Reveal className="mx-auto mt-14 max-w-3xl">
              <ul className="space-y-4">
                {upcoming.map((entry) => (
                  <li
                    key={`${entry.date}-${entry.venue}`}
                    className="rounded-[10px] border border-hairline p-6 sm:p-7"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="text-2xl">{entry.venue}</h3>
                      <p className="inline-flex items-center gap-2 text-sm font-medium text-ink/75">
                        <CalendarDays size={16} className="text-poppy" aria-hidden />
                        {longDate(entry.date)}
                      </p>
                    </div>

                    <p className="mt-3 inline-flex items-start gap-2 text-sm text-ink/70">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-poppy" aria-hidden />
                      <span>
                        {entry.address}
                        <br />
                        {entry.city}
                      </span>
                    </p>

                    <p className="mt-3 text-sm font-medium">
                      {entry.startTime} – {entry.endTime}
                    </p>

                    {entry.note && <p className="mt-2 text-sm text-ink/60">{entry.note}</p>}

                    {entry.href && (
                      <a
                        href={entry.href}
                        className="mt-4 inline-flex text-sm font-semibold text-poppy underline underline-offset-4"
                      >
                        Event details
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal className="mx-auto mt-12 max-w-xl rounded-[10px] border border-hairline p-10 text-center">
              <p className="text-lg">No public dates on the calendar right now.</p>
              <p className="mt-3 text-ink/70">
                We&apos;re out catering private events — follow along on Instagram for the next
                public stop, or book us for your own.
              </p>
              <div className="mt-8">
                <Button href="/book">Book an Event</Button>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Regular spots */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Regular spots"
              title="where to reliably find us"
              lede="Weather and events permitting — Instagram has the day-of word."
            />
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {regularSpots.map((spot) => (
              <Reveal key={spot.name}>
                <div className="h-full rounded-[10px] border border-hairline bg-cream p-7">
                  <h3 className="text-xl">{spot.name}</h3>
                  <p className="mt-3 text-sm font-medium text-ink/80">{spot.when}</p>
                  <p className="mt-1 text-sm text-ink/65">{spot.where}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Map — only when a fixed location applies */}
      {fixedLocation && (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Our home base" title={fixedLocation.name} />
            </Reveal>
            <Reveal className="mt-12 overflow-hidden rounded-[10px] border border-hairline">
              <iframe
                src={fixedLocation.mapEmbedSrc}
                title={`Map to ${fixedLocation.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/9] w-full"
              />
            </Reveal>
            <Reveal className="mt-6 text-center">
              <Button href={fixedLocation.directionsHref} variant="burgundy-outline">
                Get directions
              </Button>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Day-of updates */}
      <Section className="py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl rounded-[10px] bg-cream-deep px-8 py-14 text-center sm:px-12">
            <h2 className="text-3xl sm:text-4xl">day-of updates live on instagram</h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Weather moves us, lines sell us out. Instagram is where we post what&apos;s
              actually happening.
            </p>
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-[10px] bg-poppy px-6 text-sm font-semibold text-cream transition-colors hover:bg-burgundy"
              >
                <InstagramIcon size={18} />
                Follow @poppycrepes
              </a>
            )}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
