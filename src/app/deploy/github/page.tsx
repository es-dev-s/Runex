import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BouncyIndicator } from "@/components/BouncyIndicator";
import { FadeIn } from "@/components/Motion";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Deploy from GitHub",
  description:
    "Deploy from GitHub with Runex — a GitHub deployment platform for developers. Install the GitHub App, select a branch, and get HTTPS on *.runex.cloud.",
  path: "/deploy/github",
});

const faqs = [
  {
    question: "Can I deploy an app from GitHub with Runex?",
    answer:
      "Yes. Install the Runex GitHub App, grant repository access, select a branch, and deploy. Push-triggered redeployment works when webhooks are configured.",
  },
  {
    question: "Is Runex a GitHub deployment platform?",
    answer:
      "Yes for application deploy workflows: Runex is an easy cloud deployment platform that uses a GitHub App as the primary source integration.",
  },
  {
    question: "Do you support pull-request preview apps?",
    answer:
      "Not claimed as a current product surface. Documentation will update explicitly if PR preview automation ships.",
  },
];


const bouncySections = [
  { id: "how", label: "How it works" },
  { id: "app", label: "GitHub App" },
  { id: "stacks", label: "Stacks" },
  { id: "faq", label: "FAQ" },
  { id: "deploy", label: "Deploy" },
] as const;

export default function DeployGitHubPage() {
  return (
    <>
      <BouncyIndicator sections={bouncySections} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Deploy", path: "/deploy" },
          { name: "GitHub", path: "/deploy/github" },
        ])}
      />

      <PageHero
        eyebrow="GitHub"
        title="Deploy from GitHub with Runex"
        description="Runex is a GitHub-connected cloud deployment platform for developers. Connect a repository, deploy the selected branch, and get a production HTTPS URL — without babysitting a VPS for every ship."
      >
        <Button href={appSignUpUrl()} external>
          Deploy from GitHub
        </Button>
        <Button href="/docs/deploy-from-github" variant="secondary">
          Technical docs
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16">
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 id="how" className="display scroll-mt-28 text-2xl text-foreground">
              How GitHub deployment works
            </h2>
            <ol className="mt-6 space-y-4">
              {[
                "Sign up at runex.cloud and open the dashboard.",
                "Install the Runex GitHub App on the account or org that owns your repo.",
                "Grant access only to repositories you intend to deploy.",
                "Select repository and branch, then start a deployment.",
                "Open https://<deployment-slug>.runex.cloud when the deploy is healthy.",
                "Optionally attach a custom domain with a CNAME to cname.runex.cloud.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>

            <h2 id="app" className="mt-12 display scroll-mt-28 text-2xl text-foreground">
              What the GitHub App provides
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                "Repository access scoped to what you grant",
                "Branch selection for deployable code",
                "Webhook verification for deploy triggers",
                "Automated redeployment after changes to the selected branch",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 id="stacks" className="mt-12 display scroll-mt-28 text-2xl text-foreground">
              Stacks that ship from GitHub
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/deploy/nextjs", "Next.js"],
                ["/deploy/nodejs", "Node.js"],
                ["/deploy/python", "Python"],
                ["/deploy/go", "Go"],
                ["/deploy/docker", "Docker"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-accent hover:text-accent-soft">
                    Deploy {label} →
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-muted">
              For installation details, webhook expectations, and what we do{" "}
              <em>not</em> claim yet (PR previews, status checks), read the{" "}
              <Link
                href="/docs/deploy-from-github"
                className="text-accent hover:text-accent-soft"
              >
                Deploy from GitHub documentation
              </Link>
              . Also see{" "}
              <Link
                href="/docs/environment-variables"
                className="text-accent hover:text-accent-soft"
              >
                environment variables
              </Link>{" "}
              and{" "}
              <Link href="/security" className="text-accent hover:text-accent-soft">
                security
              </Link>
              .
            </p>

            <h2 id="faq" className="mt-12 display scroll-mt-28 text-2xl text-foreground">FAQ</h2>
            <div className="mt-4">
              <FAQ items={faqs} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTASection id="deploy" title="Connect GitHub and deploy" />
    </>
  );
}
