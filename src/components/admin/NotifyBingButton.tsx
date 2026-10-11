"use client";

import { useState } from "react";
import { Globe, LoaderCircle } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";

// Sends every page in the sitemap to Bing (IndexNow). Use after deploying content changes.
export default function NotifyBingButton() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const run = async () => {
    setBusy(true);
    setMsg("");
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/admin/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: "{}",
      });
      const d = (await res.json().catch(() => ({}))) as { ok?: boolean; status?: number; submitted?: number; error?: string };
      setMsg(d.ok ? `Sent ${d.submitted} pages to Bing.` : d.error || `Bing answered ${d.status}.`);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={run} disabled={busy} className="btn-outline px-4 py-2 text-[11px]">
        {busy ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />}
        Notify Bing of site changes
      </button>
      {msg && <span className="text-[13px] text-stone">{msg}</span>}
    </div>
  );
}
