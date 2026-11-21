"use client";

import React, { useState } from "react";
import {
  Calendar,
  Check,
  MapPin,
  Music,
  Phone,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { SITE, telLink, whatsappLink } from "@/lib/site";

const REGIONS = [
  "Krishna Nagar & East Delhi",
  "Preet Vihar & Nirman Vihar",
  "Laxmi Nagar & Shakarpur",
  "Shahdara & Vivek Vihar",
  "Mayur Vihar & Patparganj",
  "Noida & Greater Noida",
  "Gurugram (Gurgaon) & Farmhouses",
  "South Delhi & Chattarpur",
  "Rohini & Pitampura",
  "Ghaziabad & Indirapuram",
  "Faridabad & Surajkund",
  "Other Delhi NCR Locality",
];

const BAND_SIZES = [
  { id: "11", label: "11-Piece Classic Brass Band", desc: "Best for compact community baraats" },
  { id: "21", label: "21-Piece Grand Brass Orchestra", desc: "Most popular for banquet halls & expressways", default: true },
  { id: "31", label: "31+ Royal Symphony & Trumpets", desc: "Designed for luxury farmhouses & mega weddings" },
];

const OPTIONAL_SERVICES = [
  { id: "ghodi", label: "Trained White Ghodi with Velvet Chatt & Handler", default: true },
  { id: "baggi", label: "Fresh Flower Decorated Baggi / Chariot Rath" },
  { id: "dhol_2", label: "2 Punjabi Dhol Players (Live Bhangra Beats)", default: true },
  { id: "dhol_4", label: "4-to-6 Master Punjabi Dholis" },
  { id: "lights", label: "Crystal Chhatri Umbrella Lights + Silent Generator", default: true },
  { id: "vintage", label: "Royal Vintage Car for Groom Entry / Vidaai" },
  { id: "safa", label: "Traditional Safa / Turban Tying Crew for Baratis" },
];

export default function PackageBuilder() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [selectedBand, setSelectedBand] = useState("21");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "ghodi",
    "dhol_2",
    "lights",
  ]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const bandObj = BAND_SIZES.find((b) => b.id === selectedBand);
  const activeServiceLabels = OPTIONAL_SERVICES.filter((s) =>
    selectedServices.includes(s.id)
  ).map((s) => s.label);

  const buildWhatsAppMessage = () => {
    const dateStr = selectedDate ? selectedDate : "Upcoming Wedding Season";
    let msg = `Hello Manish Ji (Shiv Band),\n\nI would like an exact custom package quote for our wedding:\n`;
    msg += `• Date: ${dateStr}\n`;
    msg += `• Locality: ${selectedRegion}\n`;
    msg += `• Band: ${bandObj?.label || "Brass Band"}\n`;
    if (activeServiceLabels.length > 0) {
      msg += `• Add-ons Requested:\n`;
      activeServiceLabels.forEach((lbl) => {
        msg += `   - ${lbl}\n`;
      });
    }
    msg += `\nPlease check your schedule and share your best package rate. Thank you!`;
    return whatsappLink(msg);
  };

  return (
    <div className="rounded-3xl border border-sand-dark bg-white p-6 sm:p-10 shadow-lg">
      <div className="flex flex-col gap-2 border-b border-sand-dark pb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-maroon">
          Requirement &amp; Package Estimator
        </div>
        <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Build Your Custom Baraat Package
        </h3>
        <p className="text-xs sm:text-sm text-stone leading-relaxed">
          Select your wedding details and elements below. Shiv Band follows a strict zero-surge pricing policy — our rates remain fair and consistent throughout the year based strictly on your chosen setup and venue distance.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Form Controls */}
        <div className="space-y-6 lg:col-span-7">
          {/* 1. Date & Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>Wedding Date</span>
                </span>
                <span className="text-[10px] font-normal text-stone capitalize">Checks slot availability</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl border border-sand-dark bg-sand/30 px-3.5 py-2.5 text-xs font-medium text-ink focus:border-maroon focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span>Venue Area / NCR Hub</span>
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-xl border border-sand-dark bg-sand/30 px-3.5 py-2.5 text-xs font-medium text-ink focus:border-maroon focus:outline-hidden"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Band Size Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2.5 flex items-center gap-1.5">
              <Music className="h-3.5 w-3.5 text-gold" />
              <span>Musical Troop Size</span>
            </label>
            <div className="grid gap-2.5">
              {BAND_SIZES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBand(b.id)}
                  className={`flex items-start justify-between rounded-xl border p-3.5 text-left transition-all ${
                    selectedBand === b.id
                      ? "border-maroon bg-maroon/5 ring-1 ring-maroon"
                      : "border-sand-dark bg-white hover:border-gold"
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-ink">{b.label}</div>
                    <div className="text-[11px] text-stone mt-0.5">{b.desc}</div>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedBand === b.id
                        ? "border-maroon bg-maroon text-white"
                        : "border-stone/40"
                    }`}
                  >
                    {selectedBand === b.id && <Check className="h-2.5 w-2.5 stroke-3" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Add-on Services Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2.5">
              Select Desired Procession Elements:
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {OPTIONAL_SERVICES.map((s) => {
                const active = selectedServices.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.id)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all text-xs font-semibold ${
                      active
                        ? "border-gold bg-gold/10 text-ink font-bold shadow-2xs"
                        : "border-sand-dark bg-white text-stone hover:border-sand-darker"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                        active
                          ? "border-gold bg-gold text-white"
                          : "border-stone/40"
                      }`}
                    >
                      {active && <Check className="h-3 w-3 stroke-3" />}
                    </div>
                    <span className="leading-tight">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary Card & WhatsApp Trigger */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-sand-dark bg-sand/30 p-6 flex flex-col justify-between h-full">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-3">
                Package Summary
              </div>

              <div className="space-y-3 border-y border-sand-dark py-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone">Target Date:</span>
                  <span className="font-bold text-ink">
                    {selectedDate || "Not chosen yet (Flexible)"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone">Destination:</span>
                  <span className="font-bold text-ink">{selectedRegion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone">Brass Band:</span>
                  <span className="font-bold text-maroon">{bandObj?.label}</span>
                </div>
                <div>
                  <span className="text-stone block mb-1.5">Included Elements:</span>
                  <ul className="space-y-1 pl-2">
                    {activeServiceLabels.map((lbl) => (
                      <li key={lbl} className="text-ink font-medium flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-gold shrink-0" />
                        <span className="truncate">{lbl}</span>
                      </li>
                    ))}
                    {activeServiceLabels.length === 0 && (
                      <li className="text-stone italic text-[11px]">
                        No additional elements selected.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white p-3.5 border border-sand-dark text-[11px] text-stone leading-relaxed">
                <strong className="text-ink font-bold block mb-1">
                  Zero-Surge Pricing Guarantee:
                </strong>
                Direct booking with owner Manish Kumar. We never inflate rates for peak wedding season or auspicious dates. Your quote is based strictly on your chosen musicians, transport, and venue logistics.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sand-dark space-y-2.5">
              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-center py-3.5 shadow-md flex items-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Request Custom Quote on WhatsApp</span>
              </a>

              <a
                href={telLink(0)}
                className="btn-outline w-full justify-center text-center py-2.5 text-xs flex items-center gap-2"
              >
                <Phone className="h-3.5 w-3.5 text-maroon" />
                <span>Call Directly: {SITE.phones[0].display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
