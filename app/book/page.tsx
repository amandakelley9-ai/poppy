import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BookingFormSection } from "@/components/booking-form-section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book an Event",
  description: `Tell us about your event and we'll come back within ${site.responseTime} with availability and a menu.`,
};

export default function BookPage() {
  return (
    <Section>
      <Container>
        <Reveal className="text-center">
          <Eyebrow>Book an event</Eyebrow>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">let&apos;s talk about your day</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            Fill this in with whatever you know so far — nothing has to be final. We&apos;ll come
            back with availability, a menu and a quote.
          </p>
        </Reveal>

        {/* Reassurance + direct contact, above the form so it's seen first. */}
        <Reveal className="mx-auto mt-12 grid max-w-xl gap-4 sm:grid-cols-2">
          <div className="rounded-[10px] border border-hairline p-5 text-center">
            <Clock size={20} className="mx-auto text-poppy" aria-hidden />
            <p className="mt-3 text-sm font-semibold">We reply within {site.responseTime}</p>
          </div>
          <a
            href={`mailto:${site.cateringEmail}`}
            className="rounded-[10px] border border-hairline p-5 text-center transition-colors hover:border-poppy/40"
          >
            <Mail size={20} className="mx-auto text-poppy" aria-hidden />
            <p className="mt-3 break-words text-sm font-semibold">{site.cateringEmail}</p>
          </a>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <BookingFormSection />
        </Reveal>
      </Container>
    </Section>
  );
}
