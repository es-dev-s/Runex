import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Applications",
  description:
    "Deploy applications on Runex — an easy cloud deployment platform for developers. Deploy from GitHub or Docker, including Next.js, Node.js, Python, and Go.",
  path: "/deploy",
});

const cards = [
  {
    href: "/deploy/github",
    title: "Deploy from GitHub",
    body: "GitHub App install, branch selection, and push-triggered redeploys.",
  },
  {
    href: "/deploy/docker",
    title: "Deploy Docker",
    body: "Build from a Dockerfile, run in isolation, serve HTTPS — no Kubernetes ops.",
  },
  {
    href: "/deploy/nextjs",
    title: "Next.js",
    body: "Ship Next.js apps from GitHub to *.runex.cloud.",
  },
  {
    href: "/deploy/nodejs",
    title: "Node.js",
    body: "Deploy Node backends and APIs with environment variables and HTTPS.",
  },
  {
    href: "/deploy/python",
    title: "Python",
    body: "Deploy Python apps (e.g. FastAPI/Flask-style services) from GitHub.",
  },
  {
    href: "/deploy/go",
    title: "Go",
    body: "Deploy Go services with a straightforward build-and-run path.",
  },
];

const faqs = [
  {
    question: "How do I deploy an application with Runex?",
    answer:
      "Sign up at runex.cloud, install the Runex GitHub App, select a repository and branch, then deploy. When the build succeeds you get https://<deployment-slug>.runex.cloud. Optionally attach a custom domain via CNAME to cname.runex.cloud.",
  },
  {
    question: "Can I deploy from GitHub?",
    answer:
      "Yes. GitHub App–based deploy is the primary workflow. See /deploy/github and the docs page Deploy from GitHub.",
  },
  {
    question: "Can Runex deploy Docker?",
    answer:
      "Yes. Include a Dockerfile in your repository; Runex builds and runs the container in isolation.",
  },
];

export default function DeployHubPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Deploy", path: "/deploy" },
        ])}
      />

      <PageHero
        eyebrow="Deploy"
        title="Deploy applications on Runex"
        description="Runex is an easy cloud deployment platform for developers. Connect GitHub (or ship a Dockerfile), build in isolation, and get a production HTTPS URL on *.runex.cloud."
      >
        <Button href={appSignUpUrl()} external>
          Deploy now
        </Button>
        <Button href="/docs/getting-started" variant="secondary">
          Getting started
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16">
        <Container>
          <FadeIn>
            <h2 className="display text-2xl text-foreground sm:text-3xl">
              Choose a path
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Start with GitHub for most apps, Docker when you need a custom
              runtime image, or jump straight to a framework landing.
            </p>
          </FadeIn>
          <Stagger className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <StaggerItem key={card.href}>
                <Link
                  href={card.href}
                  className="frame-tight flex h-full flex-col p-5 transition hover:border-accent/40 sm:p-6"
                >
                  <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.body}
                  </p>
                  <span className="mt-4 text-sm text-accent">Open →</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="border-b border-card-border py-16">
        <Container className="max-w-3xl">
          <h2 className="display text-2xl text-foreground">FAQ</h2>
          <div className="mt-4">
            <FAQ items={faqs} />
          </div>
          <ul className="mt-10 space-y-2 text-sm text-muted">
            <li>
              <Link href="/docs/environment-variables" className="text-accent hover:text-accent-soft">
                Environment variables →
              </Link>
            </li>
            <li>
              <Link href="/docs/custom-domains" className="text-accent hover:text-accent-soft">
                Custom domains →
              </Link>
            </li>
            <li>
              <Link href="/use-cases/full-stack-apps" className="text-accent hover:text-accent-soft">
                Full-stack apps →
              </Link>
            </li>
            <li>
              <Link href="/what-is-runex" className="text-accent hover:text-accent-soft">
                What is Runex? →
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <CTASection title="Ship your first deployment" />
    </>
  );
}
