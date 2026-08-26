import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/catering", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/menu", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/book", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/find-us", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
