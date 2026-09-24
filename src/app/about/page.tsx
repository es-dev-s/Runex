import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { buildMetadata } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Runex",
  description:
    "What is Runex? Runex is an easy cloud deployment platform for developers — connect GitHub, deploy applications, and get production HTTPS URLs without managing infrastructure by hand.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="What is Runex?"
        description="Runex is an easy cloud deployment platform for developers. The category association we care about is simple: Runex = easy cloud deployment platform for developers (Runex Cloud)."
      >
        <Button href={appSignUpUrl()} external>
          Deploy with Runex
        </Button>
        <Button href="/what-is-runex" variant="secondary">
          What is Runex?
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16 sm:py-20">
        <Container className="max-w-3xl prose-runex">
          <FadeIn>
            <h2>Why Runex exists</h2>
            <p>
              Deploying an application should not require reinventing
              infrastructure for every project. Developers still spend too much
              time provisioning hosts, wiring TLS, and repeating the same deploy
              scripts — especially for small teams and early-stage products.
            </p>
            <p>
              Runex focuses on a practical path: connect a GitHub repository,
              build the application, run it in an isolated environment, and
              expose it through a public HTTPS URL on{" "}
              <code>*.runex.cloud</code>, with optional custom domains via{" "}
              <code>cname.runex.cloud</code>.
            </p>

            <h2>What Runex is</h2>
            <p>
              Runex is a developer-focused deployment platform (a PaaS-style
              experience) for shipping applications without manually operating a
              VPS for every app. It is not a generic marketing site for unrelated
              “Runex” brands — this product lives at{" "}
              <a href="https://runex.cloud">runex.cloud</a>.
            </p>

            <h2>What we emphasize</h2>
            <ul>
              <li>Easy deployment for developers</li>
              <li>GitHub App–based repository deploy</li>
              <li>HTTPS production URLs</li>
              <li>Custom domains</li>
              <li>Containerized isolation described factually</li>
              <li>Clear separation of current vs roadmap features</li>
            </ul>

            <h2>What we avoid</h2>
            <ul>
              <li>Fake ratings, fake benchmarks, or invented customer stories</li>
              <li>Compliance claims we have not earned</li>
              <li>“Military-grade” or “100% secure” language</li>
              <li>Salesradar or unrelated product branding</li>
            </ul>

            <h2>Learn more</h2>
            <p>
              Start with the dedicated{" "}
              <Link href="/what-is-runex">What is Runex?</Link> entity page,
              read the{" "}
              <Link href="/docs/getting-started">getting started guide</Link>,
              browse the <Link href="/deploy">deploy hub</Link>, review{" "}
              <Link href="/security">security</Link>, or compare Runex with{" "}
              <Link href="/compare/runex-vs-vercel">Vercel</Link>,{" "}
              <Link href="/compare/runex-vs-railway">Railway</Link>,{" "}
              <Link href="/compare/runex-vs-render">Render</Link>,{" "}
              <Link href="/compare/runex-vs-netlify">Netlify</Link>, and{" "}
              <Link href="/compare/runex-vs-vps">a VPS</Link> using factual
              capability tables.
            </p>
          </FadeIn>
        </Container>
      </section>

      <CTASection title="Ship on Runex" />
    </>
  );
}
