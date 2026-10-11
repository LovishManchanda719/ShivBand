import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Book — Call 98186 26259",
  description:
    "Book Shiv Band & Light House for your baraat. Shop at Parwana Road, New Govindpura, Krishna Nagar, Delhi 110051. Call or WhatsApp Manish Kumar on 98186 26259 or 98186 22259.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
