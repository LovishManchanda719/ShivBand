import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { submitIndexNow } from "@/lib/server/indexnow";
import sitemap from "@/app/sitemap";

export const runtime = "nodejs";

// Sends every page in the sitemap to Bing via IndexNow. Use after a deploy that changes content.
export async function POST(req: Request) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  const urls = sitemap().map((e) => e.url);
  const r = await submitIndexNow(urls);
  return NextResponse.json({ ...r, submitted: urls.length });
}
