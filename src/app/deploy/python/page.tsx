import type { Metadata } from "next";
import { DeployPage } from "@/components/DeployPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Python Applications",
  description:
    "Deploy a Python application with Runex from GitHub. Get HTTPS on *.runex.cloud and connect custom domains through cname.runex.cloud.",
  path: "/deploy/python",
});

export default function DeployPythonPage() {
  return (
    <DeployPage
      name="Python"
      path="/deploy/python"
      headline="Deploy a Python application with Runex"
      summary="Ship Python web apps and APIs from GitHub without managing a VPS for every project. Runex builds, isolates, and serves over HTTPS."
      steps={[
        "Commit a clear dependency file (for example requirements.txt or equivalent) and a start command.",
        "Connect the repository with the Runex GitHub App.",
        "Select the branch and deploy.",
        "Confirm the app responds on https://<deployment-slug>.runex.cloud.",
        "Configure environment variables for secrets and framework settings.",
      ]}
      notes={[
        "Pin major dependency versions for reproducible builds.",
        "Ensure the HTTP server binds to the interface/port expected by Runex.",
        "For container-defined Python apps, see the Docker deploy guide.",
      ]}
      faqs={[
        {
          question: "Can Runex deploy Python applications?",
          answer:
            "Yes, when the project’s dependencies install and the process starts successfully in the Runex environment.",
        },
        {
          question: "Can I use a custom domain?",
          answer:
            "Yes. Point a CNAME to cname.runex.cloud and attach the domain to the deployment.",
        },
      ]}
    />
  );
}
