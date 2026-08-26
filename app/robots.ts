import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Emitted as a static file at build time (required by `output: "export"`).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
