import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ProfilePage />;
}
