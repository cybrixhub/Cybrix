import type { MetadataRoute } from "next";
import { ALL_SERVICES, SITE, WORK } from "@/lib/site";

// Pinned to the last real content update — change when pages are updated.
const SITE_UPDATED = new Date("2026-08-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...ALL_SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...WORK.map((w) => ({
      url: `${SITE.url}/work/${w.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
