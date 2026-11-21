"use client";

import { useState } from "react";
import { Globe, LoaderCircle, CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import { toast } from "sonner";

// Sends every page in the sitemap to Bing & IndexNow search engines. Use after deploying content changes.
export default function NotifyBingButton() {
  const [busy, setBusy] = useState(false);
  const [lastDone, setLastDone] = useState<string | null>(null);

  const run = async () => {
    setBusy(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/admin/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: "{}",
      });
      const d = (await res.json().catch(() => ({}))) as { ok?: boolean; status?: number; submitted?: number; error?: string };
      if (d.ok) {
        toast.success(`Success! Submitted ${d.submitted || 53} URLs to Bing & IndexNow engines.`);
        setLastDone(`Pushed ${d.submitted} URLs`);
      } else {
        toast.error(d.error || `IndexNow API returned status ${d.status}`);
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={run}
      disabled={busy}
      title="Instantly notify Bing & Yandex search engine bots to crawl all sitemap pages"
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold/60 bg-gold/10 hover:bg-gold/20 text-ink font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50"
    >
      {busy ? (
        <LoaderCircle className="w-4 h-4 animate-spin text-gold" />
      ) : lastDone ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      ) : (
        <Globe className="w-4 h-4 text-gold" />
      )}
      <span className="text-ink">{busy ? "Notifying..." : lastDone ? lastDone : "Notify Bing & Search Bots"}</span>
    </button>
  );
}
