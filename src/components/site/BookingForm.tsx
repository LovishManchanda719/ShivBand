"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { Check, CircleCheck, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { auth, db } from "@/lib/firebaseConfig";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { SERVICE_NAMES } from "@/lib/services";
import { SITE, telLink, whatsappLink } from "@/lib/site";

const clean = (s: string, max: number) =>
  s.replace(/<[^>]*>?/gm, "").replace(/[<>]/g, "").trim().slice(0, max);

const TIME_SLOTS = ["Morning", "Afternoon", "Evening", "Night"];

interface Props {
  defaultService?: string;
  compact?: boolean;
}

export default function BookingForm({ defaultService, compact = false }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Evening");
  const [venue, setVenue] = useState("");
  const [services, setServices] = useState<string[]>(defaultService ? [defaultService] : []);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const summary = () =>
    [
      `Hello Shiv Band, I would like to book for my function.`,
      name && `Name: ${name}`,
      date && `Date: ${date} (${time})`,
      venue && `Venue / area: ${venue}`,
      services.length > 0 && `Services: ${services.join(", ")}`,
      message && `Details: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const toggle = (s: string) => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!/^[6-9][0-9]{9}$/.test(phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a valid 10-digit mobile number";
    if (!date) e.date = "Choose your function date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honeypot) return;
    if (!validate()) return;
    setStatus("sending");

    // Email the owner in parallel with saving to Firebase. The request counts as
    // sent if either one succeeds, so a Firebase hiccup never loses an enquiry.
    const emailSent = fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ type: "booking", name, phone, date, time, venue, services, message, website: honeypot }),
    })
      .then((r) => r.ok)
      .catch(() => false);

    const saved = (async () => {
      // Bookings never require an account. Try a silent anonymous session so the
      // booking can carry a user id; continue without it if that is disabled.
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch {
          /* anonymous auth not enabled — booking still goes through */
        }
      }
      const uid = auth.currentUser?.uid || "guest";
      const details = [
        venue && `Venue/area: ${clean(venue, 200)}`,
        services.length > 0 && `Services: ${services.join(", ")}`,
        message && clean(message, 700),
      ]
        .filter(Boolean)
        .join(" | ");

      const ref = await addDoc(collection(db, "bookings"), {
        userId: uid,
        name: clean(name, 80),
        phone: phone.replace(/\D/g, "").slice(-10),
        preferredDate: date,
        preferredTime: time,
        additionalDetails: details,
        services,
        venue: clean(venue, 200),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      if (auth.currentUser) {
        await updateDoc(doc(db, "bookings", ref.id), { bookingId: ref.id }).catch(() => undefined);
      }
      return true;
    })().catch((err) => {
      console.error("Booking save failed", err);
      return false;
    });

    const [ok1, ok2] = await Promise.all([saved, emailSent]);
    if (ok1 || ok2) {
      trackAnalyticsEvent("booking_submitted", { preferred_date: date });
      setStatus("sent");
    } else {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center sm:p-10" role="status">
        <CircleCheck className="mx-auto h-10 w-10 text-gold" strokeWidth={1.25} />
        <h3 className="mt-4 font-display text-3xl text-ink">Request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-stone">
          Thank you, {name.split(" ")[0]}. We will call you on {phone} to confirm availability for {date}. For a faster
          reply, send the same details on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLink(summary())} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> Send on WhatsApp
          </a>
          <a href={telLink()} className="btn-outline">
            Call {SITE.phones[0].display}
          </a>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p className="mt-1.5 text-[13px] text-maroon" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-name" className="field-label">
            Your name
          </label>
          <input
            id="bf-name"
            className="field"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            aria-invalid={!!errors.name}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor="bf-phone" className="field-label">
            Mobile number
          </label>
          <input
            id="bf-phone"
            className="field"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile"
            aria-invalid={!!errors.phone}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="bf-date" className="field-label">
            Function date
          </label>
          <input
            id="bf-date"
            className="field"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={!!errors.date}
          />
          {err("date")}
        </div>
        <div>
          <label htmlFor="bf-time" className="field-label">
            Time of day
          </label>
          <select id="bf-time" className="field appearance-none" value={time} onChange={(e) => setTime(e.target.value)}>
            {TIME_SLOTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bf-venue" className="field-label">
          Venue or area
        </label>
        <input
          id="bf-venue"
          className="field"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="e.g. banquet name, Preet Vihar"
        />
      </div>

      <fieldset>
        <legend className="field-label">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_NAMES.map((s) => {
            const on = services.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] transition-colors ${
                  on ? "border-maroon bg-maroon text-ivory" : "border-line bg-white text-ink hover:border-stone-light"
                }`}
              >
                {on && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      {!compact && (
        <div>
          <label htmlFor="bf-msg" className="field-label">
            Anything else <span className="normal-case tracking-normal text-stone-light">(optional)</span>
          </label>
          <textarea
            id="bf-msg"
            className="field min-h-[96px] resize-y"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Route length, number of guests, songs you love..."
          />
        </div>
      )}

      {status === "error" && (
        <p className="rounded-xl bg-maroon/5 px-4 py-3 text-[14px] text-maroon" role="alert">
          We could not send your request just now. Please try again, or send it on WhatsApp below.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <button type="submit" disabled={status === "sending"} className="btn-primary flex-1">
          {status === "sending" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.75} />
          ) : (
            <Send className="h-4 w-4" strokeWidth={1.75} />
          )}
          {status === "sending" ? "Sending" : "Check availability"}
        </button>
        <a href={whatsappLink(summary())} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 bg-white">
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> Ask on WhatsApp
        </a>
      </div>
      <p className="text-[12px] leading-relaxed text-stone">
        No account needed. By sending, you agree that {SITE.name} may call or WhatsApp you about this booking. We use your
        details only for this enquiry —{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
