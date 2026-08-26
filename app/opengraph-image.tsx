import { ImageResponse } from "next/og";
import { POPPY_TRANSFORM, POPPY_SILHOUETTE, POPPY_DARK, POPPY_LIGHT } from "@/content/poppy-paths";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.descriptor}`;

/**
 * Share card: the poppy motif over burgundy with the wordmark set in the
 * brand's lowercase geometric voice.
 *
 * next/og can't load next/font, so this uses the system geometric stack rather
 * than Poppins. Close enough for a share card; if an exact match matters, fetch
 * the Poppins .ttf here and pass it via `fonts`.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#700a06",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* Cropped bloom bleeding off the right edge, as on the holiday band. */}
        <svg
          width="620"
          height="609"
          viewBox="0 0 700 688"
          style={{ position: "absolute", right: -110, top: -40 }}
        >
          <g transform={POPPY_TRANSFORM}>
            <path fill="#000000" d={POPPY_SILHOUETTE} />
            <path fill="#d61a21" d={POPPY_DARK} />
            <path fill="#ed1b24" d={POPPY_LIGHT} />
          </g>
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            maxWidth: 720,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#c9a06a",
            }}
          >
            {site.descriptor}
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#fdf8f3",
              marginTop: 22,
            }}
          >
            poppy crêpes
          </div>
          <div style={{ fontSize: 34, color: "rgba(253,248,243,0.85)", marginTop: 26 }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
