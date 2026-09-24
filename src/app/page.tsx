import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { FeatureGrid, SectionHeading } from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { faqJsonLd } from "@/lib/seo";
import { appSignUpUrl, siteConfig } from "@/lib/site";

const faqs = [
  {
    question: "What is Runex?",
    answer:
      "Runex is a cloud deployment platform for developers that simplifies deploying applications to production. Connect a GitHub repository, deploy, and get a public HTTPS URL.",
  },
  {
    question: "How does Runex work?",
    answer:
      "Runex connects to your application source via a GitHub App, builds the application, creates an isolated deployment environment, and exposes the result through a public HTTPS URL on *.runex.cloud.",
  },
  {
    question: "Can I deploy from GitHub?",
    answer:
      "Yes. Runex uses a GitHub App for repository access, branch selection, and deployment. Push-triggered redeployment is supported when webhooks are configured.",
  },
  {
    question: "Does Runex provide HTTPS?",
    answer:
      "Yes. Runex provides HTTPS for deployed applications on *.runex.cloud and for custom domains connected through cname.runex.cloud.",
  },
  {
    question: "Can I use a custom domain?",
    answer:
      "Yes. Point your domain's CNAME to cname.runex.cloud and attach it to a Runex deployment. See the custom domains documentation for the full steps.",
  },
  {
    question: "How does Runex isolate applications?",
    answer:
      "Runex deploys applications in isolated containers with resource controls. Isolation is described at a high level on the security page; we only claim controls that are enforced in production.",
  },
];

const features = [
  {
    title: "GitHub App deploy",
    description:
      "Install the Runex GitHub App, select a repository and branch, and deploy without managing servers by hand.",
  },
  {
    title: "Automatic redeploys",
    description:
      "Push-triggered redeployment keeps production aligned with your selected branch when webhooks are active.",
  },
  {
    title: "HTTPS by default",
    description:
      "Every deployment is exposed over HTTPS on a predictable *.runex.cloud URL.",
  },
  {
    title: "Custom domains",
    description:
      "Connect your own domain by pointing a CNAME to cname.runex.cloud and attaching it to a deployment.",
  },
  {
    title: "Container isolation",
    description:
      "Workloads run in isolated containers with resource limits to reduce blast radius across deployments.",
  },
  {
    title: "Deployment visibility",
    description:
      "Track build and runtime status so you can see what shipped and diagnose failures quickly.",
    badge: "Evolving",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect your repository",
    description:
      "Install the Runex GitHub App and grant access to the repositories you want to deploy.",
  },
  {
    step: "02",
    title: "Configure your deployment",
    description:
      "Select a repository and branch. Runex detects the project and prepares a build.",
  },
  {
    step: "03",
    title: "Runex builds and deploys",
    description:
      "Your application is built and started in an isolated container environment.",
  },
  {
    step: "04",
    title: "Get a production URL",
    description:
      "Reach your app at https://<deployment>.runex.cloud — then attach a custom domain when ready.",
  },
];

const tech = [
  { name: "Next.js", href: "/deploy/nextjs" },
  { name: "Node.js", href: "/deploy/nodejs" },
  { name: "Python", href: "/deploy/python" },
  { name: "Go", href: "/deploy/go" },
  { name: "Docker", href: "/deploy/docker" },
];

const useCases = [
  {
    title: "Developers",
    description:
      "Ship side projects and production apps without babysitting a VPS for every deployment.",
  },
  {
    title: "Startups",
    description:
      "Move from repository to public HTTPS URL quickly while you focus on the product.",
  },
  {
    title: "Small teams",
    description:
      "Share a consistent deploy path across services without a full platform-ops team.",
  },
  {
    title: "Agencies",
    description:
      "Stand up client apps on predictable URLs and custom domains with less ops overhead.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 grid-fade opacity-70" aria-hidden />
        <div className="glow-orb absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2" aria-hidden />
        <Container className="relative pb-20 pt-20 sm:pb-28 sm:pt-28">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
              Cloud deployment platform
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]">
              Easy deployment for developers.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Runex is a cloud deployment platform that helps developers deploy
              applications from their code repositories without manually managing
              deployment infrastructure.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={appSignUpUrl()} external className="min-w-[160px]">
                Deploy your first application
              </Button>
              <Button href="/docs" variant="secondary" className="min-w-[160px]">
                Read the documentation
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mx-auto mt-14 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-card/80 p-2 shadow-[0_0_80px_rgba(245,158,11,0.08)]">
              <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-5 font-mono text-xs text-stone-400 sm:p-6 sm:text-sm">
                <div className="mb-4 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                </div>
                <p className="text-stone-500"># From GitHub to production</p>
                <p className="mt-2">
                  <span className="text-accent">$</span> connect github → select
                  repo → deploy
                </p>
                <p className="mt-3 text-stone-300">
                  → https://&lt;deployment&gt;.{siteConfig.url.replace("https://", "")}
                </p>
                <p className="mt-4 text-stone-500">
                  HTTPS · custom domains via cname.runex.cloud · container isolation
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
              {[
                "GitHub App",
                "Docker-friendly",
                "HTTPS",
                "Custom domains",
                "Isolation",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-b border-white/5 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From GitHub to production in a few steps."
            description="Connect, configure, deploy, and ship — without operating a VPS for every application."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem key={s.step}>
                <article className="h-full rounded-2xl border border-white/10 bg-card/50 p-5">
                  <p className="font-mono text-xs text-accent">{s.step}</p>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Features */}
      <section className="border-b border-white/5 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Features"
            title="What you get with Runex."
            description="Accurate product capabilities — no military-grade marketing, no fake benchmarks."
          />
          <FeatureGrid features={features} />
          <div className="mt-8">
            <Link
              href="/features"
              className="text-sm font-medium text-accent hover:text-accent-soft"
            >
              Explore all features →
            </Link>
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="border-b border-white/5 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Supported technologies"
            title="Deploy the stacks you already use."
            description="Dedicated landing pages for Next.js, Node.js, Python, Go, and Docker deployments."
          />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {tech.map((t) => (
              <StaggerItem key={t.name}>
                <Link
                  href={t.href}
                  className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-card/60 px-4 py-6 text-center text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-card"
                >
                  {t.name}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Security teaser */}
      <section className="border-b border-white/5 py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Security"
              title="Isolation that matches how you ship."
              description="Runex isolates application workloads using containers and applies resource controls to reduce the blast radius of a compromised deployment. We document mechanisms — not vague promises."
            />
            <FadeIn>
              <ul className="space-y-3 rounded-2xl border border-white/10 bg-card/60 p-6">
                {[
                  "Containerized application workloads",
                  "Resource limits on deployments",
                  "HTTPS for public deployments",
                  "GitHub webhook verification for deploy triggers",
                  "Project-oriented isolation direction (roadmap where noted)",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/security"
                className="mt-5 inline-block text-sm font-medium text-accent hover:text-accent-soft"
              >
                Read the security overview →
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="border-b border-white/5 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Who it’s for"
            title="Built for people who ship software."
          />
          <FeatureGrid features={useCases} columns={2} />
        </Container>
      </section>

      {/* Docs / tutorials */}
      <section className="border-b border-white/5 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Learn"
            title="Documentation and tutorials."
            description="Start with getting started, then dive into GitHub deploys, custom domains, and stack-specific guides."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/docs/getting-started",
                title: "Getting started",
                body: "Create an account, connect GitHub, and ship your first deployment.",
              },
              {
                href: "/docs/deploy-from-github",
                title: "Deploy from GitHub",
                body: "How the GitHub App, repository access, and webhooks fit together.",
              },
              {
                href: "/blog",
                title: "Blog & guides",
                body: "Deployment platform explainers, tutorials, and practical how-tos.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-2xl border border-white/10 bg-card/60 p-6 transition hover:border-accent/30"
              >
                <h3 className="font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.body}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions about Runex."
          />
          <FAQ items={faqs} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
