import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { LOCATIONS } from "@/lib/locations";
import { LOCAL_PHOTOS } from "@/lib/photos";
import { SITE, SITE_URL } from "@/lib/site";

// Stable release date for static pages prevents false lastmod shifts on every crawler request
const STATIC_LASTMOD = new Date("2026-11-26T00:00:00.000Z");

// Next.js's built-in sitemap serializer interpolates values directly into XML without escaping.
const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const HOME_IMAGES = [
  `${SITE_URL}/images/vintage-car/red-vintage-car-groom.jpg`,
  `${SITE_URL}/images/shiv-band-luxury-royal-brass-band.jpg`,
  `${SITE_URL}/images/royal-wedding-ghodi-shringar.jpg`,
  `${SITE_URL}/images/royal-flower-baggi-chariot.jpg`,
  `${SITE_URL}/images/shehnai/shehnai-band-baraat.jpg`,
  `${SITE_URL}/images/groom-ghodi-chhatri-lights.jpg`,
  `${SITE_URL}/images/shiv-band-ceremonial-trumpet-player.jpg`,
];

const GALLERY_VIDEOS = [
  {
    title: escapeXml("Shiv Band & Light House — Royal Heritage Baraat Film"),
    thumbnail_loc: escapeXml(`${SITE_URL}/images/shiv-band-luxury-royal-brass-band.jpg`),
    description: escapeXml("Official Shiv Band & Light House wedding brass band, ghodi, flower baggi, Punjabi dhol and chhatri lights showcase in Delhi NCR."),
    content_loc: escapeXml(`${SITE_URL}/videos/shiv-band-royal-heritage-ad.mp4`),
  },
  {
    title: escapeXml("Shiv Band Wedding Baraat Services Reel"),
    thumbnail_loc: escapeXml(`${SITE_URL}/images/shiv-band-brass-band-procession.jpg`),
    description: escapeXml("Live Delhi baraat procession with uniformed brass band, dhol wale and crystal chhatri lights by Shiv Band."),
    content_loc: escapeXml(`${SITE_URL}/videos/shiv-band-services-reel.webm`),
  },
  {
    title: escapeXml("Shiv Band Services Promo"),
    thumbnail_loc: escapeXml(`${SITE_URL}/images/royal-flower-baggi-chariot.jpg`),
    description: escapeXml("Wedding band, decorated white ghodi, flower baggi rath and vintage car services across Delhi NCR."),
    content_loc: escapeXml(`${SITE_URL}/videos/shiv-band-services-promo.webm`),
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    lastModified: Date = STATIC_LASTMOD
  ) => ({
    url: escapeXml(`${SITE_URL}${path}`),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    {
      ...page("/", 1, "weekly"),
      images: HOME_IMAGES.map(escapeXml),
    },
    page("/services", 0.9),
    ...SERVICES.map((s) => ({
      ...page(`/services/${s.slug}`, 0.9),
      images: s.images.map((i) => escapeXml(`${SITE_URL}${i.src}`)),
      ...(s.videos?.length
        ? {
            videos: s.videos.map((v) => ({
              title: escapeXml(`${v.title} — ${SITE.name}`),
              thumbnail_loc: escapeXml(v.poster.startsWith("http") ? v.poster : `${SITE_URL}${v.poster}`),
              description: escapeXml(v.description || `${v.title} by ${SITE.name} in Delhi NCR.`),
              ...(v.src ? { content_loc: escapeXml(v.src.startsWith("http") ? v.src : `${SITE_URL}${v.src}`) } : {}),
              ...(v.youtubeId ? { player_loc: escapeXml(`https://www.youtube-nocookie.com/embed/${v.youtubeId}`) } : {}),
            })),
          }
        : {}),
    })),
    page("/packages", 0.95, "weekly"),
    page("/locations", 0.9, "weekly"),
    ...LOCATIONS.map((l) => page(`/locations/${l.slug}`, 0.85, "monthly")),
    page("/contact", 0.9),
    page("/guides", 0.7),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7, "monthly", new Date(g.updated))),
    {
      ...page("/gallery/photos", 0.8, "weekly"),
      images: LOCAL_PHOTOS.map((p) => escapeXml(`${SITE_URL}${p.url}`)),
    },
    {
      ...page("/gallery/videos", 0.7, "weekly"),
      videos: GALLERY_VIDEOS,
    },
    page("/reviews", 0.7, "weekly"),
    page("/feedback", 0.4),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
