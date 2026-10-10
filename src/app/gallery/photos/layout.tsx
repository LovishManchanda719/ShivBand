import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Barat & Fancy Light House Photo Gallery",
  description:
    "View photos of Shiv Band & Light House royal wedding barat processions, vintage chariot (rath) entries, Punjabi dhol, ghori, and fancy lighting setups across Delhi NCR.",
  alternates: {
    canonical: "/gallery/photos",
  },
};

export default function PhotoGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
