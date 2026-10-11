import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiv Band & Light House",
    short_name: "Shiv Band",
    description:
      "Shiv Band & Light House (Since 1996) — Best Wedding Band, Baraat Band, Ghodi, Flower Baggi, Punjabi Dhol Wale & Fancy Lighting in Krishna Nagar, New Delhi.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#b91c1c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
