import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write a Review & Feedback",
  description:
    "Share your wedding band and baraat lighting experience with Shiv Band & Light House, Krishna Nagar, New Delhi.",
  alternates: {
    canonical: "/feedback",
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
