import type { Metadata } from "next";
import { DeployPage } from "@/components/DeployPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Docker Applications",
  description:
    "Deploy a Docker application with Runex from GitHub. Run containerized workloads with HTTPS on *.runex.cloud without managing Kubernetes yourself.",
  path: "/deploy/docker",
});

export default function DeployDockerPage() {
  return (
    <DeployPage
      name="Docker"
      path="/deploy/docker"
      headline="Deploy a Docker application with Runex"
      summary="Use a Dockerfile in your GitHub repository to define the runtime. Runex builds the image, runs it in isolation, and exposes HTTPS — without you operating Kubernetes."
      steps={[
        "Add a production-ready Dockerfile that exposes the service port.",
        "Connect the repository with the Runex GitHub App.",
        "Deploy the selected branch; Runex builds the container image.",
        "Verify https://<deployment-slug>.runex.cloud.",
        "Attach a custom domain via CNAME to cname.runex.cloud when needed.",
      ]}
      notes={[
        "Prefer non-root users and minimal base images where practical.",
        "Do not mount the Docker socket or require privileged mode for untrusted apps.",
        "Keep build context small; avoid copying secrets into the image.",
      ]}
      faqs={[
        {
          question: "Can Runex deploy Docker applications?",
          answer:
            "Yes. Docker-based deployments are a core path: build from your Dockerfile, run in an isolated environment, serve over HTTPS.",
        },
        {
          question: "Do I need Kubernetes?",
          answer:
            "No. Runex is designed so you can deploy containerized apps without managing Kubernetes clusters yourself.",
        },
      ]}
      related={[
        { href: "/security", label: "Container isolation & security" },
        { href: "/docs/getting-started", label: "Getting started" },
      ]}
    />
  );
}
