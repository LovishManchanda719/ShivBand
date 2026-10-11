"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Music,
  Sparkles,
  Crown,
  Flame,
  Lamp,
  MapPin,
  PhoneCall,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

interface ServicesSEOProps {
  isDarkMode: boolean;
}

const coreServices = [
  {
    icon: Music,
    title: "Royal Wedding Brass Band & Baraat",
    subtitle: "Best Wedding Band & Baraat Band Near You in Delhi",
    description:
      "Searching for the best wedding band near me or best baraat band near me in Delhi? Shiv Band & Light House delivers 21-piece to 51-piece royal uniformed brass bands, clarinet & trumpet symphonies, and patriotic & Bollywood baraat hits.",
    keywords: "Best Wedding Band Near Me • Baraat Band • Band Baaja Delhi",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: Crown,
    title: "Royal Groom Ghodi & Ghori Wala",
    subtitle: "Best Ghodi Wala Near Me & White Wedding Horse",
    description:
      "Looking for the best ghodi wala near me or best ghodi near me? We provide healthy, calm, royally trained snow-white wedding mares (Ghodi / Ghori) adorned with silver & golden ceremonial zardozi saddle shringar.",
    keywords: "Best Ghodi Wala Near Me • Ghodi Near Me • Royal Ghori Delhi",
    accent: "from-teal-500 to-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Luxury Flower Baggi & Rath Chariot",
    subtitle: "Best Baggi Near Me & Royal Bahubali Rath Entry",
    description:
      "Find the best baggi near me and nearest baggi near me with our Victorian horse-drawn carriages, fresh orchid & rose flower baggi, and LED-illuminated 2-horse & 4-horse Royal Bahubali Rath Chariots.",
    keywords: "Best Baggi Near Me • Nearest Baggi Near Me • Flower Baggi & Rath",
    accent: "from-rose-500 to-amber-500",
  },
  {
    icon: Flame,
    title: "Punjabi Dhol Wale & Nashik Tasha",
    subtitle: "Best Dhol Wale Near Me for Non-Stop Bhangra",
    description:
      "Hire the best dhol wale near me (Punjabi dhol players) dressed in traditional Kurta-Tehmat & Turban for baraat processions, jaimala, bride/groom entry, Jago nights, and roka ceremonies across Delhi NCR.",
    keywords: "Best Dhol Wale Near Me • Punjabi Dhol Near Me • Dhol Tasha",
    accent: "from-purple-500 to-pink-500",
  },
  {
    icon: Lamp,
    title: "Vintage Fancy Light House & Chhatri Lights",
    subtitle: "Spectacular Wedding Illumination & Road Lights",
    description:
      "As Krishna Nagar's premier Light House since 1996, we provide crystal chandelier umbrellas (Chhatri lights), vintage maharaja lanterns, LED light pillars, cold pyro fireworks, and silent trolley generators.",
    keywords: "Fancy Light House Near Me • Chhatri Lights • Baraat Lighting",
    accent: "from-cyan-500 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Complete Wedding Baraat Packages",
    subtitle: "All-in-One Band + Ghodi + Baggi + Dhol + Lights",
    description:
      "Book customized all-in-one wedding packages directly with owner Manish Kumar (+91 98186 26259 / 98186 22259). Guaranteed punctual arrival, uniformed artists, and transparent pricing with zero middlemen.",
    keywords: "Shiv Band & Light House • Krishna Nagar Delhi • Since 1996",
    accent: "from-emerald-500 to-teal-600",
  },
];

const areasServed = [
  "Krishna Nagar",
  "Old Govindpura",
  "Parwana Road",
  "Geeta Colony",
  "Preet Vihar",
  "Laxmi Nagar",
  "Shahdara",
  "Nirman Vihar",
  "Mayur Vihar",
  "Karkardooma",
  "Patparganj",
  "Anand Vihar",
  "Vivek Vihar",
  "Dilshad Garden",
  "East Delhi",
  "South Delhi",
  "North Delhi",
  "West Delhi",
  "Central Delhi",
  "Noida",
  "Greater Noida",
  "Gurgaon (Gurugram)",
  "Ghaziabad",
  "Faridabad",
];

const faqs = [
  {
    question:
      "Which is the best wedding band, baraat band, ghodi wala, and baggi service near me in Delhi NCR?",
    answer:
      "Shiv Band & Light House (located at D-96 / C-40, Parwana Road, Old Govindpura, Krishna Nagar, New Delhi-110051) has been trusted by 1,000+ families since 1996. Whether you search for the best wedding band near me, best baraat band near me, best ghodi wala near me (ghori), best baggi near me (flower baggi & rath), or best dhol wale near me (Punjabi dhol), we deliver complete royal baraat services across all of Delhi NCR.",
  },
  {
    question:
      "How do I book Shiv Band & Light House for a wedding baraat?",
    answer:
      "You can book online through our Contact page at shiv-band.vercel.app/contact, or call/WhatsApp owner Manish Kumar directly at +91 98186 26259 or +91 98186 22259. Our shop is open daily from 9:00 AM to 9:00 PM near Laxmi Dairy, Old Govindpura, Krishna Nagar, Delhi.",
  },
  {
    question:
      "Do you provide separate bookings for Ghodi, Flower Baggi, or Punjabi Dhol Wale?",
    answer:
      "Yes! You can book individual services—such as only Punjabi dhol wale, a royal white wedding horse (ghodi / ghori), a decorated flower baggi (rath chariot), or fancy chhatri lighting—or combine them into a full royal baraat package.",
  },
  {
    question:
      "Which areas in Delhi NCR does Shiv Band & Light House serve?",
    answer:
      "While our main shop is in Old Govindpura, Krishna Nagar (East Delhi - 110051), our brass band, dhol wale, ghodi, baggi, and fancy lighting teams travel to wedding venues and banquet halls across all of East Delhi, Geeta Colony, Preet Vihar, Laxmi Nagar, Shahdara, South Delhi, North Delhi, West Delhi, Noida, Greater Noida, Ghaziabad, Gurgaon, and Faridabad.",
  },
];

const ServicesSEO: React.FC<ServicesSEOProps> = ({ isDarkMode }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="services"
      className={`py-16 sm:py-24 relative border-t transition-colors ${
        isDarkMode
          ? "bg-gray-950 text-white border-gray-800"
          : "bg-white text-gray-900 border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Royal Baraat Solutions Since 1996</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Best Wedding Band, Baraat Band, Ghodi, Baggi &amp; Dhol Wale in Delhi
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            From royal brass bands and vintage fancy lighting to decorated white{" "}
            <strong className="font-semibold text-amber-500">
              ghodi (ghori wala)
            </strong>
            , luxury{" "}
            <strong className="font-semibold text-teal-500">
              flower baggi (rath chariot)
            </strong>
            , and high-energy{" "}
            <strong className="font-semibold text-emerald-500">
              Punjabi dhol wale
            </strong>{" "}
            — Shiv Band &amp; Light House makes every groom&apos;s entry legendary.
          </p>
        </div>

        {/* 6 Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {coreServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <article
                key={idx}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-md hover:-translate-y-1 ${
                  isDarkMode
                    ? "bg-gray-900/90 border-gray-800 hover:border-teal-500/50"
                    : "bg-gray-50 border-gray-200 hover:border-teal-500/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-white shadow-md shrink-0`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs font-semibold text-teal-500">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-500 truncate">
                    {service.keywords}
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-teal-500 hover:text-teal-400 shrink-0"
                  >
                    Book →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Areas We Serve Across Delhi NCR */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border mb-16 ${
            isDarkMode
              ? "bg-gray-900/60 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                <span>
                  Areas We Serve — Best Wedding Band, Ghodi, Baggi &amp; Dhol Wale
                  Near You
                </span>
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Headquartered at D-96 / C-40, Parwana Road, Old Govindpura,
                Krishna Nagar, New Delhi-110051, with rapid dispatch across all
                of Delhi NCR:
              </p>
            </div>

            <a
              href="tel:+919818626259"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: 098186 26259</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {areasServed.map((area) => (
              <span
                key={area}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  isDarkMode
                    ? "bg-gray-800/80 border-gray-700 text-gray-300"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) for Google & Bing Rich Snippets */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Frequently Asked Questions (FAQ)
            </h3>
            <p
              className={`text-xs sm:text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Everything you need to know about booking Shiv Band &amp; Light
              House in Delhi NCR.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-800"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-teal-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={`px-5 pb-4 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                        isDarkMode
                          ? "text-gray-300 border-gray-800"
                          : "text-gray-600 border-gray-200"
                      }`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSEO;
