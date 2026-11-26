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
        <div className="mt-16 rounded-3xl border border-line bg-white p-8 sm:p-10">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Trusted by Delhi NCR Wedding Families Since {SITE.foundingYear}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-stone">
            Based at {SITE.shortAddress}, Shiv Band &amp; Light House is personally supervised by owner {SITE.owner} with
            in-house uniformed brass musicians, calm trained white ghodis, flower baggis, Punjabi dhol players, and
            crystal chhatri lights — backed by our Zero-Surge Pricing Guarantee.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/packages" className="link-underline">
              Explore baraat packages
            </Link>
            <Link href="/contact#book" className="link-underline">
              Check wedding date availability
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
