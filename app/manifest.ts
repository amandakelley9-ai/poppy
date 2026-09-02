import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Rendered once at build time (required by `output: "export"`).
export const dynamic = "force-static";

/**
 * Web app manifest. The icons are the cream tulip reversed out of a burgundy
 * ground — at 16–32px the burgundy-on-cream outline mark all but disappears,
 * so the reversed treatment is what keeps the glyph legible small.
 *
 * `icon-512-maskable` carries extra padding so Android's mask can crop to a
 * circle or squircle without clipping the tulip.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.descriptor}`,
    short_name: site.name,
    description: site.positioning,
    start_url: "/",
    display: "standalone",
    background_color: "#faf2e6",
    theme_color: "#6f0e10",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
