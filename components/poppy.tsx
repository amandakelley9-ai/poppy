import { POPPY_VIEWBOX, POPPY_TRANSFORM, POPPY_SILHOUETTE, POPPY_DARK, POPPY_LIGHT } from "@/content/poppy-paths";

/**
 * The poppy motif, traced from the real logo artwork.
 *
 * Two color treatments, both taken from the brand:
 *  - "brand"  — the logo's own two-tone red over black. Used on burgundy and
 *               anywhere the motif should read as the packaging illustration.
 *  - "solid"  — one flat poppy red over black, for smaller sizes on cream
 *               where the two-tone reads as noise.
 *
 * Decorative by default (aria-hidden). Pass a `title` when the motif is the
 * only thing carrying meaning.
 */
type Treatment = "brand" | "solid";

function Bloom({ treatment }: { treatment: Treatment }) {
  return (
    <g transform={POPPY_TRANSFORM} stroke="none">
      <path fill="var(--color-ink)" d={POPPY_SILHOUETTE} />
      <path
        fill={treatment === "brand" ? "var(--color-petal-dark)" : "var(--color-poppy)"}
        d={POPPY_DARK}
      />
      <path
        fill={treatment === "brand" ? "var(--color-petal-light)" : "var(--color-poppy)"}
        d={POPPY_LIGHT}
      />
    </g>
  );
}

export function PoppyBloom({
  className,
  treatment = "brand",
  title,
}: {
  className?: string;
  treatment?: Treatment;
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
      <Bloom treatment={treatment} />
    </svg>
  );
}

/**
 * A single bloom on a long sinuous stem with tapered leaves.
 *
 * The bloom is the traced logo artwork; the stem and leaves are drawn to match
 * its line language (heavy black, monoline, art-nouveau curve). Used as the
 * section divider and — cropped and scaled up — as the bleed element on the
 * holiday band.
 */
export function PoppyStem({
  className,
  treatment = "brand",
}: {
  className?: string;
  treatment?: Treatment;
}) {
  return (
    <svg viewBox="0 0 700 1500" className={className} aria-hidden="true" focusable="false">
      {/* stem — one long S-curve, thick to match the bloom's outline weight */}
      <path
        d="M352 640 C 352 800, 300 880, 286 1010 C 272 1140, 330 1240, 342 1370 C 348 1430, 344 1470, 338 1500"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {/* upper leaf, sweeping right */}
      <path
        d="M300 940 C 380 900, 470 906, 528 946 C 462 1010, 366 1012, 300 940 Z"
        fill="var(--color-ink)"
      />
      {/* lower leaf, sweeping left */}
      <path
        d="M312 1210 C 236 1168, 148 1176, 96 1220 C 160 1282, 250 1280, 312 1210 Z"
        fill="var(--color-ink)"
      />
      <Bloom treatment={treatment} />
    </svg>
  );
}

/** Small bloom used as the list bullet on the menu page. */
export function PoppyBullet({ className }: { className?: string }) {
  return <PoppyBloom className={className} treatment="solid" />;
}
