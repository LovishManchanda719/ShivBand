// IndexNow: tells Bing (and Yandex, Seznam, Naver) immediately when pages change.
// The key file lives at /public/<key>.txt and must contain the key itself.
import { SITE_URL } from "@/lib/site";

export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "b8f4d9e2a1c647389012abcdef345678";

export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; status: number }> {
  const host = new URL(SITE_URL).host;
  const urlList = Array.from(new Set(urls)).filter((u) => u.startsWith(SITE_URL)).slice(0, 10_000);
  if (urlList.length === 0) return { ok: false, status: 0 };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList }),
    cache: "no-store",
  });
  return { ok: res.status === 200 || res.status === 202, status: res.status };
}
