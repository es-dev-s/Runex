import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Use Cases",
  description:
    "Runex use cases for developers: full-stack application deployment, GitHub-based shipping, and Docker workloads on an easy cloud deployment platform.",
  path: "/use-cases",
});

export default function UseCasesIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Use cases", path: "/use-cases" },
        ])}
      />
      <PageHero
        eyebrow="Use cases"
        title="How teams use Runex"
        description="Runex is an easy cloud deployment platform for developers. Start with full-stack apps — more audience-specific pages can follow as product surfaces mature."
      >
        <Button href={appSignUpUrl()} external>
          Deploy
        </Button>
        <Button href="/deploy" variant="secondary">
          Deploy hub
        </Button>
      </PageHero>
      <section className="border-b border-card-border py-16">
        <Container>
          <Link
            href="/use-cases/full-stack-apps"
            className="frame-tight block max-w-xl p-6 transition hover:border-accent/40"
          >
            <p className="micro-label">Featured</p>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
              Full-stack applications
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Deploy frontend and backend API services on Runex; connect to
              external databases your app already uses.
            </p>
            <span className="mt-4 inline-block text-sm text-accent">
              Read use case →
            </span>
          </Link>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
