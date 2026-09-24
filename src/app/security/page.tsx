import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { HookSidebar } from "@/components/HookSidebar";
import { buildMetadata } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description:
    "How Runex approaches deployment security: container isolation, HTTPS/TLS, webhook verification, resource limits, and honest documentation of controls that are still on the roadmap.",
  path: "/security",
});

const sections = [
  {
    id: "workload-isolation",
    title: "Application isolation",
    body: "Each deployed application runs inside its own container/environment rather than directly inside the host operating system. The goal is to reduce the blast radius if a single workload is compromised.",
  },
  {
    id: "container-security",
    title: "Container security",
    body: "Containers are the primary isolation boundary for app workloads. Production direction includes restricted privileges, limited capabilities, resource limits, and no direct Docker socket access for untrusted workloads. Only controls that are enforced in production should be treated as guarantees.",
  },
  {
    id: "network-isolation",
    title: "Network isolation",
    body: "Runex is progressing toward clearer network boundaries between projects so one customer’s deployment cannot freely reach another customer’s private services. Deeper project-level network policies are an architecture direction — mark them as roadmap until fully enforced.",
    badge: "Direction / roadmap where noted",
  },
  {
    id: "database-isolation",
    title: "Database isolation",
    body: "Where databases are provided or attached, isolation should be scoped by project/application. Do not assume cross-project database access is available or desirable.",
    badge: "Depends on product surface",
  },
  {
    id: "tls",
    title: "TLS / HTTPS",
    body: "Runex provides HTTPS for deployed applications on *.runex.cloud and for custom domains connected through cname.runex.cloud. We describe HTTPS as a concrete control — not “military-grade encryption.”",
  },
  {
    id: "secrets",
    title: "Secrets & environment variables",
    body: "Secrets and environment variables should be injected server-side/runtime-side — never embedded in public HTML, client JavaScript, or public repositories. Documented secret-rotation and visibility behavior will match what the dashboard actually implements.",
  },
  {
    id: "webhooks",
    title: "GitHub webhook verification",
    body: "Deployment webhooks from GitHub are verified so automated redeploys are tied to authenticated GitHub events rather than arbitrary unauthenticated requests.",
  },
  {
    id: "build-isolation",
    title: "Build isolation",
    body: "Builds should run in controlled environments separate from unrelated customer runtimes. Exact build sandbox details evolve with the platform; we avoid overstating them here.",
  },
  {
    id: "resource-limits",
    title: "Resource limits",
    body: "CPU, memory, and related limits protect the host and reduce the risk that one deployment consumes resources needed by others.",
  },
  {
    id: "access-control",
    title: "Access control",
    body: "Access to deploy and manage applications is gated by authenticated Runex accounts and GitHub App permissions for repository access.",
  },
  {
    id: "logging",
    title: "Logging & monitoring",
    body: "Deployment status and logs help operators understand build/runtime failures. Platform-level monitoring continues to deepen; we do not publish unverified SLAs.",
    badge: "Evolving",
  },
  {
    id: "compliance",
    title: "Compliance",
    body: "Runex does not claim SOC 2, ISO 27001, PCI DSS, HIPAA, or similar certifications on this page. If formal certifications are obtained later, they will be listed here with accurate scope.",
  },
  {
    id: "vulnerability",
    title: "Vulnerability reporting",
    body: "If you believe you have found a security issue in Runex, contact the team through the channels published on runex.cloud / about. Please avoid posting exploit details publicly before coordinated disclosure.",
  },
];


const hookSections = [
  { id: "workload-isolation", label: "Isolation" },
  { id: "container-security", label: "Containers" },
  { id: "network-isolation", label: "Network" },
  { id: "database-isolation", label: "Databases" },
  { id: "tls", label: "TLS" },
  { id: "secrets", label: "Secrets" },
  { id: "webhooks", label: "Webhooks" },
  { id: "build-isolation", label: "Builds" },
  { id: "resource-limits", label: "Limits" },
  { id: "access-control", label: "Access" },
  { id: "logging", label: "Logging" },
  { id: "compliance", label: "Compliance" },
  { id: "vulnerability", label: "Reporting" },
] as const;

export default function SecurityPage() {
  return (
    <>
      <HookSidebar sections={hookSections} />

      <PageHero
        eyebrow="Security"
        title="Security at Runex"
        description="We document mechanisms, not slogans. Runex isolates application workloads using containers and applies resource and network controls to reduce the blast radius of a compromised deployment — and we clearly mark roadmap items."
      >
        <Button href={appSignUpUrl()} external>
          Deploy with Runex
        </Button>
        <Button href="/docs" variant="secondary">
          Documentation
        </Button>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FadeIn>
            <p className="rounded-[1.25rem] border border-accent/30 bg-accent/[0.06] px-5 py-4 text-sm leading-relaxed text-muted">
              Accuracy rule: if a control is not yet enforced in production, it
              is labeled as direction or roadmap. Prefer “Runex deploys
              applications in isolated containers” over absolute claims like
              “complete project-level network isolation” until that boundary
              exists.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <FadeIn key={section.id}>
                <article id={section.id} className="scroll-mt-28">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    {section.badge && (
                      <span className="rounded-full border border-card-border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {section.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
