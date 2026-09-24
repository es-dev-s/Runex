import type { Metadata } from "next";
import { ComparePage } from "@/components/ComparePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Runex vs Railway",
  description:
    "Factual comparison of Runex and Railway as developer deployment platforms: GitHub deploy, Docker, domains, HTTPS, and isolation.",
  path: "/compare/runex-vs-railway",
});

export default function RunexVsRailwayPage() {
  return (
    <ComparePage
      competitor="Railway"
      summary="Runex and Railway both sit in the developer deployment / PaaS category. This table highlights Runex’s verified public claims next to Railway capabilities you should confirm on Railway’s official docs."
      rows={[
        {
          capability: "Category",
          runex: "Cloud deployment platform for developers",
          other: "Developer deployment / infrastructure platform",
        },
        {
          capability: "Git deploy",
          runex: "GitHub App integration",
          other: "GitHub-based workflows (see Railway docs)",
        },
        {
          capability: "Docker",
          runex: "Dockerfile-based deploy supported",
          other: "Docker support (see Railway docs)",
        },
        {
          capability: "Public URL",
          runex: "https://<slug>.runex.cloud",
          other: "Railway-provided service domains",
        },
        {
          capability: "Custom domains",
          runex: "Via cname.runex.cloud",
          other: "Custom domains supported (verify docs)",
        },
        {
          capability: "HTTPS",
          runex: "Yes for public deployments",
          other: "Yes for public services (verify docs)",
        },
        {
          capability: "Databases",
          runex: "Depends on current product surface — do not assume",
          other: "Managed data offerings (see Railway docs)",
        },
        {
          capability: "Pricing",
          runex: "See Runex dashboard",
          other: "railway.com/pricing (verify)",
        },
      ]}
      caveats={[
        "Railway’s database and usage-based billing details change — always verify on their site.",
        "Runex marketing only claims GitHub App deploy, HTTPS, *.runex.cloud, custom domains via cname.runex.cloud, and high-level container isolation unless otherwise documented.",
        "Prefer hands-on trials of both platforms for your workload.",
      ]}
    />
  );
}
