"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, PenLine, Quote } from "lucide-react";
import { SITE } from "@/lib/site";
import { subscribeToReviews, type Review } from "@/lib/firebase";

const toDate = (d: unknown): Date | null => {
  if (!d) return null;
  if (d instanceof Date) return d;
  if (typeof d === "object" && d !== null && "toDate" in d && typeof (d as { toDate: unknown }).toDate === "function") {
    return (d as { toDate: () => Date }).toDate();
  }
  if (typeof d === "number" || typeof d === "string") return new Date(d);
  return null;
};

const fmt = (d: Date | null) =>
  d ? d.toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "";

interface Props {
  limit?: number;
  showSummary?: boolean;
}

// Shows only real reviews submitted by customers (Firestore "reviews" collection).
// No placeholder or sample reviews are ever displayed.
export default function ReviewsList({ limit, showSummary = false }: Props) {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    try {
      unsub = subscribeToReviews((all) => {
        const valid = all
          .filter((r) => r && r.comment && r.name)
          .sort((a, b) => (toDate(b.date)?.getTime() || 0) - (toDate(a.date)?.getTime() || 0));
        setReviews(valid);
      });
    } catch {
      setReviews([]);
    }
    return () => unsub?.();
  }, []);

  if (reviews === null) {
    return (
      <div className="grid gap-5 md:grid-cols-3" aria-busy="true">
        {[0, 1, 2].slice(0, limit ?? 3).map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-sand/70" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white/60 px-6 py-12 text-center">
        <p className="font-display text-2xl text-ink">Reviews from our families will appear here.</p>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-stone">
          Booked Shiv Band for your wedding? Tell others how the baraat went.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> Review us on Google
          </a>
          <Link href="/feedback" className="btn-outline">
            <PenLine className="h-4 w-4" strokeWidth={1.75} /> Write one here
          </Link>
        </div>
      </div>
    );
  }

  const shown = limit ? reviews.slice(0, limit) : reviews;
  const avg = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / reviews.length;

  return (
    <div>
      {showSummary && (
        <div className="mb-10 flex flex-wrap items-end gap-x-8 gap-y-3 border-b border-line pb-8">
          <p className="font-display text-6xl leading-none text-ink">{avg.toFixed(1)}</p>
          <p className="pb-1 text-[15px] text-stone">
            average rating out of 5<br />
            from {reviews.length} {reviews.length === 1 ? "review" : "reviews"} on this site
          </p>
        </div>
      )}
      <ul className={`grid gap-5 ${limit === 1 ? "" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {shown.map((r) => (
          <li key={r.id} className="flex flex-col rounded-2xl border border-line bg-white p-7">
            <Quote className="h-6 w-6 text-gold" strokeWidth={1.25} />
            <p className="mt-4 flex-1 text-[16px] leading-relaxed text-ink/85">{r.comment}</p>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
              <div>
                <p className="font-display text-lg text-ink">{r.name}</p>
                <p className="text-[12px] uppercase tracking-[0.16em] text-stone">
                  {[r.location, fmt(toDate(r.date))].filter(Boolean).join(" · ")}
                </p>
              </div>
              {Number(r.rating) > 0 && (
                <p className="shrink-0 text-[13px] font-medium text-maroon" aria-label={`Rated ${r.rating} out of 5`}>
                  {Number(r.rating).toFixed(0)}/5
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {limit && reviews.length > limit && (
        <div className="mt-10 text-center">
          <Link href="/reviews" className="link-underline">
            Read all {reviews.length} reviews <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      )}
    </div>
  );
}
