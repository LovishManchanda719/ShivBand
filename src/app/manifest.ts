import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiv Band & Light House",
    short_name: "Shiv Band",
    description:
      "Shiv Band & Light House, Krishna Nagar, Delhi — wedding band, baraat band, ghodi, flower baggi, dhol wale and chhatri lights since 1996.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F4EE",
    theme_color: "#7A1F2B",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
