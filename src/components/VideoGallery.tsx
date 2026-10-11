"use client";

import React, { useEffect, useState } from "react";
import { Play, X, Youtube } from "lucide-react";
import { getVideos, type Video } from "@/lib/firebase";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

const ytId = (url: string) =>
  url?.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1] || null;

// Shows only videos added through the admin panel. No placeholder videos.
export default function VideoGallery() {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [playing, setPlaying] = useState<Video | null>(null);

  useEffect(() => {
    getVideos()
      .then((v) => setVideos(v.filter((x) => ytId(x.youtubeLink))))
      .catch(() => setVideos([]));
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  if (videos === null) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-video animate-pulse rounded-2xl bg-sand" />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-white px-6 py-14 text-center">
        <Youtube className="mx-auto h-9 w-9 text-maroon" strokeWidth={1.25} />
        <p className="mt-4 font-display text-2xl text-ink">Watch us on YouTube</p>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-stone">Our latest baraat videos are on our YouTube channel.</p>
        <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
          Open YouTube channel
        </a>
      </div>
    );
  }

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => {
          const id = ytId(v.youtubeLink)!;
          return (
            <li key={v.id}>
              <button
                onClick={() => {
                  setPlaying(v);
                  trackEvent("gallery_video_play", { video_id: v.id, title: v.title });
                }}
                className="group block w-full text-left"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ivory/95 text-maroon shadow-lg transition-transform group-hover:scale-105">
                      <Play className="ml-0.5 h-5 w-5 fill-current" strokeWidth={1.5} />
                    </span>
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl leading-snug text-ink">{v.title}</h2>
                {v.description && <p className="mt-1 line-clamp-2 text-[14px] text-stone">{v.description}</p>}
              </button>
            </li>
          );
        })}
      </ul>

      {playing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4" role="dialog" aria-modal="true" onClick={() => setPlaying(null)}>
          <button onClick={() => setPlaying(null)} aria-label="Close video" className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-ivory hover:bg-white/10">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId(playing.youtubeLink)}?autoplay=1&rel=0`}
              title={playing.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
