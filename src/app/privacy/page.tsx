"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import { SITE, telLink } from "@/lib/site";

const UPDATED = "11 October 2026";

export default function PrivacyPolicyPage() {
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setAnalyticsOn(localStorage.getItem("sb_analytics_opt_out") !== "true");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = () => {
    const next = !analyticsOn;
    try {
      if (next) localStorage.removeItem("sb_analytics_opt_out");
      else localStorage.setItem("sb_analytics_opt_out", "true");
    } catch {
      /* ignore */
    }
    setAnalyticsOn(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
        eyebrow={`Last updated ${UPDATED}`}
        title="Privacy policy"
        intro="What we collect when you use this website, why we collect it, and how you can control it. Written in plain language."
      />

      <section className="container max-w-3xl pb-24">
        <div className="prose-site">
          <h2>Who we are</h2>
          <p>
            This website belongs to {SITE.name}, a wedding band business run by {SITE.owner} at {SITE.address.street},{" "}
            {SITE.address.locality}, {SITE.address.city} {SITE.address.postalCode}. We are responsible for the personal data
            collected through this site.
          </p>

          <h2>What we collect, and why</h2>
          <ul>
            <li>
              <strong>Booking enquiries.</strong> When you use the booking form we collect your name, mobile number, function
              date and time, venue or area, the services you are interested in and any message you write. We use this only to
              reply to you about that booking.
            </li>
            <li>
              <strong>Reviews.</strong> When you post a review we store your name, the area you enter (optional), your rating
              and your review. Your name, area and review are shown publicly on this website.
            </li>
            <li>
              <strong>Accounts (optional).</strong> If you create an account with email or Google, we store your name, email
              address and, for Google sign-in, your profile photo, so you can see your booking requests. You never need an
              account to book.
            </li>
            <li>
              <strong>Anonymous website statistics.</strong> To understand which pages help families, we record the page
              visited, the type of device and browser, how you arrived at the site and an approximate city worked out by our
              hosting provider. We do not store your IP address, name or email with these statistics, we do not sell them and
              we do not use them for advertising. You can switch them off below at any time.
            </li>
          </ul>

          <h2>Services that process data for us</h2>
          <p>
            We use Google Firebase (database, sign-in and analytics), Vercel (website hosting) and Resend (to email booking
            and review notifications to us). When you open a video or map, YouTube and Google Maps load content from Google.
            When you click a WhatsApp, phone, Instagram, Facebook or Google link, that service&apos;s own privacy policy
            applies. Some of these providers may store data outside India. We never sell or rent your personal data and we do
            not use it for advertising.
          </p>

          <h2>How long we keep it</h2>
          <ul>
            <li>Booking enquiries: up to 24 months after the function date, then deleted.</li>
            <li>Reviews: for as long as they are published, or until you ask us to remove them.</li>
            <li>Accounts: until you ask us to delete your account.</li>
            <li>Analytics records: up to 24 months.</li>
          </ul>

          <h2>Your choices and rights</h2>
          <p>
            You can ask us to show, correct or delete the personal data we hold about you, or withdraw your consent, at any
            time by contacting us below. We will respond within 30 days. Withdrawing consent does not affect anything we did
            before you withdrew it.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl text-ink">Anonymous website statistics</p>
            <p className="mt-1 text-[14px] text-stone">
              Currently <strong className="text-ink">{analyticsOn ? "on" : "off"}</strong> in this browser.
            </p>
            {saved && <p className="mt-1 text-[13px] text-maroon">Saved.</p>}
          </div>
          <button type="button" onClick={toggle} className={analyticsOn ? "btn-outline" : "btn-primary"}>
            {analyticsOn ? "Turn off" : "Turn on"}
          </button>
        </div>

        <div className="prose-site mt-10">
          <h2>Contact for privacy questions and complaints</h2>
          <p>
            {SITE.owner}, {SITE.name}
            <br />
            {SITE.address.street}, {SITE.address.locality}, {SITE.address.city} {SITE.address.postalCode}
            <br />
            Phone:{" "}
            <a href={telLink()} className="text-maroon underline underline-offset-2">
              {SITE.phones[0].display}
            </a>
            <br />
            Email:{" "}
            <a href="mailto:lovishmanchanda719@gmail.com" className="text-maroon underline underline-offset-2">
              lovishmanchanda719@gmail.com
            </a>
          </p>
          <p>
            If you are not satisfied with our response, you may approach the Data Protection Board of India once it is
            accepting complaints.
          </p>

          <h2>Children</h2>
          <p>This website is meant for adults planning weddings and events. We do not knowingly collect data from children.</p>

          <h2>Changes</h2>
          <p>
            If we change this policy we will update the date at the top of this page. See also our{" "}
            <Link href="/terms" className="text-maroon underline underline-offset-2">
              terms
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
