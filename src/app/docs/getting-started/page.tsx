import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { buildMetadata } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Getting Started",
  description:
    "Get started with Runex: sign up, install the GitHub App, select a repository, deploy, and open your HTTPS URL on *.runex.cloud.",
  path: "/docs/getting-started",
});

export default function GettingStartedPage() {
  return (
    <DocsShell current="/docs/getting-started">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Docs
      </p>
      <h1 className="!mt-0 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Getting started with Runex
      </h1>
      <p>
        This guide walks through deploying an application on Runex for the first
        time. You will end with a public HTTPS URL on{" "}
        <code>*.runex.cloud</code>.
      </p>

      <h2>1. Create a Runex account</h2>
      <p>
        Open{" "}
        <a href={appSignUpUrl()} rel="noopener noreferrer">
          runex.cloud/sign-up
        </a>{" "}
        (or{" "}
        <a href="https://runex.cloud/sign-in" rel="noopener noreferrer">
          /sign-in
        </a>{" "}
        if you already have an account) and complete authentication.
      </p>

      <h2>2. Install the Runex GitHub App</h2>
      <p>
        From the dashboard, install the Runex GitHub App on the GitHub account or
        organization that owns your repository. Grant access only to the
        repositories you intend to deploy.
      </p>
      <p>
        Details:{" "}
        <Link href="/docs/deploy-from-github">Deploy from GitHub</Link>.
      </p>

      <h2>3. Select repository and branch</h2>
      <p>
        Choose the repository and branch Runex should build. Prefer a branch you
        treat as deployable (for example <code>main</code>).
      </p>

      <h2>4. Deploy</h2>
      <p>
        Start the deployment. Runex detects/builds the application, creates an
        isolated deployment environment, configures networking, and starts the
        process.
      </p>

      <h2>5. Open your URL</h2>
      <p>
        When the deployment is healthy, open{" "}
        <code>https://&lt;deployment-slug&gt;.runex.cloud</code>. You can later
        attach a custom domain — see{" "}
        <Link href="/docs/custom-domains">custom domains</Link>.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li>
          Stack guides:{" "}
          <Link href="/deploy/nextjs">Next.js</Link>,{" "}
          <Link href="/deploy/nodejs">Node.js</Link>,{" "}
          <Link href="/deploy/python">Python</Link>,{" "}
          <Link href="/deploy/go">Go</Link>,{" "}
          <Link href="/deploy/docker">Docker</Link>
        </li>
        <li>
          <Link href="/security">Security overview</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
