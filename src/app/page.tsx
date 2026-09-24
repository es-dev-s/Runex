import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { DeployExhibit } from "@/components/DeployExhibit";
import { FAQ } from "@/components/FAQ";
import { SectionHeading } from "@/components/FeatureGrid";
import { HeroCommand } from "@/components/HeroCommand";
import { HeroDepth } from "@/components/HeroDepth";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn, HeroReveal, Stagger, StaggerItem } from "@/components/Motion";
import { faqJsonLd } from "@/lib/seo";
import { appSignUpUrl, siteConfig } from "@/lib/site";

const faqs = [
  {
    question: "What is Runex?",
    answer:
      "Runex is an easy cloud deployment platform for developers. Connect a GitHub repository, deploy into an isolated container environment, and get a public HTTPS URL on *.runex.cloud.",
  },
  {
    question: "Is Runex a deployment platform?",
    answer:
      "Yes. Runex is a cloud deployment platform (PaaS-style) focused on easy application deployment for developers — also referred to as Runex Cloud.",
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
    question: "Can Runex deploy Docker, Next.js, Node.js, Python, and Go?",
    answer:
      "Yes. Dedicated deploy landings cover Next.js, Node.js, Python, Go, and Docker. Start from the deploy hub or install the GitHub App and ship a supported project.",
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
  {
    question: "How does Runex compare with a VPS?",
    answer:
      "A VPS is a machine you administer. Runex is a deployment platform: you ship apps from GitHub/Docker without operating the host OS for every project. See the Runex vs VPS comparison and the PaaS vs VPS guide for details.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect repository",
    description:
      "Install the Runex GitHub App and grant access to the repositories you want to deploy.",
  },
  {
    step: "02",
    title: "Configure deploy",
    description:
      "Select a repository and branch. Runex detects the project and prepares a build.",
  },
  {
    step: "03",
    title: "Build & isolate",
    description:
      "Your application is built and started in an isolated container environment.",
  },
  {
    step: "04",
    title: "Ship HTTPS URL",
    description:
      "Reach your app at https://<deployment>.runex.cloud — then attach a custom domain when ready.",
  },
];

const tech = [
  { name: "GitHub", href: "/deploy/github" },
  { name: "Next.js", href: "/deploy/nextjs" },
  { name: "Node.js", href: "/deploy/nodejs" },
  { name: "Python", href: "/deploy/python" },
  { name: "Go", href: "/deploy/go" },
  { name: "Docker", href: "/deploy/docker" },
];

const learn = [
  {
    href: "/what-is-runex",
    title: "What is Runex?",
    body: "Brand entity page: what Runex is, how it works, and who it is for.",
  },
  {
    href: "/deploy",
    title: "Deploy hub",
    body: "GitHub, Docker, and framework landings in one place.",
  },
  {
    href: "/docs/getting-started",
    title: "Getting started",
    body: "Create an account, connect GitHub, and ship your first deployment.",
  },
];

export default function HomePage() {
  const host = siteConfig.url.replace("https://", "");

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero — RareUI scale: display type, blackspace, atmospheric depth (no circles) */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <HeroDepth />

        <Container className="relative z-10 flex flex-col items-center pb-28 pt-32 text-center sm:pb-36 sm:pt-36">
          <HeroReveal delay={0.04}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-card-border bg-[#0c0c0c]/85 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Deploy from GitHub
              </span>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.12} className="mt-10 max-w-4xl">
            <h1 className="display text-[3.15rem] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Easy deployment
              <br />
              for developers.
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.22} className="mt-7 max-w-xl">
            <p className="body-muted text-[15px] sm:text-[17px] sm:leading-relaxed">
              Runex is a cloud deployment platform that helps developers deploy
              applications without manually managing deployment infrastructure —
              from GitHub to HTTPS on *.runex.cloud.
            </p>
          </HeroReveal>

          <HeroReveal
            delay={0.34}
            className="mt-12 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <HeroCommand
              command="connect github → select repo → deploy"
              copyText={`connect github → select repo → deploy · https://<app>.${host}`}
            />
            <Button
              href={appSignUpUrl()}
              external
              className="shrink-0 !rounded-full !px-7 !py-3 text-[14px]"
            >
              Deploy
            </Button>
          </HeroReveal>

          <HeroReveal delay={0.42} className="mt-8">
            <p className="text-xs text-muted-dim">
              New here?{" "}
              <Link
                href="/what-is-runex"
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                What is Runex?
              </Link>
              {" · "}
              <Link
                href="/deploy"
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Deploy hub
              </Link>
            </p>
          </HeroReveal>
        </Container>
      </section>

      {/* Bento capabilities */}
      <section className="pb-24 sm:pb-28">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Exhibits, not icon waffle."
            description="A live deploy surface up front — supporting tiles for the controls that actually ship."
          />

          <div className="grid gap-3.5 lg:grid-cols-12">
            <FadeIn className="lg:col-span-7">
              <DeployExhibit />
            </FadeIn>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <FadeIn delay={0.05}>
                <article className="frame-tight h-full p-5 sm:p-6">
                  <p className="micro-label">GitHub App</p>
                  <h3 className="mt-3 text-[15px] font-semibold tracking-tight">
                    Install once. Deploy from branches.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Repository access, branch selection, and push-triggered
                    redeploys when webhooks are active.
                  </p>
                </article>
              </FadeIn>
              <FadeIn delay={0.1}>
                <article className="artboard-surface h-full p-5 sm:p-6 transition hover:border-zinc-500">
                  <p className="micro-label">HTTPS + domains</p>
                  <h3 className="mt-3 text-[15px] font-semibold tracking-tight">
                    *.runex.cloud, then your name.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Production HTTPS out of the box. Custom domains via CNAME to{" "}
                    {siteConfig.cnameTarget}.
                  </p>
                </article>
              </FadeIn>
            </div>

            <FadeIn delay={0.08} className="sm:col-span-1 lg:col-span-4">
              <article className="frame-tight h-full p-5 sm:p-6">
                <p className="micro-label">Isolation</p>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight">
                  Containers with resource limits
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Workloads run isolated — we document mechanisms, not slogans.
                  See security for what is enforced vs roadmap.
                </p>
                <Link
                  href="/security"
                  className="mt-4 inline-block text-sm text-accent hover:text-accent-soft"
                >
                  Security overview →
                </Link>
              </article>
            </FadeIn>

            <FadeIn delay={0.12} className="sm:col-span-1 lg:col-span-4">
              <article className="frame-tight h-full p-5 sm:p-6">
                <p className="micro-label">Visibility</p>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight">
                  Build and runtime status
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Track what shipped and diagnose failures. Log depth continues
                  to evolve — labeled honestly.
                </p>
                <Link
                  href="/features"
                  className="mt-4 inline-block text-sm text-accent hover:text-accent-soft"
                >
                  All features →
                </Link>
              </article>
            </FadeIn>

            <FadeIn delay={0.16} className="lg:col-span-4">
              <a
                href={appSignUpUrl()}
                rel="noopener noreferrer"
                className="flex h-full min-h-[190px] flex-col justify-between rounded-[1.25rem] border border-accent/40 bg-accent px-5 py-6 text-black transition hover:-translate-y-0.5 hover:bg-accent-soft sm:px-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60">
                  Start
                </p>
                <div>
                  <p className="display text-2xl sm:text-3xl">
                    Deploy your
                    <br />
                    first app
                  </p>
                  <p className="mt-2 text-sm text-black/70">
                    Open runex.cloud → sign up
                  </p>
                </div>
              </a>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-t border-card-border py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Four quiet steps."
            description="Connect, configure, deploy, and ship — without operating a VPS for every application."
          />
          <Stagger className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem key={s.step}>
                <article className="frame-tight h-full p-5 sm:p-6">
                  <p className="font-mono text-[11px] tracking-wide text-accent">
                    {s.step}
                  </p>
                  <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-foreground">
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

      {/* Technologies */}
      <section className="border-t border-card-border py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Stacks"
            title="Deploy what you already write."
            description="Start at the deploy hub, or jump to Next.js, Node.js, Python, Go, Docker, and GitHub."
          />
          <Stagger className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {tech.map((t) => (
              <StaggerItem key={t.name}>
                <Link
                  href={t.href}
                  className="frame-tight flex h-full items-center justify-center px-4 py-8 text-center text-sm font-semibold tracking-tight text-foreground transition hover:border-accent/40"
                >
                  {t.name}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Learn */}
      <section className="border-t border-card-border py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Learn"
            title="Docs before slogans."
            description="Getting started, GitHub deploys, custom domains, and practical guides."
          />
          <div className="grid gap-3.5 sm:grid-cols-3">
            {learn.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="frame-tight p-6 transition hover:border-zinc-500 sm:p-7"
              >
                <p className="micro-label">Guide</p>
                <h3 className="mt-3 font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-card-border py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Straight answers." />
          <FAQ items={faqs} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
