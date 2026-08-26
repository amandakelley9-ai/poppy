import Image from "next/image";
import { Container, Button } from "./ui";
import { site } from "@/content/site";

/**
 * Home hero. Full-bleed photo under a burgundy-to-transparent scrim, with the
 * headline set lowercase and large to echo the wordmark.
 *
 * The scrim runs bottom-heavy so type sits on the darkest part of the image
 * regardless of what the final photograph looks like.
 */
export function Hero() {
  return (
    <section className="on-burgundy relative isolate flex min-h-[clamp(560px,82svh,860px)] items-end overflow-hidden">
      <Image
        src="/images/crepes/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-burgundy via-burgundy/85 to-burgundy/40"
      />

      <Container className="pb-16 pt-32 sm:pb-20 lg:pb-28">
        <div className="max-w-3xl text-cream">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold sm:text-sm">
            {site.descriptor}
          </p>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-8xl">{site.tagline}</h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
            {site.positioning}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/book" variant="poppy">
              Book an Event
            </Button>
            <Button href="/menu" variant="cream-outline">
              See the Menu
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
