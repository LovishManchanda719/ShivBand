import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Shiv Band & Light House",
  description: "Private Admin Panel for Shiv Band & Light House Analytics, Gallery & Bookings Management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
