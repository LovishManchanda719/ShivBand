import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
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
    page("/contact", 0.9),
    page("/guides", 0.6),
    ...GUIDES.map((g) => ({ ...page(`/guides/${g.slug}`, 0.6), lastModified: new Date(g.updated) })),
    page("/gallery/photos", 0.8, "weekly"),
    page("/gallery/videos", 0.7, "weekly"),
    page("/reviews", 0.7, "weekly"),
    page("/feedback", 0.4),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
