import { NextResponse } from "next/server";
import { NOTIFY_EMAIL_DEFAULT, SITE } from "@/lib/site";

// Sends an email to the owner when someone submits a booking request or a review.
// Uses Resend's HTTP API (no extra package). Configure in Vercel → Settings → Environment Variables:
//   RESEND_API_KEY      required — from resend.com (free tier)
//   NOTIFY_EMAIL_TO     optional — defaults to lovishmanchanda719@gmail.com (comma-separate for several)
//   NOTIFY_EMAIL_FROM   optional — defaults to Resend's test sender; use your own domain once verified
// Without RESEND_API_KEY the route does nothing and the form still works (bookings are saved in Firebase).

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const LIMIT = 5; // requests
const WINDOW = 10 * 60 * 1000; // per 10 minutes per IP

const rateLimited = (ip: string) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[<>]/g, "").trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const row = (label: string, value: string) =>
  value
    ? `<tr><td style="padding:8px 16px 8px 0;color:#6F6760;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0;color:#1C1917;font-size:15px">${esc(value)}</td></tr>`
    : "";

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: "email-not-configured" }, { status: 200 });

  // Only accept calls from our own pages.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (str(body.website, 50)) return NextResponse.json({ ok: true }); // honeypot

  const type = body.type === "review" ? "review" : "booking";
  const name = str(body.name, 80);
  if (!name) return NextResponse.json({ ok: false }, { status: 400 });

  let subject: string;
  let rows: string;
  let text: string;

  if (type === "booking") {
    const phone = str(body.phone, 15).replace(/\D/g, "");
    if (phone.length < 10) return NextResponse.json({ ok: false }, { status: 400 });
    const date = str(body.date, 20);
    const time = str(body.time, 20);
    const venue = str(body.venue, 200);
    const services = Array.isArray(body.services) ? body.services.map((s) => str(s, 40)).filter(Boolean).join(", ") : "";
    const message = str(body.message, 1000);
    subject = `New booking request: ${name} — ${date || "date not given"}`;
    rows =
      row("Name", name) +
      row("Mobile", phone) +
      row("Date", [date, time].filter(Boolean).join(" · ")) +
      row("Venue / area", venue) +
      row("Services", services) +
      row("Message", message);
    text = `New booking request\nName: ${name}\nMobile: ${phone}\nDate: ${date} ${time}\nVenue: ${venue}\nServices: ${services}\nMessage: ${message}`;
    rows += `<tr><td colspan="2" style="padding-top:20px"><a href="tel:+91${phone.slice(-10)}" style="display:inline-block;background:#7A1F2B;color:#F8F4EE;padding:12px 22px;border-radius:999px;text-decoration:none;font-size:14px;margin-right:8px">Call ${esc(name.split(" ")[0])}</a><a href="https://wa.me/91${phone.slice(-10)}" style="display:inline-block;border:1px solid #1C1917;color:#1C1917;padding:11px 22px;border-radius:999px;text-decoration:none;font-size:14px">WhatsApp</a></td></tr>`;
  } else {
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 0));
    const comment = str(body.comment, 1200);
    subject = `New website review from ${name} (${rating}/5)`;
    rows = row("Name", name) + row("Rating", `${rating}/5`) + row("Area", str(body.location, 80)) + row("Review", comment);
    text = `New review\nName: ${name}\nRating: ${rating}/5\nReview: ${comment}`;
  }

  const html = `<div style="background:#F8F4EE;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E2D8CB;border-radius:16px;padding:28px">
    <p style="margin:0 0 4px;color:#B8893B;font-size:11px;letter-spacing:3px;text-transform:uppercase">${esc(SITE.name)} · website</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-weight:normal;font-size:24px;color:#1C1917">${esc(subject)}</h1>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
  </div>
</div>`;

  const to = (process.env.NOTIFY_EMAIL_TO || NOTIFY_EMAIL_DEFAULT)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_EMAIL_FROM || "Shiv Band Website <onboarding@resend.dev>",
        to,
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Notify failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
