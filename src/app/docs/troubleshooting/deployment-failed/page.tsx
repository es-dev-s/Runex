import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deployment Failed",
  description:
    "Fix a failed Runex deployment after a GitHub push: read build logs, verify dependencies, ports, and environment variables.",
  path: "/docs/troubleshooting/deployment-failed",
});

export default function DeploymentFailedPage() {
  return (
    <DocsShell current="/docs/troubleshooting">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Troubleshooting", path: "/docs/troubleshooting" },
          {
            name: "Deployment failed",
            path: "/docs/troubleshooting/deployment-failed",
          },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Troubleshooting</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Deployment failed
      </h1>
      <p>
        A deployment can fail during build or at process start. Use dashboard
        status and logs as the source of truth for the exact error.
      </p>
      <h2>Checklist</h2>
      <ol>
        <li>Confirm the selected branch contains a buildable project.</li>
        <li>
          Read the build log for missing lockfiles, wrong Node/Python/Go
          versions, or Docker build errors.
        </li>
        <li>
          Verify required{" "}
          <Link href="/docs/environment-variables">environment variables</Link>{" "}
          are set before start.
        </li>
        <li>
          Ensure the app listens on the port Runex expects — see{" "}
          <Link href="/docs/troubleshooting/port-configuration">
            port configuration
          </Link>
          .
        </li>
        <li>
          For GitHub-triggered redeploys, confirm the GitHub App still has repo
          access and webhooks are delivering —{" "}
          <Link href="/docs/deploy-from-github">Deploy from GitHub</Link>.
        </li>
      </ol>
      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting hub</Link>
        </li>
        <li>
          <Link href="/docs/getting-started">Getting started</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
