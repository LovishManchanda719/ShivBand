import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Returns only the approximate city/region from the hosting provider's headers.
// The visitor's IP address is not read, logged or returned.
export function GET(req: Request) {
  const h = req.headers;
  const dec = (v: string | null) => {
    try {
      return v ? decodeURIComponent(v).slice(0, 80) : "";
    } catch {
      return "";
    }
  };
  return NextResponse.json(
    {
      city: dec(h.get("x-vercel-ip-city")) || "Unknown",
      region: dec(h.get("x-vercel-ip-country-region")) || "Unknown",
      country: dec(h.get("x-vercel-ip-country")) || "IN",
    },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
