import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The site is hosted on GitHub Pages, which serves static files only, so
   * everything is prerendered to `out/` at build time.
   *
   * Consequences worth knowing:
   *  - There is no server, so no API routes. The booking form posts directly
   *    to a form service — see `site.form` in content/site.ts.
   *  - next/image optimisation needs a server, so it's off. Size and compress
   *    photos before adding them to /public/images; see the dimensions table
   *    in the README.
   */
  output: "export",
  images: { unoptimized: true },

  /** Emits /about/index.html rather than /about.html, so URLs have no extension. */
  trailingSlash: true,
};

export default nextConfig;
