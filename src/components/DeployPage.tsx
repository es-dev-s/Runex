import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export type DeployPageProps = {
  name: string;
  path: string;
  headline: string;
  summary: string;
  steps: string[];
  notes: string[];
  faqs: FAQItem[];
  related?: { href: string; label: string }[];
};

const defaultRelated = [
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/deploy/github", label: "Deploy from GitHub" },
  { href: "/deploy/docker", label: "Deploy Docker" },
  { href: "/docs/environment-variables", label: "Environment variables" },
  { href: "/docs/custom-domains", label: "Custom domains" },
  { href: "/security", label: "Security" },
];

export function DeployPage({
  name,
  path,
  headline,
  summary,
  steps,
  notes,
  faqs,
  related,
}: DeployPageProps) {
  const relatedLinks = related ?? defaultRelated.filter((r) => r.href !== path);

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Deploy", path: "/deploy" },
          { name, path },
        ])}
      />
      <PageHero
        eyebrow={`Deploy ${name}`}
        title={headline}
        description={summary}
        auraPlacement="br"
      >
        <Button href={appSignUpUrl()} external>
          Deploy a {name} app
        </Button>
        <Button href="/docs/getting-started" variant="secondary">
          Getting started
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16">
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 className="display text-2xl text-foreground">
              How to deploy {name} on Runex
            </h2>
            <ol className="mt-6 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 display text-2xl text-foreground">
              Practical notes
            </h2>
            <ul className="mt-4 space-y-2">
              {notes.map((note) => (
                <li key={note} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {note}
                </li>
              ))}
            </ul>

            {relatedLinks.length > 0 && (
              <>
                <h2 className="mt-12 display text-2xl text-foreground">
                  Related
                </h2>
                <ul className="mt-4 space-y-2">
                  {relatedLinks.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="text-sm text-accent hover:text-accent-soft"
                      >
                        {r.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-12 display text-2xl text-foreground">
              FAQ
            </h2>
            <div className="mt-4">
              <FAQ items={faqs} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTASection title={`Deploy ${name} with Runex`} />
    </>
  );
}
