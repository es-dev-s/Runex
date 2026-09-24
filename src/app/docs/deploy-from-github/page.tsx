import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deploy from GitHub",
  description:
    "How Runex deploys from GitHub using a GitHub App: installation, repository access, branch selection, webhook verification, and automatic redeployment.",
  path: "/docs/deploy-from-github",
});

export default function DeployFromGitHubPage() {
  return (
    <DocsShell current="/docs/deploy-from-github">
      <p className="micro-label mb-2 text-accent">Docs</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Deploy an application from GitHub
      </h1>
      <p>
        Runex uses a <strong>GitHub App</strong> for repository access and
        deployment. This page separates authentication, installation, repository
        access, webhooks, and automatic redeployment so expectations stay
        accurate.
      </p>

      <h2>What Runex uses</h2>
      <ul>
        <li>GitHub App integration</li>
        <li>Repository access (scoped to what you grant)</li>
        <li>Branch selection</li>
        <li>Webhook verification for deploy triggers</li>
        <li>Automated redeployment after changes to the selected branch</li>
      </ul>

      <h2>What we do not claim (unless shipped)</h2>
      <ul>
        <li>GitHub OAuth as a separate product surface beyond the App flow</li>
        <li>Pull-request preview automation</li>
        <li>Commit status checks / required checks integrations</li>
      </ul>
      <p>
        If those capabilities ship later, documentation will be updated explicitly.
      </p>

      <h2>Typical flow</h2>
      <pre>{`Connect GitHub App
      ↓
Select repository
      ↓
Select branch
      ↓
Deploy
      ↓
https://<deployment>.runex.cloud`}</pre>

      <h2>Install the GitHub App</h2>
      <p>
        From the Runex dashboard, start GitHub App installation. Choose the
        GitHub user or organization, then grant access to specific repositories
        or all repositories — prefer least privilege.
      </p>

      <h2>Repository access</h2>
      <p>
        Runex can only deploy repositories the App can read. If a repo is missing
        from the picker, revisit App installation permissions on GitHub.
      </p>

      <h2>Webhooks & automatic redeploy</h2>
      <p>
        When webhooks are active, pushes to the selected branch can trigger a new
        deployment. Runex verifies webhook payloads so deploy triggers come from
        authenticated GitHub events.
      </p>

      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting started</Link>
        </li>
        <li>
          <Link href="/blog/how-to-deploy-from-github">
            Blog: How to deploy from GitHub
          </Link>
        </li>
        <li>
          <Link href="/security">Webhook verification (security)</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
