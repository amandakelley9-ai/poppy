import { POPPY_VIEWBOX, POPPY_TRANSFORM, POPPY_MARK, POPPY_STROKE } from "@/content/poppy-paths";

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

/**
 * The mark on a long sinuous stem with tapered leaves.
 *
 * The mark is the traced logo artwork; the stem and leaves are drawn to match
 * its line language — monoline, open, stroked at POPPY_STROKE so the weight
 * reads as one drawing rather than two. Used as the section divider and, at
 * larger scale, as the bleed element on the holiday band.
 */
export function PoppyStem({
  className,
  tone = "burgundy",
}: {
  className?: string;
  tone?: Tone;
}) {
  const stroke = toneVar(tone);
  return (
    <svg viewBox="0 0 876 1980" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke={stroke} strokeWidth={POPPY_STROKE} strokeLinecap="round">
        {/* stem — one long S-curve continuing the mark's downward point */}
        <path d="M438 806 C 438 1010, 372 1120, 356 1290 C 340 1460, 414 1590, 428 1760 C 436 1848, 432 1912, 424 1960" />
        {/* upper leaf, sweeping right — open outline, not a filled blade */}
        <path d="M372 1196 C 470 1146, 590 1154, 662 1206 C 578 1290, 456 1288, 372 1196 Z" />
        {/* lower leaf, sweeping left */}
        <path d="M392 1548 C 296 1496, 186 1506, 120 1562 C 200 1642, 314 1638, 392 1548 Z" />
      </g>
      <Mark tone={tone} />
    </svg>
  );
}

/** Small mark used as the list bullet on the menu page. */
export function PoppyBullet({ className }: { className?: string }) {
  return <PoppyBloom className={className} />;
}
