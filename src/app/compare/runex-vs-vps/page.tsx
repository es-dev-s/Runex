import type { Metadata } from "next";
import { ComparePage } from "@/components/ComparePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Runex vs VPS",
  description:
    "Compare Runex (easy cloud deployment platform) with running apps on a VPS: who manages the OS, TLS, Git redeploys, and isolation — factual, no fabricated advantages.",
  path: "/compare/runex-vs-vps",
});

export default function RunexVsVpsPage() {
  return (
    <ComparePage
      path="/compare/runex-vs-vps"
      competitor="a VPS"
      summary="A VPS gives you a virtual machine you operate. Runex is an easy cloud deployment platform for developers: connect GitHub, deploy into isolated containers, and get HTTPS on *.runex.cloud without managing a host OS for every app."
      rows={[
        {
          capability: "Primary model",
          runex: "Deployment platform / PaaS-style app shipping",
          other: "Virtual machine you administer",
        },
        {
          capability: "Host OS & packages",
          runex: "Managed by the platform",
          other: "You install and patch",
        },
        {
          capability: "GitHub deploy workflow",
          runex: "GitHub App + branch deploy + webhooks",
          other: "DIY (CI scripts, SSH, systemd, etc.)",
        },
        {
          capability: "HTTPS",
          runex: "Provided for *.runex.cloud and attached custom domains",
          other: "Usually configure yourself (e.g. reverse proxy + certs)",
        },
        {
          capability: "Custom domains",
          runex: "CNAME to cname.runex.cloud",
          other: "Point DNS to your VPS and configure the web server",
        },
        {
          capability: "Isolation",
          runex: "Containerized deployments with resource controls",
          other: "You design isolation (users, containers, VMs)",
        },
        {
          capability: "Flexibility",
          runex: "Constrained to supported deploy paths",
          other: "Very high — full machine control",
        },
        {
          capability: "Best when",
          runex: "You want easy application deployment from GitHub/Docker",
          other: "You need full OS control or unusual system dependencies",
        },
      ]}
      caveats={[
        "Runex is not marketed as a raw SSH VPS product.",
        "A VPS can still be the right choice for specialized infrastructure needs.",
        "See the blog: PaaS vs VPS for a longer educational comparison.",
      ]}
    />
  );
}
