import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeading, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PoppyBullet } from "@/components/poppy";
import { menuSections, drinks, dietaryLegend, type MenuItem } from "@/content/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Sweet and savory crêpes folded to order, kids' crêpes, and coffee — the full Poppy Crêpes menu.",
};

function Item({ item }: { item: MenuItem }) {
  return (
    <article className="grid gap-5 sm:grid-cols-[200px_1fr] sm:gap-7">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-cream-deep sm:aspect-square">
        <Image
          src={item.image ?? `/images/crepes/${item.slug}.jpg`}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover"
        />
      </div>

      <div className="sm:py-1">
        <div className="flex items-baseline gap-4">
          <PoppyBullet className="mt-1.5 h-5 w-auto shrink-0 self-start" />
          <h3 className="flex-1 text-2xl sm:text-3xl">{item.name}</h3>
          <span className="shrink-0 font-semibold text-ink/75">{item.price}</span>
        </div>

        <p className="mt-3 leading-relaxed text-ink/75 sm:pl-8">{item.description}</p>

        {(item.tags.length > 0 || item.savory) && (
          <ul className="mt-4 flex flex-wrap gap-2 sm:pl-8">
            {item.savory && (
              <li className="rounded-full border border-hairline px-3 py-1 text-xs font-medium text-ink/70">
                Savory
              </li>
            )}
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-hairline px-3 py-1 text-xs font-semibold text-ink/70"
              >
                <abbr title={dietaryLegend[tag]} className="no-underline">
                  {tag}
                </abbr>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function MenuPage() {
  return (
    <>
      <Section className="pb-0">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>The Menu</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">made fresh, folded to order</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              Everything comes off the griddle when you order it. Sweet, savory, and
              something for the smallest guests too.
            </p>
          </Reveal>
        </Container>
      </Section>

      {menuSections.map((section, index) => (
        <Section key={section.id} id={section.id} band={index % 2 === 1}>
          <Container>
            <Reveal>
              <SectionHeading eyebrow={section.eyebrow} title={section.heading} lede={section.blurb} />
            </Reveal>

            <div className="mx-auto mt-14 grid max-w-4xl gap-12">
              {section.items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 60}>
                  <Item item={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* Coffee & drinks — a list on the board, so a list here. */}
      <Section band={menuSections.length % 2 === 1}>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Coffee & Drinks" title="something to go with it" />
          </Reveal>

          <Reveal className="mx-auto mt-14 max-w-2xl">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {drinks.map((drink) => (
                <li key={drink.name} className="flex items-baseline gap-4 py-4">
                  <PoppyBullet className="h-4 w-auto shrink-0" />
                  <span className="flex-1 text-lg">{drink.name}</span>
                  <span className="font-semibold text-ink/75">{drink.price}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Dietary legend */}
      <Section className="py-14">
        <Container>
          <Reveal className="mx-auto max-w-2xl rounded-[10px] border border-hairline p-6 text-sm text-ink/70">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink">
              Dietary key
            </h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {Object.entries(dietaryLegend).map(([tag, label]) => (
                <li key={tag}>
                  <span className="font-semibold text-ink">{tag}</span> — {label}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Tell us about allergies when you order — we cook everything to order, so we can
              usually work around them.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Custom menus → catering */}
      <Section band className="py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">catering menus are built to order</h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              For events we go beyond the board — custom and seasonal menus, sweet and savory
              side by side, with coffee and winter drinks on the cart.
            </p>
            <div className="mt-8">
              <Button href="/catering">See catering options</Button>
            </div>
            <p className="mt-6 text-sm text-ink/60">
              Or{" "}
              <Link href="/book" className="font-semibold text-poppy underline underline-offset-4">
                send us your date
              </Link>{" "}
              and we&apos;ll build one for you.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
