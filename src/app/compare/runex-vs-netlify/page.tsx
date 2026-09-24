import type { Metadata } from "next";
import { ComparePage } from "@/components/ComparePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Runex vs Netlify",
  description:
    "Factual comparison of Runex and Netlify for application deployment: Git-based deploy, Docker, backends, custom domains, and HTTPS. Verify competitor details against current Netlify docs.",
  path: "/compare/runex-vs-netlify",
});

export default function RunexVsNetlifyPage() {
  return (
    <ComparePage
      path="/compare/runex-vs-netlify"
      competitor="Netlify"
      summary="Both support Git-based deployment workflows. Runex emphasizes multi-stack application deploy (including Docker-friendly paths) on *.runex.cloud. Netlify is widely known for Git-connected web deployment and frontend workflows — confirm current Netlify documentation for details."
      rows={[
        {
          capability: "Primary positioning",
          runex: "Easy cloud deployment platform for developers (multi-stack)",
          other: "Git-based web deployment / platform (broad product)",
        },
        {
          capability: "GitHub-based deploy",
          runex: "GitHub App deploy with branch selection & webhooks",
          other: "Git provider integrations (see Netlify docs)",
        },
        {
          capability: "Docker workloads",
          runex: "Supported deployment path via Dockerfile",
          other: "Verify current Netlify docs for container options",
        },
        {
          capability: "Backend / multi-runtime",
          runex: "Next.js, Node, Python, Go, Docker paths",
          other: "Strong web/frontend focus; verify backend options in docs",
        },
        {
          capability: "Platform URL",
          runex: "*.runex.cloud HTTPS URLs",
          other: "Netlify-provided deployment URLs",
        },
        {
          capability: "Custom domains",
          runex: "CNAME to cname.runex.cloud",
          other: "Custom domains supported (see Netlify docs)",
        },
        {
          capability: "HTTPS",
          runex: "Provided for public deployments",
          other: "Provided for deployments",
        },
        {
          capability: "Pricing source of truth",
          runex: "Live entitlements in Runex dashboard",
          other: "netlify.com pricing pages",
        },
      ]}
      caveats={[
        "Competitor capabilities change — verify against official Netlify documentation before making a purchase decision.",
        "This page does not invent ratings, uptime SLAs, or performance benchmarks.",
        "Choose based on stack fit: Runex targets straightforward app deploy across Next.js, Node, Python, Go, and Docker.",
      ]}
    />
  );
}
