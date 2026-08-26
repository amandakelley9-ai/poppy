import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { HolidayBand } from "@/components/holiday-band";
import { MenuCard } from "@/components/menu-card";
import { Reveal } from "@/components/reveal";
import { PoppyDivider } from "@/components/poppy-divider";
import { Container, Section, SectionHeading, Button, Eyebrow } from "@/components/ui";
import { signatureCrepes } from "@/content/menu";
import { services } from "@/content/events";
import { testimonials } from "@/content/testimonials";
import { futureEntries } from "@/content/schedule";
import { site } from "@/content/site";

export default function HomePage() {
  const upcoming = futureEntries().slice(0, 3);
  const hero = signatureCrepes.find((item) => item.hero)!;
  const rest = signatureCrepes.filter((item) => !item.hero);

  return (
    <>
      <Hero />

      {/* Intro strip */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Image
              src="/images/logo/logo-horizontal.png"
              alt="Poppy Crêpes"
              width={280}
              height={107}
              className="mx-auto h-14 w-auto sm:h-16"
            />
            <p className="mt-8 text-xl leading-relaxed sm:text-2xl">
              We&apos;re a mobile crêperie built around one idea: a crêpe should be folded in
              front of you, not held under a lamp.
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              The trailer rolls up, the griddle goes on, and everything comes off it to
              order — sweet, savory, and served with proper coffee. We cook for weddings,
              corporate days, school events and anything else worth gathering for around{" "}
              {site.serviceArea}.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* What we do */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="three ways to get us there"
              lede="Same griddle, same menu, scaled to whatever the day needs."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.name} delay={i * 80}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-[10px] border border-hairline bg-cream p-8 transition-colors hover:border-poppy/40"
                >
                  <h3 className="text-2xl">{service.name}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-ink/75">{service.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-poppy">
                    Learn more
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Menu preview */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Signature Crêpes"
              title="the ones we're known for"
              lede="Four on the board at any time, folded to order on the griddle."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="sm:col-span-2 lg:col-span-3">
              <MenuCard item={hero} size="hero" />
            </Reveal>
            {rest.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <MenuCard item={item} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Button href="/menu" variant="burgundy-outline">
              See the full menu
            </Button>
          </Reveal>
        </Container>
      </Section>

      <HolidayBand />

      {/* Social proof */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Kind words" title="what people say after" />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-[10px] border border-hairline bg-cream p-8">
                  <blockquote className="flex-1 text-lg leading-relaxed">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="block text-ink/60">{testimonial.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Find us teaser */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Find us"
              title="where the trailer's parked"
              lede="Catch us out in the wild — or book us for your own event."
            />
          </Reveal>

          {upcoming.length > 0 ? (
            <Reveal className="mx-auto mt-12 max-w-3xl">
              <ul className="divide-y divide-hairline border-y border-hairline">
                {upcoming.map((entry) => (
                  <li
                    key={`${entry.date}-${entry.venue}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
                  >
                    <div>
                      <p className="text-lg font-semibold">{entry.venue}</p>
                      <p className="text-sm text-ink/65">{entry.city}</p>
                    </div>
                    <p className="text-sm text-ink/75">
                      {new Date(`${entry.date}T12:00:00`).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      · {entry.startTime}–{entry.endTime}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal className="mt-10 text-center text-ink/70">
              <p>No public dates on the books right now — check back soon.</p>
            </Reveal>
          )}

          <Reveal className="mt-12 text-center">
            <Button href="/find-us" variant="burgundy-outline">
              All upcoming dates
            </Button>
          </Reveal>
        </Container>
      </Section>

      <PoppyDivider />

      {/* Closing booking band */}
      <Section className="pt-8">
        <Container>
          <Reveal className="rounded-[10px] bg-cream-deep px-8 py-16 text-center sm:px-14 sm:py-20">
            <Eyebrow>Book an event</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
              let&apos;s get the griddle to your party
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/75">
              Tell us the date, the headcount and where you are. We&apos;ll come back within{" "}
              {site.responseTime} with availability and a menu.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/book">Book an Event</Button>
              <Button href="/catering" variant="burgundy-outline">
                See catering options
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
