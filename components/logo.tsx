import { PoppyBloom } from "./poppy";

/**
 * The horizontal wordmark lockup.
 *
 * The 2026 logo ships stacked only — every supplied variant is square-ish, and
 * at the header's 36–40px the stacked lockup's "POPPY", "EST 2026" and tagline
 * collapse into noise. So the header lockup is rebuilt horizontally: the traced
 * tulip beside live text, rather than a bitmap squeezed into the wrong ratio.
 *
 * Live text also means the wordmark stays sharp at any density and reflows on
 * narrow screens, which a fixed-ratio image could not.
 *
 * The tulip is decorative — the adjacent text carries the accessible name.
 */
export function Logo({
  tone = "burgundy",
  className = "",
}: {
  tone?: "burgundy" | "cream";
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <PoppyBloom tone={tone} className="h-full w-auto shrink-0" />
      <span
        className={`whitespace-nowrap font-medium uppercase leading-none tracking-[0.13em] ${
          tone === "cream" ? "text-cream" : "text-poppy"
        }`}
      >
        Poppy Crêpes
      </span>
    </span>
  );
}
