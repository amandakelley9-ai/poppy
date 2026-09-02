import { POPPY_VIEWBOX, POPPY_TRANSFORM, POPPY_MARK } from "@/content/poppy-paths";

/**
 * The tulip motif, traced from the 2026 logo's mark.
 *
 * The artwork is monoline outline work in a single colour, so unlike the
 * retired three-layer bloom there is nothing to tint per-layer. What varies is
 * only which surface it sits on:
 *  - "burgundy" — the brand mark on cream and other light grounds.
 *  - "cream"    — reversed, for the holiday band and any burgundy field.
 *
 * Decorative by default (aria-hidden). Pass a `title` when the motif is the
 * only thing carrying meaning.
 */
type Tone = "burgundy" | "cream";

const toneVar = (tone: Tone) =>
  tone === "cream" ? "var(--color-cream)" : "var(--color-poppy)";

function Mark({ tone }: { tone: Tone }) {
  return (
    <g transform={POPPY_TRANSFORM} stroke="none">
      <path fill={toneVar(tone)} d={POPPY_MARK} />
    </g>
  );
}

export function PoppyBloom({
  className,
  tone = "burgundy",
  title,
}: {
  className?: string;
  tone?: Tone;
  title?: string;
}) {
  return (
    <svg
      viewBox={POPPY_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <Mark tone={tone} />
    </svg>
  );
}

/** Small mark used as the list bullet on the menu page. */
export function PoppyBullet({ className }: { className?: string }) {
  return <PoppyBloom className={className} />;
}
