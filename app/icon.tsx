import { ImageResponse } from "next/og";
import { POPPY_TRANSFORM, POPPY_SILHOUETTE, POPPY_DARK, POPPY_LIGHT } from "@/content/poppy-paths";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the traced poppy bloom on the brand cream. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdf8f3",
        }}
      >
        <svg width="56" height="55" viewBox="0 0 700 688">
          <g transform={POPPY_TRANSFORM}>
            <path fill="#000000" d={POPPY_SILHOUETTE} />
            <path fill="#d61a21" d={POPPY_DARK} />
            <path fill="#ed1b24" d={POPPY_LIGHT} />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
