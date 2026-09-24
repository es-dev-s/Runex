import type { Metadata } from "next";
import { ComparePage } from "@/components/ComparePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Runex vs Render",
  description:
    "Factual comparison of Runex and Render for deploying applications: GitHub, Docker, HTTPS, custom domains, and isolation.",
  path: "/compare/runex-vs-render",
});

export default function RunexVsRenderPage() {
  return (
    <ComparePage
      competitor="Render"
      summary="Render and Runex both help teams deploy applications without running raw VPS workflows. Use this comparison as a starting point, then verify Render’s current docs and Runex’s live dashboard."
      rows={[
        {
          capability: "Positioning",
          runex: "Easy deployment for developers",
          other: "Cloud application platform (broad service catalog)",
        },
        {
          capability: "GitHub deploy",
          runex: "GitHub App + branch + webhooks",
          other: "Git-based deploys (see Render docs)",
        },
        {
          capability: "Docker",
          runex: "Supported",
          other: "Supported (see Render docs)",
        },
        {
          capability: "Platform hostname",
          runex: "*.runex.cloud",
          other: "Render onrender.com hostnames (typical)",
        },
        {
          capability: "Custom domains",
          runex: "CNAME → cname.runex.cloud",
          other: "Custom domains supported (verify docs)",
        },
        {
          capability: "HTTPS",
          runex: "Provided",
          other: "Provided",
        },
        {
          capability: "Isolation",
          runex: "Container isolation + resource limits",
          other: "Service isolation model (see Render security docs)",
        },
        {
          capability: "Pricing",
          runex: "Dashboard is source of truth",
          other: "render.com/pricing (verify)",
        },
      ]}
      caveats={[
        "Render offers many service types (static sites, cron, managed datastores, etc.). Runex pages only list what Runex currently documents.",
        "No propaganda rankings — pick the platform that fits your runtime and ops model.",
        "Re-check competitor features before publishing external reviews.",
      ]}
    />
  );
}
