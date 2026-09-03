import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Emitted as a static file at build time (required by `output: "export"`).
export const dynamic = "force-static";

/**
 * Last date the *content* of the mostly-static pages actually changed. Bump it
 * when you edit copy, not on every deploy.
 *
 * This is deliberately not `new Date()`. The deploy workflow rebuilds daily to
 * keep the trailer schedule current, and stamping every page as modified every
 * day teaches Google to distrust lastmod — the signal stops meaning anything
 * exactly when a real change (the rebrand) needs to be noticed.
 *
 * The two schedule-driven pages are the exception: their content genuinely does
 * change day to day, so for them "today" is honest.
 */
const CONTENT_REVISED = new Date("2026-09-03T00:00:00Z");

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const, scheduleDriven: true },
  { path: "/catering", priority: 0.9, changeFrequency: "monthly" as const, scheduleDriven: false },
  { path: "/menu", priority: 0.8, changeFrequency: "monthly" as const, scheduleDriven: false },
  { path: "/book", priority: 0.8, changeFrequency: "yearly" as const, scheduleDriven: false },
  { path: "/find-us", priority: 0.7, changeFrequency: "daily" as const, scheduleDriven: true },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" as const, scheduleDriven: false },
];

/**
 * Brand images listed against the home page so the crawler is pointed at the
 * current logo and share card directly, rather than waiting to rediscover them
 * through the markup.
 */
const brandImages = [
  `${site.url}/images/logo/logo-primary.png`,
  `${site.url}/og-image.png`,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map(({ path, priority, changeFrequency, scheduleDriven }) => ({
    url: `${site.url}${path}`,
    lastModified: scheduleDriven ? now : CONTENT_REVISED,
    changeFrequency,
    priority,
    ...(path === "" ? { images: brandImages } : {}),
  }));
}
