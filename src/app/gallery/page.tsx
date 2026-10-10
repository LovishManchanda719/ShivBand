import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";

export const metadata: Metadata = {
  title: "Wedding Photo & Video Gallery",
  description:
    "Explore wedding barat photos and live performance videos by Shiv Band & Light House in Krishna Nagar, Old Govindpura, New Delhi.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function Page() {
  return <GalleryPage />;
}