import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Wedding Band & Barat Performance Videos",
  description:
    "Watch live wedding brass band, Punjabi dhol, and fancy light house performance videos by Shiv Band & Light House, Krishna Nagar, Delhi.",
  alternates: {
    canonical: "/gallery/videos",
  },
};

export default function VideoGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
