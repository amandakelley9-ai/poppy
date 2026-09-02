import { Container, Section, Button } from "@/components/ui";
import { PoppyStem } from "@/components/poppy";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <PoppyStem className="mx-auto h-40 w-auto" />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-gold-ink">
            404
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl">this one didn&apos;t fold</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            The page you&apos;re after isn&apos;t here. The crêpes very much still are.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/">Back home</Button>
            <Button href="/menu" variant="burgundy-outline">
              See the menu
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
