import Link from "next/link";
import { ExternalLink, PenLine } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import ReviewsList from "@/components/site/ReviewsList";
import { SITE } from "@/lib/site";

export default function ReviewsPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
        eyebrow="Reviews"
        title={
          <>
            What families say about <em className="italic text-maroon">Shiv Band</em>
          </>
        }
        intro="Reviews written by families who booked us for their baraat."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> Review us on Google
          </a>
          <Link href="/feedback" className="btn-outline">
            <PenLine className="h-4 w-4" strokeWidth={1.75} /> Write a review here
          </Link>
        </div>
        <a href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-6">
          Read our reviews on Google <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </PageHeader>
      <section className="container pb-24">
        <ReviewsList showSummary />
      </section>
    </PageShell>
  );
}
