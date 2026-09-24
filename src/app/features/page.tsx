import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FeatureGrid, SectionHeading } from "@/components/FeatureGrid";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Features",
  description:
    "Runex features for developers: GitHub App deploy, HTTPS on *.runex.cloud, custom domains via cname.runex.cloud, container isolation, and deployment visibility.",
  path: "/features",
});

const core = [
  {
    title: "GitHub App integration",
    description:
      "Install the Runex GitHub App for repository access, branch selection, and authenticated deployment workflows. We do not claim GitHub OAuth PR checks or status integrations unless shipped.",
  },
  {
    title: "Push-triggered redeploy",
    description:
      "When webhooks are configured, pushes to your selected branch can trigger automated redeployment so production tracks the branch you chose.",
  },
  {
    title: "Isolated deployments",
    description:
      "Applications run in containerized environments rather than directly on the host OS, with resource controls to limit blast radius.",
  },
  {
    title: "HTTPS URLs",
    description:
      "Deployments are exposed over HTTPS at https://<deployment-slug>.runex.cloud.",
  },
  {
    title: "Custom domains",
    description:
      "Map app.example.com (or similar) to a Runex deployment by pointing a CNAME to cname.runex.cloud.",
  },
  {
    title: "Environment configuration",
    description:
      "Configure environment variables for your deployments so secrets and runtime settings stay out of client-side code and public repos.",
  },
];

const observability = [
  {
    title: "Deployment status",
    description:
      "See whether a deployment is building, running, or failed from the dashboard.",
    badge: "Available",
  },
  {
    title: "Build & runtime logs",
    description:
      "Inspect logs to debug failed builds and runtime issues. Depth of log retention continues to evolve.",
    badge: "Evolving",
  },
  {
    title: "Deployment history",
    description:
      "Track what was deployed over time so you can correlate changes with outcomes.",
    badge: "Evolving",
  },
];

const roadmap = [
  {
    title: "Deeper project network isolation",
    description:
      "Stronger project-level network boundaries between customer workloads. Documented as a direction — not claimed as complete until enforced.",
    badge: "Roadmap",
  },
  {
    title: "Richer observability",
    description:
      "Health state, resource usage, and clearer failure reasons as the control plane matures.",
    badge: "Roadmap",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Deployment features that match the product."
        description="Runex focuses on connecting GitHub, building your app, running it in an isolated environment, and giving you a production HTTPS URL — plus custom domains when you need them."
      >
        <Button href={appSignUpUrl()} external>
          Deploy with Runex
        </Button>
        <Button href="/docs" variant="secondary">
          Read the docs
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Core"
            title="What Runex provides today."
            description="Claims below are limited to capabilities you can use on runex.cloud."
          />
          <FeatureGrid features={core} />
        </Container>
      </section>

      <section className="border-b border-card-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Visibility"
            title="Know what shipped."
          />
          <FeatureGrid features={observability} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Roadmap"
            title="Clearly marked future work."
            description="We label unfinished work so search engines, AI systems, and developers are not misled."
          />
          <FeatureGrid features={roadmap} columns={2} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
