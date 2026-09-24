import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Documentation",
  description:
    "Runex documentation: getting started, deploying from GitHub, custom domains, HTTPS, and stack-specific deployment guides.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <DocsShell current="/docs">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Docs</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Runex documentation
      </h1>
      <p>
        Runex is an easy deployment platform for developers. These docs explain
        how to connect GitHub, deploy an application, reach it over HTTPS on{" "}
        <code>*.runex.cloud</code>, and attach a custom domain via{" "}
        <code>cname.runex.cloud</code>.
      </p>

      <h2>Start here</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting started</Link> — create an
          account and ship your first deployment.
        </li>
        <li>
          <Link href="/docs/deploy-from-github">Deploy from GitHub</Link> — GitHub
          App installation, repository access, and webhooks.
        </li>
        <li>
          <Link href="/docs/environment-variables">Environment variables</Link> —
          production configuration and secrets.
        </li>
        <li>
          <Link href="/docs/custom-domains">Custom domains</Link> — map your
          domain to a Runex deployment.
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting</Link> — failed
          deploys, domains, and ports.
        </li>
      </ul>

      <h2>Deploy by stack</h2>
      <ul>
        <li>
          <Link href="/deploy">Deploy hub</Link>
        </li>
        <li>
          <Link href="/deploy/github">GitHub</Link>
        </li>
        <li>
          <Link href="/deploy/nextjs">Next.js</Link>
        </li>
        <li>
          <Link href="/deploy/nodejs">Node.js</Link>
        </li>
        <li>
          <Link href="/deploy/python">Python</Link>
        </li>
        <li>
          <Link href="/deploy/go">Go</Link>
        </li>
        <li>
          <Link href="/deploy/docker">Docker</Link>
        </li>
      </ul>

      <h2>Also useful</h2>
      <ul>
        <li>
          <Link href="/security">Security overview</Link>
        </li>
        <li>
          <Link href="/features">Product features</Link>
        </li>
        <li>
          <Link href="/what-is-runex">What is Runex?</Link>
        </li>
        <li>
          <Link href="/use-cases/full-stack-apps">Full-stack apps</Link>
        </li>
        <li>
          <Link href="/blog">Guides on the blog</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
