import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { HookSidebar } from "@/components/HookSidebar";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { appSignUpUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "What Is Runex?",
  description:
    "What is Runex? Runex is an easy cloud deployment platform for developers (also known as Runex Cloud). Deploy from GitHub or Docker to HTTPS on *.runex.cloud.",
  path: "/what-is-runex",
});

const faqs = [
  {
    question: "What is Runex?",
    answer:
      "Runex is an easy cloud deployment platform for developers. Connect a GitHub repository or Docker-based project, deploy into an isolated container environment, and get a public HTTPS URL on *.runex.cloud.",
  },
  {
    question: "Is Runex the same as Runex Cloud?",
    answer:
      "Yes. Runex Cloud refers to the same product at runex.cloud — an easy cloud deployment platform for developers.",
  },
  {
    question: "Is Runex a deployment platform?",
    answer:
      "Yes. Runex is a cloud deployment platform (PaaS-style) focused on easy application deployment for developers.",
  },
  {
    question: "Who is Runex for?",
    answer:
      "Developers, startups, small engineering teams, and agencies that want to ship applications without manually operating a VPS for every project.",
  },
  {
    question: "Does Runex support GitHub and Docker?",
    answer:
      "Yes. Runex uses a GitHub App for repository deploy and supports Docker-based deployments from a Dockerfile in your repository.",
  },
];


const hookSections = [
  { id: "problem", label: "Problem" },
  { id: "how-it-works", label: "How it works" },
  { id: "what-you-deploy", label: "What you deploy" },
  { id: "isolation", label: "Isolation" },
  { id: "github", label: "GitHub" },
  { id: "docker", label: "Docker" },
  { id: "who-for", label: "Who it's for" },
  { id: "documentation", label: "Docs" },
  { id: "faq", label: "FAQ" },
] as const;

export default function WhatIsRunexPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "What is Runex?", path: "/what-is-runex" },
        ])}
      />

      <HookSidebar sections={hookSections} />

      <PageHero
        eyebrow="Brand"
        title="What is Runex?"
        description="Runex is an easy cloud deployment platform for developers. Also known as Runex Cloud, it helps you deploy applications without manually managing deployment infrastructure."
      >
        <Button href={appSignUpUrl()} external>
          Deploy with Runex
        </Button>
        <Button href="/docs/getting-started" variant="secondary">
          Getting started
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16 sm:py-20">
        <Container className="max-w-3xl prose-runex">
          <FadeIn>
            <h2 id="problem" className="scroll-mt-28">What problem does Runex solve?</h2>
            <p>
              Shipping an app often means provisioning a host, installing
              runtimes, configuring TLS, writing deploy scripts, and repeating
              that work for every project. Runex collapses the common path:
              connect source, build, run in isolation, and expose HTTPS.
            </p>

            <h2 id="how-it-works" className="scroll-mt-28">How does Runex work?</h2>
            <pre>{`Developer
   |
   v
GitHub repository (GitHub App)
   |
   v
Runex builds & creates isolated deployment
   |
   v
https://<deployment-slug>.runex.cloud
   |
   +--> optional custom domain via ${siteConfig.cnameTarget}`}</pre>
            <p>
              Typical steps: install the Runex GitHub App, select a repository
              and branch, deploy, then open your platform URL. Push-triggered
              redeployment is available when webhooks are configured.
            </p>

            <h2 id="what-you-deploy" className="scroll-mt-28">What can I deploy?</h2>
            <ul>
              <li>
                <Link href="/deploy/nextjs">Next.js</Link>
              </li>
              <li>
                <Link href="/deploy/nodejs">Node.js</Link>
              </li>
              <li>
                <Link href="/deploy/python">Python</Link>
              </li>
              <li>
                <Link href="/deploy/go">Go</Link>
              </li>
              <li>
                <Link href="/deploy/docker">Docker</Link> (Dockerfile-based
                workloads)
              </li>
            </ul>
            <p>
              See the <Link href="/deploy">deploy hub</Link> for stack landings
              and the commercial{" "}
              <Link href="/deploy/github">deploy from GitHub</Link> page.
            </p>

            <h2 id="isolation" className="scroll-mt-28">How does Runex handle isolation?</h2>
            <p>
              Runex deploys applications in isolated containers with resource
              controls. We describe mechanisms on the{" "}
              <Link href="/security">security</Link> page and only claim
              controls that are enforced in production — not slogans like
              “military-grade” or unverified compliance labels.
            </p>

            <h2 id="github" className="scroll-mt-28">Does Runex support GitHub?</h2>
            <p>
              Yes. Runex uses a <strong>GitHub App</strong> for repository
              access, branch selection, webhook verification, and automated
              redeployment on the selected branch. Details live in{" "}
              <Link href="/docs/deploy-from-github">
                Deploy from GitHub
              </Link>
              .
            </p>

            <h2 id="docker" className="scroll-mt-28">Does Runex support Docker?</h2>
            <p>
              Yes. Provide a production Dockerfile; Runex builds the image, runs
              it in isolation, and serves HTTPS. You do not need to operate
              Kubernetes yourself. See{" "}
              <Link href="/deploy/docker">Deploy Docker</Link>.
            </p>

            <h2 id="who-for" className="scroll-mt-28">Who is Runex for?</h2>
            <p>
              Developers and small teams who want easy application deployment —
              including full-stack apps where a frontend and backend API both
              ship on Runex and connect to external databases when needed. See{" "}
              <Link href="/use-cases/full-stack-apps">
                full-stack use cases
              </Link>
              .
            </p>

            <h2 id="documentation" className="scroll-mt-28">Documentation</h2>
            <ul>
              <li>
                <Link href="/docs/getting-started">Getting started</Link>
              </li>
              <li>
                <Link href="/docs/deploy-from-github">Deploy from GitHub</Link>
              </li>
              <li>
                <Link href="/docs/environment-variables">
                  Environment variables
                </Link>
              </li>
              <li>
                <Link href="/docs/custom-domains">Custom domains</Link>
              </li>
              <li>
                <Link href="/docs/troubleshooting">Troubleshooting</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>

            <h2 id="faq" className="scroll-mt-28">FAQ</h2>
            <div className="not-prose mt-4">
              <FAQ items={faqs} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTASection title="Deploy on Runex Cloud" />
    </>
  );
}
