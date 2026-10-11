import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import { SITE, telLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the Shiv Band & Light House website, booking enquiries and reviews.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
        eyebrow="Last updated 11 October 2026"
        title="Terms of use"
        intro="The simple rules for using this website. By using it you agree to these terms."
      />
      <section className="container max-w-3xl pb-24">
        <div className="prose-site">
          <h2>Enquiries are not confirmed bookings</h2>
          <p>
            Sending the booking form, calling or messaging us is an enquiry to check availability and price. A booking is
            confirmed only when {SITE.name} confirms it with you directly, along with the agreed date, timing, services and
            price. Prices depend on the date, the size of the band and the services chosen, and are shared on request.
          </p>

          <h2>Timing, permissions and local rules</h2>
          <p>
            Processions must follow local laws, including the Noise Pollution (Regulation and Control) Rules, 2000, under
            which loudspeakers and sound systems cannot be used in public between 10 PM and 6 AM, and any police or venue
            permissions that apply. We plan the band&apos;s timing to follow these rules and may stop playing where the law
            or the authorities require it.
          </p>

          <h2>Reviews</h2>
          <p>
            Reviews must be your own honest experience. Do not post anything false, abusive, defamatory, obscene or
            infringing, or anyone else&apos;s personal details. We may remove reviews that break these rules. We do not pay
            for reviews or offer anything in return for them.
          </p>

          <h2>Photos and content</h2>
          <p>
            Photos of our band, ghodi, baggi, lights and shop are our own. Some decorative images on this site are
            illustrative and do not show a specific {SITE.name} event. Please do not copy our photos or text without
            permission. If you believe something on this site belongs to you, contact us and we will review and remove it
            promptly.
          </p>

          <h2>Accuracy and liability</h2>
          <p>
            We try to keep the information on this site accurate and up to date, but it is provided for general information.
            To the extent permitted by law, we are not liable for any loss arising from use of the website itself. This does
            not limit your rights as a consumer under Indian law.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India, and the courts of Delhi have jurisdiction.</p>

          <h2>Contact</h2>
          <p>
            {SITE.owner}, {SITE.name}, {SITE.address.street}, {SITE.address.locality}, {SITE.address.city}{" "}
            {SITE.address.postalCode}. Phone{" "}
            <a href={telLink()} className="text-maroon underline underline-offset-2">
              {SITE.phones[0].display}
            </a>
            . See also our{" "}
            <Link href="/privacy" className="text-maroon underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
