import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Book Event | Manish Kumar (098186 26259)",
  description:
    "Contact Shiv Band & Light House at D-96 / C-40 Old Govindpura, Parwana Road, Krishna Nagar, Delhi-110051. Call Manish Kumar at 098186 26259 or 98186 22259 to book wedding band, dhol, ghori & fancy lighting.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
