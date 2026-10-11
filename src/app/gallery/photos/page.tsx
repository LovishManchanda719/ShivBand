"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { db } from "@/lib/firebaseConfig";
import { trackEvent } from "@/lib/analytics";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import { LOCAL_PHOTOS, canonicalPhotoUrl } from "@/lib/photos";

interface Photo {
  id: string;
  url: string;
  title: string;
}



const resolve = (raw: string) =>
  /^(https?:\/\/|data:image\/|\/)/.test(raw) ? raw : `/images/${raw}`;

export default function PhotoGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>(LOCAL_PHOTOS);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "photos"), orderBy("datePosted", "desc")));
        const uploaded: Photo[] = [];
        snap.docs.forEach((d) => {
          const data = d.data();
          const url = canonicalPhotoUrl(resolve(String(data.url || data.src || "")));
          if (!url || url === "/images/") return;
          uploaded.push({ id: d.id, url, title: String(data.title || "Shiv Band & Light House") });
        });
        const localUrls = new Set(LOCAL_PHOTOS.map((p) => p.url));
        const locals = LOCAL_PHOTOS;
        const seen = new Set<string>();
        const unique = [...uploaded.filter((p) => !localUrls.has(p.url)), ...locals].filter((p) => {
          const key = p.url.startsWith("data:") ? p.url.slice(0, 200) + p.url.length : p.url;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setPhotos(unique);
      } catch {
        /* keep local photos */
      }
    })();
  }, []);

  const close = () => setIndex(null);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), [photos.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % photos.length)), [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, prev, next]);

  const open = (i: number) => {
    setIndex(i);
    trackEvent("gallery_photo_view", { photo_id: photos[i].id, title: photos[i].title, source: "gallery" });
  };

  const current = index !== null ? photos[index] : null;

  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Photos", path: "/gallery/photos" },
        ]}
        eyebrow="Gallery"
        title={
          <>
            Photos from our <em className="italic text-maroon">baraats</em>
          </>
        }
        intro="Band, ghodi, baggi, dhol and lights — real photos from Shiv Band & Light House, Krishna Nagar."
      />

      <section className="container pb-24">
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {photos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => open(i)}
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-sand text-left sm:mb-4"
              aria-label={`Open photo: ${p.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.title}
                loading={i < 4 ? "eager" : "lazy"}
                className="photo-grade h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-[13px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {p.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      {current && index !== null && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink/95" role="dialog" aria-modal="true" aria-label={current.title}>
          <div className="flex items-center justify-between px-5 py-4 text-ivory">
            <p className="text-[12px] uppercase tracking-[0.2em] text-ivory/60">
              {index + 1} / {photos.length}
            </p>
            <button onClick={close} aria-label="Close" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="relative flex-1" onClick={close}>
            <Image src={current.url} alt={current.title} fill sizes="100vw" className="object-contain p-4" unoptimized={!current.url.startsWith("/")} />
          </div>
          <div className="flex items-center justify-between gap-4 px-5 pb-8 pt-4 text-ivory">
            <button onClick={prev} aria-label="Previous photo" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <p className="text-center font-display text-lg">{current.title}</p>
            <button onClick={next} aria-label="Next photo" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
