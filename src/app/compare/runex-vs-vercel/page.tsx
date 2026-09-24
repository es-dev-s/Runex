import type { Metadata } from "next";
import { ComparePage } from "@/components/ComparePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Runex vs Vercel",
  description:
    "Factual comparison of Runex and Vercel for application deployment: GitHub deploy, Docker, custom domains, HTTPS, and positioning differences.",
  path: "/compare/runex-vs-vercel",
});

export default function RunexVsVercelPage() {
  return (
    <ComparePage
      competitor="Vercel"
      summary="Both help developers ship web apps from Git. Runex emphasizes multi-stack deployment (including Docker-friendly workflows) on *.runex.cloud. Vercel is widely known for frontend/Next.js-centric workflows and a large edge network — confirm current Vercel docs for details."
      rows={[
        {
          capability: "Primary positioning",
          runex: "Easy deployment platform for developers (multi-stack)",
          other: "Frontend cloud / Next.js-centric platform (broad product)",
        },
        {
          capability: "GitHub-based deploy",
          runex: "GitHub App deploy with branch selection & webhooks",
          other: "Git integrations (see Vercel docs)",
        },
        {
          capability: "Docker workloads",
          runex: "Supported deployment path",
          other: "Available in parts of the platform — verify current docs",
        },
        {
          capability: "Platform URL",
          runex: "*.runex.cloud HTTPS URLs",
          other: "Vercel-provided deployment URLs",
        },
        {
          capability: "Custom domains",
          runex: "CNAME to cname.runex.cloud",
          other: "Custom domains supported (see Vercel docs)",
        },
        {
          capability: "HTTPS",
          runex: "Provided for public deployments",
          other: "Provided for deployments",
        },
        {
          capability: "Isolation model",
          runex: "Containerized deployments with resource controls",
          other: "Platform isolation model (see Vercel security docs)",
        },
        {
          capability: "Pricing source of truth",
          runex: "Live entitlements in Runex dashboard",
          other: "vercel.com/pricing",
        },
      ]}
      caveats={[
        "This page is not a claim that Runex replaces every Vercel feature (edge middleware, commercial analytics, enterprise networking, etc.).",
        "Choose based on your stack: Runex targets straightforward app deploy across Next.js, Node, Python, Go, and Docker.",
        "No fake ratings or invented performance numbers.",
      ]}
    />
  );
}
