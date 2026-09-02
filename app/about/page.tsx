import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeading, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PoppyBloom } from "@/components/poppy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind Poppy Crêpes — a mobile crêperie serving ${site.serviceArea}.`,
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-0">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Our story</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">poppy at heart</h1>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              {/* 4:5 portrait — the house format for people shots. */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-cream-deep">
                <Image
                  src="/images/about/owner.jpg"
                  alt="[[ TODO: describe the owner or team in this photo ]]"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={80} className="space-y-6 text-lg leading-relaxed">
              <p>
                Poppy Crêpes started with a griddle, a trailer, and the conviction that a
                crêpe is only as good as the minute it comes off the pan. So we don&apos;t make
                them ahead. Everything is folded to order, in front of you.
              </p>
              <p>
                We&apos;re women-owned and homegrown — started by a local who traded a career in
                tech for the warmth of a kitchen and brought the craft back home. These days
                the trailer turns up at weddings, corporate days, school fundraisers and
                whatever else the valley is celebrating.
              </p>
              <p>
                {/* TODO: replace with the real founding story — this is a
                    reconstruction from the previous site's copy. */}
                The menu stays small on purpose. Four crêpes we&apos;re proud of, two for the
                kids, and coffee worth drinking. Done properly beats done widely.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why the poppy */}
      <Section band>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <PoppyBloom className="mx-auto h-20 w-auto" />
            <SectionHeading
              eyebrow="Why the poppy"
              title="the red poppies of alpine"
              lede="We're named for the grove of wild red poppies in Alpine, Utah, where our founder grew up — the ones that come back every summer in the foothills, uninvited and impossible to miss. Growing up there, you learn to stop the car for them. It's a small reminder of how easily this state hands you something worth pulling over for."
            />
          </Reveal>
        </Container>
      </Section>

      <Section className="py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">come find us — or have us come to you</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/book">Book an Event</Button>
              <Button href="/find-us" variant="burgundy-outline">
                See where we&apos;ll be
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
