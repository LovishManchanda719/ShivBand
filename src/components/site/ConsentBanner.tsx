"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANALYTICS_CONSENT_KEY, trackAnalyticsEvent } from "@/lib/analytics";

// Asks once before any visitor analytics run. Nothing is tracked until "Accept".
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(ANALYTICS_CONSENT_KEY) && localStorage.getItem("sb_analytics_opt_out") !== "true") {
        const t = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage blocked: stay hidden, nothing is tracked */
    }
  }, []);

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
    if (value === "granted") trackAnalyticsEvent("page_view", { page_title: document.title });
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed inset-x-3 bottom-[84px] z-[45] rounded-2xl border border-line bg-white p-4 shadow-xl sm:inset-x-auto sm:right-5 sm:max-w-sm md:bottom-5"
    >
      <p className="text-[13px] leading-relaxed text-stone">
        We use simple analytics to see which pages help families. No ads, nothing sold.{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose("granted")} className="btn-primary flex-1 px-4 py-2 text-[11px]">
          Accept
        </button>
        <button onClick={() => choose("denied")} className="btn-outline flex-1 px-4 py-2 text-[11px]">
          Decline
        </button>
      </div>
    </div>
  );
}
