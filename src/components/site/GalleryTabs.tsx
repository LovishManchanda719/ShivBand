import Link from "next/link";
import { Camera, Play } from "lucide-react";

interface GalleryTabsProps {
  active: "photos" | "videos";
}

export default function GalleryTabs({ active }: GalleryTabsProps) {
  return (
    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 p-1.5 shadow-sm backdrop-blur-sm">
      <Link
        href="/gallery/photos"
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium tracking-[0.05em] transition-all ${
          active === "photos"
            ? "bg-maroon text-ivory shadow-sm"
            : "text-stone hover:text-ink hover:bg-sand/60"
        }`}
        aria-current={active === "photos" ? "page" : undefined}
      >
        <Camera className="h-4 w-4" strokeWidth={1.75} />
        Photos
      </Link>
      <Link
        href="/gallery/videos"
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium tracking-[0.05em] transition-all ${
          active === "videos"
            ? "bg-maroon text-ivory shadow-sm"
            : "text-stone hover:text-ink hover:bg-sand/60"
        }`}
        aria-current={active === "videos" ? "page" : undefined}
      >
        <Play className="h-4 w-4" strokeWidth={1.75} />
        Videos
      </Link>
    </div>
  );
}
