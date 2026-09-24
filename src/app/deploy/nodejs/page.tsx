import type { Metadata } from "next";
import { DeployPage } from "@/components/DeployPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Node.js Applications",
  description:
    "Deploy a Node.js application with Runex from GitHub. Isolated containers, HTTPS on *.runex.cloud, and custom domains via cname.runex.cloud.",
  path: "/deploy/nodejs",
});

export default function DeployNodejsPage() {
  return (
    <DeployPage
      name="Node.js"
      path="/deploy/nodejs"
      headline="Deploy a Node.js application with Runex"
      summary="Connect a Node.js repository via the Runex GitHub App, deploy into an isolated environment, and reach your API or server over HTTPS."
      steps={[
        "Ensure package.json defines a clear start script and required Node version where possible.",
        "Push to GitHub and install the Runex GitHub App with access to the repository.",
        "Select branch and deploy from the Runex dashboard.",
        "Verify the service on https://<deployment-slug>.runex.cloud.",
        "Add environment variables in Runex for secrets and runtime config.",
      ]}
      notes={[
        "Bind to 0.0.0.0 (not only localhost) so the platform proxy can reach your process.",
        "Use environment variables for DATABASE_URL and API keys.",
        "WebSocket and long-running connections depend on platform proxy support — verify for your use case.",
      ]}
      faqs={[
        {
          question: "Can Runex deploy Node.js?",
          answer:
            "Yes. Node.js applications that build and start cleanly can be deployed from GitHub through Runex.",
        },
        {
          question: "How do automatic redeploys work?",
          answer:
            "With GitHub webhooks configured, pushes to the selected branch can trigger a new deployment. Webhook payloads are verified.",
        },
      ]}
      related={[
        { href: "/docs/getting-started", label: "Getting started" },
        { href: "/deploy/docker", label: "Deploy with Docker" },
      ]}
    />
  );
}
