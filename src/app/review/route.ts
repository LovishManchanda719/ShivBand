import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

// Short, shareable link: yoursite.com/review opens the Google "write a review" box.
// Use it in WhatsApp messages after events, on visiting cards and in a QR code at the shop.
export function GET() {
  return NextResponse.redirect(SITE.googleReviewUrl, 307);
}
