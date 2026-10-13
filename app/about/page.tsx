import type { Metadata } from "next";
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
      <Section>
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Our story</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">poppy at heart</h1>
          </Reveal>
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
