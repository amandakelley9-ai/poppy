import type { Metadata } from "next";
import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HolidayBand } from "@/components/holiday-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { BookingFormSection } from "@/components/booking-form-section";
import { eventTypes, howItWorks, included } from "@/content/events";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Catering & Events",
  description: `Live crêpe catering for weddings, corporate events, holiday parties and more across ${site.serviceArea}. Made to order in front of your guests.`,
};

export default function CateringPage() {
  return (
    <>
      {/*
        Taller than the old image hero: the background video is portrait
        (1080x1920), so a short wide band cropped it to an unreadable sliver.
        At this height enough of the plate reads.
      */}
      <section className="on-burgundy relative isolate flex min-h-[clamp(480px,70svh,780px)] items-end overflow-hidden bg-burgundy">
        <HeroVideo
          src="/videos/sweet-savory.mp4"
          poster="/images/catering/sweet-savory-poster.jpg"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-burgundy via-burgundy/85 to-burgundy/40"
        />
        <Container className="pb-14 pt-28 text-cream sm:pb-18">
          <Eyebrow align="left" surface="burgundy">
            Catering & Events
          </Eyebrow>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">book your event</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
            A live crêpe station for your guests — the trailer outside or the cart indoors,
            everything folded to order.
          </p>
        </Container>
      </section>

      {/* Pricing signal, immediately visible */}
      <section className="border-b border-hairline bg-cream-deep">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-center text-sm font-medium sm:text-base">
          <span>
            Packages from <strong className="font-semibold">{site.pricing.startingAt}</strong>
          </span>
          <span aria-hidden className="hidden h-4 w-px bg-hairline sm:block" />
          <span>
            Minimum <strong className="font-semibold">{site.pricing.guestMinimum} guests</strong>
          </span>
          <span aria-hidden className="hidden h-4 w-px bg-hairline sm:block" />
          <span>
            Serving <strong className="font-semibold">Salt Lake &amp; Utah Counties</strong>
          </span>
        </Container>
      </section>

      {/* Event types */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we cater"
              title="every kind of gathering"
              lede="If people are showing up and they'll want feeding, we've probably done it."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((type, i) => (
              <Reveal key={type.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/book?event=${type.slug}`}
                  className="group block h-full overflow-hidden rounded-[10px] bg-cream-deep transition-colors hover:bg-hairline/40"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={type.image ?? `/images/events/${type.slug}.jpg`}
                      alt={type.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      style={type.focal ? { objectPosition: type.focal } : undefined}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl">{type.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{type.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-poppy">
                      Book this
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="four steps, start to finish" />
          </Reveal>

          <ol className="mt-14 grid gap-8 md:grid-cols-4">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} as="li" delay={i * 80}>
                <span className="text-sm font-semibold text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl">{step.step}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{step.blurb}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* What's included */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-cream-deep">
                <Image
                  src="/images/trailer/trailer-exterior.jpg"
                  alt="The Poppy Crêpes trailer set up and ready to serve"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <SectionHeading
                eyebrow="What's included"
                title="we bring everything"
                align="left"
              />
              <ul className="mt-8 space-y-4">
                {included.map((entry) => (
                  <li key={entry} className="flex items-start gap-3">
                    <Check size={20} className="mt-0.5 shrink-0 text-poppy" aria-hidden />
                    <span className="leading-relaxed">{entry}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-ink/65">
                We serve {site.serviceArea}. Travel outside that is quoted up front.
                Event minimum {site.pricing.eventMinimum}.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <HolidayBand variant="banner" />

      {/* FAQ */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="the practical bits" />
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion />
          </Reveal>
        </Container>
      </Section>

      {/* Booking form */}
      <Section id="inquire">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Book an event"
              title="tell us about your day"
              lede={`Send us the details and we'll come back within ${site.responseTime} with availability and a menu.`}
            />
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <BookingFormSection />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
