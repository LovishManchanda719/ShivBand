import { ADMIN_EMAIL } from "@/lib/admin";

// Verifies the Firebase ID token sent by the admin panel and checks it belongs to the admin.
export async function verifyAdmin(req: Request): Promise<boolean> {
  const header = req.headers.get("authorization") || "";
  const idToken = header.startsWith("Bearer ") ? header.slice(7) : "";
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!idToken || !key) return false;
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { users?: { email?: string }[] };
    const email = data.users?.[0]?.email?.toLowerCase();
    return !!email && email === ADMIN_EMAIL.toLowerCase();
  } catch {
    return false;
  }
}

export const isCronAuthorized = (req: Request) => {
  const secret = process.env.CRON_SECRET;
  return !!secret && req.headers.get("authorization") === `Bearer ${secret}`;
};
