"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { Scale, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export default function TermsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4" />
            <span>Terms of Use &amp; Legal Disclaimer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Terms &amp; Conditions
          </h1>
          <p className={`text-sm mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Effective Date: January 1, 2026 • Applicable Jurisdiction: New Delhi, India
          </p>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                1. Acceptance of Terms
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                By accessing and using this website (<strong>shiv-band.vercel.app</strong>), operated by <strong>Shiv Band &amp; Light House</strong> (D-96 / C-40, Parwana Rd, Old Govindpura, Krishna Nagar, New Delhi – 110051), you agree to comply with and be bound by these Terms &amp; Conditions and our <Link href="/privacy" className="text-teal-500 underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                2. Online Booking Inquiries &amp; Quotation Disclaimer
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Submitting an event inquiry or booking request through our website or WhatsApp is a <strong>free preliminary inquiry</strong> for checking date/slot availability and pricing. An online inquiry does <strong>not</strong> constitute a confirmed or legally binding booking contract until availability is verified, mutually agreed upon, and formally confirmed with an official booking receipt by Shiv Band &amp; Light House management.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                3. User Reviews &amp; Intermediary Safe Harbor (Section 79, IT Act 2000)
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Visitors who submit reviews or feedback on our website agree not to post any defamatory, obscene, fraudulent, infringing, or unlawful content under Rule 3(1)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. Reviews represent the personal opinions of individual customers. We reserve the right to moderate or remove any fake, abusive, or unlawful review upon notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                4. Intellectual Property, Media &amp; Takedown Requests
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                All original photographs, videos, logos, and text describing the services of <strong>Shiv Band &amp; Light House</strong> (including generic descriptive terms for wedding brass band, ghori, baggi, rath, dhol, and fancy lighting services) are used strictly for showcasing our own services. If you appear in any event photograph or video in our gallery and wish to have it removed for personal privacy or copyright reasons, please contact us using the details below and we will promptly remove the media within 48 hours.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                5. Limitation of Liability
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                This website and its information are provided on an &ldquo;as-is&rdquo; informational basis. To the fullest extent permitted by Indian law, Shiv Band &amp; Light House shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use this website.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">
                6. Governing Law &amp; Exclusive Jurisdiction
              </h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                These Terms &amp; Conditions are governed by the laws of the Republic of India. Any dispute or claim arising out of or relating to this website shall be resolved amicably first, and if unresolved, shall be subject to the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
              </p>
            </section>

            <section
              className={`p-5 rounded-2xl border ${
                isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-teal-50/60 border-teal-200"
              }`}
            >
              <h2 className="text-lg font-bold text-teal-500 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Legal &amp; Grievance Contact</span>
              </h2>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p><strong>Shiv Band &amp; Light House (Proprietor: Manish Kumar)</strong></p>
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
              <Link href="/privacy" className="text-teal-500 hover:underline">
                Read Privacy Policy →
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
