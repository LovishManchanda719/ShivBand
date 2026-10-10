"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { ShieldCheck, Lock, EyeOff, CheckCircle2, Mail, Phone, MapPin, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [optedOut, setOptedOut] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    try {
      setOptedOut(localStorage.getItem("sb_analytics_opt_out") === "true");
    } catch {
      // ignore
    }
  }, []);

  const handleToggleOptOut = () => {
    try {
      const nextVal = !optedOut;
      if (nextVal) {
        localStorage.setItem("sb_analytics_opt_out", "true");
      } else {
        localStorage.removeItem("sb_analytics_opt_out");
      }
      setOptedOut(nextVal);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 4000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-xl ${
            isDarkMode ? "bg-gray-900/90 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>DPDP Act 2023 &amp; IT Rules Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Privacy Policy &amp; Data Protection Notice
          </h1>
          <p className={`text-sm mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Effective Date: January 1, 2026 • Last Updated: October 2026
          </p>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                1. Introduction &amp; Legal Compliance
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Welcome to <strong>Shiv Band &amp; Light House</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), located at D-96 / C-40, Parwana Rd, Old Govindpura, Krishna Nagar, New Delhi – 110051. This Privacy Policy is published in accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act, India)</strong>, Section 43A of the <strong>Information Technology Act, 2000</strong>, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                2. Information We Collect
              </h2>
              <ul className={`list-disc pl-5 space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <li>
                  <strong>Voluntary Booking &amp; Inquiry Data:</strong> When you submit an event inquiry on our <Link href="/contact" className="text-teal-500 underline">Contact Page</Link>, we collect your Name, 10-digit Mobile Number, Preferred Event Date/Time, and Event Details solely to contact you with a quotation and confirm availability.
                </li>
                <li>
                  <strong>Account &amp; Review Data:</strong> When you create an account or post a customer review on our <Link href="/feedback" className="text-teal-500 underline">Feedback Page</Link>, we store your name, email address (via Firebase Authentication), city/locality, star rating, and review text.
                </li>
                <li>
                  <strong>Privacy-Safe Aggregate Website Analytics:</strong> To improve our website performance and understand which cities our customers browse from, we collect anonymous session metrics (pages viewed, device type, browser type, traffic referrer, and coarse city/state/PIN region with masked IP octets). <strong>We never store raw IP addresses, precise GPS coordinates, financial/payment details, or passwords in plain text.</strong>
                </li>
              </ul>
            </section>

            {/* Interactive Opt-Out Control */}
            <section
              className={`p-5 rounded-2xl border ${
                isDarkMode ? "bg-gray-950/70 border-gray-800" : "bg-teal-50/60 border-teal-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-500" />
                    <span>Your Analytics Privacy Preference (1-Click Opt-Out)</span>
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    You can disable or enable anonymous visitor analytics tracking for your browser at any time below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleOptOut}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all ${
                    optedOut
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-rose-600 hover:bg-rose-500 text-white"
                  }`}
                >
                  {optedOut ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Analytics Disabled (Click to Re-Enable)</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Opt Out of Visitor Analytics</span>
                    </>
                  )}
                </button>
              </div>
              {savedNotice && (
                <p className="text-xs text-emerald-500 font-semibold mt-2">
                  ✓ Your privacy preference has been saved on this browser.
                </p>
              )}
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                3. How We Use &amp; Protect Your Data
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                We use your personal data strictly to respond to your wedding band, ghori, baggi, dhol, and lighting booking inquiries, display customer testimonials, and maintain website security. We <strong>never sell, rent, or trade</strong> your phone number or personal information to third-party telemarketers or data brokers. All data is stored securely on Google Cloud / Firebase infrastructure protected by HTTPS/TLS encryption and strict Firestore role-based security rules.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                4. Third-Party Services &amp; Embeds
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Our website uses Google Firebase for authentication and database hosting, YouTube embeds to showcase our live wedding barat performances, and Google Maps links for directions. Clicking external links (such as WhatsApp, Instagram, Facebook, or YouTube) is governed by the respective platform&apos;s privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                5. Your Rights Under the DPDP Act, 2023 (Access, Correction &amp; Erasure)
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                As a Data Principal under Indian law, you have the right to request access to, correction of, or permanent deletion/erasure of your personal data (such as a booking inquiry, user account, or review) at any time by contacting our Grievance Officer below. We fulfill all verified deletion requests within 7 business days.
              </p>
            </section>

            <section
              className={`p-5 rounded-2xl border ${
                isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-amber-50/60 border-amber-200"
              }`}
            >
              <h2 className="text-lg font-bold text-amber-500 mb-2">
                6. Grievance Officer &amp; Contact Information
              </h2>
              <p className={`text-xs sm:text-sm mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                In accordance with the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020, the name and contact details of the Grievance Officer are provided below:
              </p>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p><strong>Business Name:</strong> Shiv Band &amp; Light House (Est. 1996)</p>
                <p><strong>Proprietor / Grievance Contact:</strong> Manish Kumar</p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>D-96 / C-40, Parwana Rd, Old Govindpura, Krishna Nagar, New Delhi – 110051</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                  <a href="tel:+919312286082" className="text-teal-500 hover:underline">+91 93122 86082 / +91 98186 26259</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                  <a href="mailto:lovishmanchanda719@gmail.com" className="text-teal-500 hover:underline">lovishmanchanda719@gmail.com</a>
                </p>
              </div>
            </section>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <Link href="/terms" className="text-teal-500 hover:underline flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>Read Terms &amp; Conditions</span>
              </Link>
              <Link href="/" className="text-gray-400 hover:text-teal-400">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
