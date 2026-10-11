import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos — Live Wedding Band & Baraat Performances",
  description:
    "Watch Shiv Band & Light House perform live at baraats across Delhi NCR — brass band, dhol wale, ghodi and chhatri lights.",
  alternates: { canonical: "/gallery/videos" },
};

export default function VideoGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
