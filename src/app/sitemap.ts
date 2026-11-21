import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/site";

// Stable release date for static pages prevents false lastmod shifts on every crawler request
const STATIC_LASTMOD = new Date("2026-10-15T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    lastModified: Date = STATIC_LASTMOD
  ) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...SERVICES.map((s) => ({
      ...page(`/services/${s.slug}`, 0.9),
      images: s.images.map((i) => `${SITE_URL}${i.src}`),
    })),
    page("/packages", 0.95, "weekly"),
    page("/locations", 0.9, "weekly"),
    ...LOCATIONS.map((l) => page(`/locations/${l.slug}`, 0.85, "monthly")),
    page("/contact", 0.9),
    page("/guides", 0.7),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7, "monthly", new Date(g.updated))),
    page("/gallery/photos", 0.8, "weekly"),
    page("/gallery/videos", 0.7, "weekly"),
    page("/reviews", 0.7, "weekly"),
    page("/feedback", 0.4),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
