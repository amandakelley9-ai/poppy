import type { Metadata } from "next";
import { Container, Section, Button } from "@/components/ui";
import { PoppyBloom } from "@/components/poppy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We've got your inquiry.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <PoppyBloom className="mx-auto h-20 w-auto" />
          <h1 className="mt-8 text-5xl sm:text-6xl">that&apos;s with us</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Thanks for getting in touch. We&apos;ll come back to you within{" "}
            <strong className="font-semibold text-ink">{site.responseTime}</strong> with
            availability and a menu built for your event.
          </p>
          <p className="mt-4 text-ink/70">
            Need us sooner? Call{" "}
            <a
              href={`tel:${site.phoneHref}`}
              className="font-semibold text-poppy underline underline-offset-4"
            >
              {site.phone}
            </a>
            .
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/menu" variant="burgundy-outline">
              See the menu
            </Button>
            <Button href="/">Back home</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
