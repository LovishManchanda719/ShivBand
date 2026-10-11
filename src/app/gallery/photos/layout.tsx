import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery — Baraat Band, Ghodi, Baggi & Lights",
  description:
    "Photos of Shiv Band & Light House baraats in Delhi: brass band, decorated ghodi, flower baggi, dhol wale and crystal chhatri lights.",
  alternates: { canonical: "/gallery/photos" },
};

export default function PhotoGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
