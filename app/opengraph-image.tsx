import { ImageResponse } from "next/og";
import { POPPY_VIEWBOX, POPPY_TRANSFORM, POPPY_MARK } from "@/content/poppy-paths";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time (required by `output: "export"`).
export const dynamic = "force-static";
export const alt = `${site.name} — ${site.descriptor}`;

const BURGUNDY = "#6f0e10";
const CREAM = "#faf2e6";

/**
 * Share card: the cream mark reversed out of the burgundy field, matching the
 * `logo-reversed-panel` variant, centred with generous margins.
 *
 * next/og can't load next/font, so the wordmark uses the system geometric
 * stack rather than Poppins. Close enough at share-card size; if an exact
 * match matters, fetch the Poppins .ttf here and pass it via `fonts`.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BURGUNDY,
          fontFamily: "Helvetica, Arial, sans-serif",
          padding: "76px 96px",
        }}
      >
        <svg width="150" height="142" viewBox={POPPY_VIEWBOX}>
          <g transform={POPPY_TRANSFORM}>
            <path fill={CREAM} d={POPPY_MARK} />
          </g>
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 86,
            lineHeight: 1,
            letterSpacing: "0.13em",
            color: CREAM,
            marginTop: 44,
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 27,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "rgba(250,242,230,0.72)",
            marginTop: 26,
          }}
        >
          {site.descriptor}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(250,242,230,0.9)",
            marginTop: 40,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
