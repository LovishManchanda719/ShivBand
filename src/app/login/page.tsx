import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import AuthForm from "@/components/site/AuthForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <PageShell>
      <section className="container py-14 sm:py-20">
        <AuthForm mode="login" />
      </section>
    </PageShell>
  );
}
