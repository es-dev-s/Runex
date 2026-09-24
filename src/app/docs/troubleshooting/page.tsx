import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Troubleshooting",
  description:
    "Troubleshoot Runex deployments: failed builds, custom domain DNS, and port configuration for containerized apps.",
  path: "/docs/troubleshooting",
});

const items = [
  {
    href: "/docs/troubleshooting/deployment-failed",
    title: "Deployment failed",
    body: "Build errors, missing dependencies, and failed starts after a GitHub push.",
  },
  {
    href: "/docs/troubleshooting/custom-domain",
    title: "Custom domain issues",
    body: "CNAME to cname.runex.cloud, DNS propagation, and HTTPS attachment.",
  },
  {
    href: "/docs/troubleshooting/port-configuration",
    title: "Port configuration",
    body: "App not reachable because it listens on the wrong port inside the container.",
  },
];

export default function TroubleshootingHubPage() {
  return (
    <DocsShell current="/docs/troubleshooting">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Troubleshooting", path: "/docs/troubleshooting" },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Docs</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Troubleshooting
      </h1>
      <p>
        Problem-driven guides for issues Runex deployments commonly surface.
        Prefer reading build/runtime status in the dashboard first, then use
        these pages for structured checks.
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.title}</Link> — {item.body}
          </li>
        ))}
      </ul>
      <h2>Also check</h2>
      <ul>
        <li>
          <Link href="/docs/environment-variables">Environment variables</Link>
        </li>
        <li>
          <Link href="/docs/deploy-from-github">Deploy from GitHub</Link>
        </li>
        <li>
          <Link href="/docs/custom-domains">Custom domains</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
