"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { CircleCheck, ExternalLink, LoaderCircle, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { auth, db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { PageHeader, PageShell } from "@/components/site/PageShell";

const clean = (s: string, max: number) => s.replace(/<[^>]*>?/gm, "").replace(/[<>]/g, "").trim().slice(0, max);

const RATINGS = [
  { v: 5, label: "Excellent" },
  { v: 4, label: "Very good" },
  { v: 3, label: "Good" },
  { v: 2, label: "Fair" },
  { v: 1, label: "Poor" },
];

export default function FeedbackPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (user?.displayName && !name) setName(user.displayName);
  }, [user, name]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!rating) errs.rating = "Please choose a rating";
    if (comment.trim().length < 10) errs.comment = "Please write at least a sentence about your experience";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch {
          /* continue as guest */
        }
      }
      await addDoc(collection(db, "reviews"), {
        name: clean(name, 80),
        rating,
        comment: clean(comment, 1200),
        location: clean(location, 80),
        date: new Date(),
        likes: 0,
        dislikes: 0,
        userId: auth.currentUser?.uid || "guest",
        photoURL: user?.photoURL || "",
      });
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ type: "review", name, rating, comment, location }),
      }).catch(() => undefined);
      trackAnalyticsEvent("review_submitted", { rating });
      setStatus("sent");
    } catch (err) {
      console.error("Review submit failed", err);
      setStatus("error");
    }
  };

  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
          { name: "Write a review", path: "/feedback" },
        ]}
        eyebrow="Your experience"
        title={
          <>
            How was your <em className="italic text-maroon">baraat</em>?
          </>
        }
        intro="Your words help other families choose. Your name and review will be shown publicly on this website."
      >
        <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-8">
          Prefer Google? Review us on Google <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </PageHeader>

      <section className="container pb-24">
        <div className="max-w-2xl rounded-3xl border border-line bg-white p-6 sm:p-10">
          {status === "sent" ? (
            <div className="py-6 text-center" role="status">
              <CircleCheck className="mx-auto h-10 w-10 text-gold" strokeWidth={1.25} />
              <h2 className="mt-4 font-display text-3xl text-ink">Thank you</h2>
              <p className="mx-auto mt-2 max-w-sm text-[15px] text-stone">
                Your review has been posted. Would you share it on Google too? It helps other families find us.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> Post on Google
                </a>
                <Link href="/reviews" className="btn-outline">
                  See all reviews
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-6">
              <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />

              <fieldset>
                <legend className="field-label">Your rating</legend>
                <div className="grid grid-cols-5 gap-2">
                  {RATINGS.slice()
                    .reverse()
                    .map((r) => (
                      <button
                        type="button"
                        key={r.v}
                        onClick={() => setRating(r.v)}
                        aria-pressed={rating === r.v}
                        className={`flex flex-col items-center rounded-xl border px-1 py-3 transition-colors ${
                          rating === r.v ? "border-maroon bg-maroon text-ivory" : "border-line text-ink hover:border-stone-light"
                        }`}
                      >
                        <span className="font-display text-2xl leading-none">{r.v}</span>
                        <span className={`mt-1 text-[10px] uppercase tracking-[0.12em] ${rating === r.v ? "text-ivory/80" : "text-stone"}`}>
                          {r.label}
                        </span>
                      </button>
                    ))}
                </div>
                {errors.rating && <p className="mt-1.5 text-[13px] text-maroon">{errors.rating}</p>}
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fb-name" className="field-label">
                    Your name
                  </label>
                  <input id="fb-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  {errors.name && <p className="mt-1.5 text-[13px] text-maroon">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="fb-loc" className="field-label">
                    Area <span className="normal-case tracking-normal text-stone-light">(optional)</span>
                  </label>
                  <input id="fb-loc" className="field" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Preet Vihar" />
                </div>
              </div>

              <div>
                <label htmlFor="fb-comment" className="field-label">
                  Your review
                </label>
                <textarea
                  id="fb-comment"
                  className="field min-h-[140px] resize-y"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How were the band, ghodi, dhol and lights on the day?"
                />
                {errors.comment && <p className="mt-1.5 text-[13px] text-maroon">{errors.comment}</p>}
              </div>

              {status === "error" && (
                <p className="rounded-xl bg-maroon/5 px-4 py-3 text-[14px] text-maroon" role="alert">
                  Your review could not be posted right now. Please try again in a moment.
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
                {status === "sending" ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.75} />
                ) : (
                  <Send className="h-4 w-4" strokeWidth={1.75} />
                )}
                {status === "sending" ? "Posting" : "Post review"}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
