import type { Metadata } from "next";
import ReviewsPage from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Reviews from families who booked Shiv Band & Light House, Krishna Nagar, Delhi, for their baraat — wedding band, ghodi, baggi, dhol and lights.",
  alternates: { canonical: "/reviews" },
};

export default function Reviews() {
  return <ReviewsPage />;
}
