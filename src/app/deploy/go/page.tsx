import type { Metadata } from "next";
import { DeployPage } from "@/components/DeployPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Go Applications",
  description:
    "Deploy a Go application with Runex from GitHub. Isolated container deployments with HTTPS URLs on *.runex.cloud.",
  path: "/deploy/go",
});

export default function DeployGoPage() {
  return (
    <DeployPage
      name="Go"
      path="/deploy/go"
      headline="Deploy a Go application with Runex"
      summary="Build and run Go services from GitHub on Runex — isolated containers, HTTPS platform URLs, and optional custom domains."
      steps={[
        "Ensure the module builds with go build and exposes an HTTP server entrypoint.",
        "Push to GitHub and grant the Runex GitHub App access.",
        "Select repository/branch and deploy.",
        "Hit https://<deployment-slug>.runex.cloud to verify.",
        "Store configuration in environment variables.",
      ]}
      notes={[
        "Static binaries and minimal images work well when you package via Docker.",
        "Handle graceful shutdown if the platform sends termination signals.",
        "Do not hard-code secrets in source.",
      ]}
      faqs={[
        {
          question: "Can Runex deploy Go applications?",
          answer:
            "Yes. Supported Go applications can be deployed from GitHub into isolated Runex environments.",
        },
        {
          question: "Is Docker required for Go?",
          answer:
            "Not necessarily. Docker is available when you want full control of the runtime image — see /deploy/docker.",
        },
      ]}
      related={[
        { href: "/deploy/docker", label: "Deploy Docker apps" },
        { href: "/docs/deploy-from-github", label: "GitHub deploy docs" },
      ]}
    />
  );
}
