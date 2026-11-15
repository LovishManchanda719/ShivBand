import type { Metadata } from "next";
import ReviewsPage from "@/components/Reviews";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Reviews from families who booked Shiv Band & Light House, Krishna Nagar, Delhi, for their baraat — wedding band, ghodi, baggi, dhol and lights.",
  alternates: { canonical: "/reviews" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
];

export default function Reviews() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ReviewsPage />
    </>
  );
}
