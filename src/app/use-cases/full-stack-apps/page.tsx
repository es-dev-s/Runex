import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Full-Stack Applications",
  description:
    "Deploy full-stack applications with Runex: ship frontend and backend API services from GitHub to HTTPS, and connect to external databases your app already uses.",
  path: "/use-cases/full-stack-apps",
});

const faqs = [
  {
    question: "Can I deploy a full-stack app on Runex?",
    answer:
      "Yes. Deploy your frontend and backend API as Runex applications (often from the same monorepo or separate repos), expose them over HTTPS, and have the frontend call your API. Databases are typically external services your app connects to via environment variables.",
  },
  {
    question: "Does Runex provide managed databases?",
    answer:
      "Do not assume a managed database product unless your Runex dashboard documents one. Apps commonly connect to external Postgres, MySQL, or other providers using environment variables.",
  },
];

export default function FullStackUseCasePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Use cases", path: "/use-cases" },
          { name: "Full-stack apps", path: "/use-cases/full-stack-apps" },
        ])}
      />

      <PageHero
        eyebrow="Use case"
        title="Deploy full-stack applications"
        description="Runex is an easy cloud deployment platform for developers who need to ship a frontend and a backend API without manually operating a VPS for every service."
      >
        <Button href={appSignUpUrl()} external>
          Deploy a full-stack app
        </Button>
        <Button href="/deploy/github" variant="secondary">
          Deploy from GitHub
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16">
        <Container className="max-w-3xl prose-runex">
          <FadeIn>
            <h2>Architecture on Runex</h2>
            <p>
              A common full-stack layout looks like this — Runex hosts the
              application services; data stores stay where you already run them
              unless a managed database feature is explicitly available in your
              account:
            </p>
            <pre>{`Browser / client
      |
      v
Frontend (e.g. Next.js on Runex)
      |
      v
Backend API (Node / Python / Go on Runex)
      |
      v
External database (provider of your choice)
`}</pre>
            <p>
              Each Runex deployment gets an HTTPS URL on{" "}
              <code>*.runex.cloud</code>. You can attach custom domains via{" "}
              <code>cname.runex.cloud</code> for production hostnames such as{" "}
              <code>app.example.com</code> and <code>api.example.com</code>.
            </p>

            <h2>Typical workflow</h2>
            <ol>
              <li>
                Push frontend and API code to GitHub (monorepo or separate
                repos).
              </li>
              <li>
                Install the Runex GitHub App and deploy each service you need
                publicly reachable.
              </li>
              <li>
                Configure{" "}
                <Link href="/docs/environment-variables">
                  environment variables
                </Link>{" "}
                for API URLs, secrets, and database connection strings.
              </li>
              <li>
                Point custom domains when ready — see{" "}
                <Link href="/docs/custom-domains">custom domains</Link>.
              </li>
            </ol>

            <h2>Stacks that fit</h2>
            <ul>
              <li>
                <Link href="/deploy/nextjs">Next.js</Link> frontend or full-stack
                app
              </li>
              <li>
                <Link href="/deploy/nodejs">Node.js</Link> API
              </li>
              <li>
                <Link href="/deploy/python">Python</Link> API
              </li>
              <li>
                <Link href="/deploy/go">Go</Link> API
              </li>
              <li>
                <Link href="/deploy/docker">Docker</Link> when you need a custom
                image
              </li>
            </ul>

            <h2>Databases — accurate expectations</h2>
            <p>
              Full-stack apps almost always need a database. On Runex, treat
              databases as <strong>external</strong> unless your dashboard
              documents a managed database offering. Pass credentials through
              environment variables; never commit secrets.
            </p>

            <h2>FAQ</h2>
            <div className="not-prose mt-4">
              <FAQ items={faqs} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTASection title="Ship frontend + API on Runex" />
    </>
  );
}
