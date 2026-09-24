import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Environment Variables",
  description:
    "Configure production environment variables on Runex deployments. Keep secrets out of Git; inject runtime config for APIs, databases, and feature flags.",
  path: "/docs/environment-variables",
});

export default function EnvironmentVariablesPage() {
  return (
    <DocsShell current="/docs/environment-variables">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          {
            name: "Environment variables",
            path: "/docs/environment-variables",
          },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Docs</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Environment variables
      </h1>
      <p>
        Environment variables are how Runex injects configuration into a running
        deployment — API keys, database URLs, public app URLs, and feature
        flags — without committing secrets to Git.
      </p>

      <h2>Direct answer</h2>
      <p>
        Set environment variables in the Runex dashboard for each deployment (or
        project surface your account provides). Values are available to the
        process at runtime. Restart or redeploy after changes so the new values
        are picked up.
      </p>

      <h2>Good practices</h2>
      <ul>
        <li>Never commit secrets to the repository</li>
        <li>Prefer separate values for staging vs production when you run both</li>
        <li>
          Use variables for connection strings to <em>external</em> databases
          and third-party APIs
        </li>
        <li>
          Keep public client-side keys distinct from server-only secrets when
          your framework supports that split
        </li>
      </ul>

      <h2>Common variables</h2>
      <ul>
        <li>
          <code>DATABASE_URL</code> — connection string for an external database
        </li>
        <li>
          <code>API_URL</code> / <code>NEXT_PUBLIC_*</code> — public endpoints
          your frontend calls (framework-dependent)
        </li>
        <li>Provider tokens for email, storage, auth, etc.</li>
      </ul>

      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting started</Link>
        </li>
        <li>
          <Link href="/docs/deploy-from-github">Deploy from GitHub</Link>
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting</Link>
        </li>
        <li>
          <Link href="/security">Security</Link>
        </li>
        <li>
          <Link href="/use-cases/full-stack-apps">Full-stack apps</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
