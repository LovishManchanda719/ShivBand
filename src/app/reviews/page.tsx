import type { Metadata } from "next";
import ReviewsPage from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Customer Reviews & Ratings",
  description:
    "Read verified customer reviews and 5-star ratings for Shiv Band & Light House in Krishna Nagar, Old Govindpura, Delhi NCR.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function Reviews() {
  return <ReviewsPage />;
}