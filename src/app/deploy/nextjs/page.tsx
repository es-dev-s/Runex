import type { Metadata } from "next";
import { DeployPage } from "@/components/DeployPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deploy Next.js Applications",
  description:
    "Deploy a Next.js application with Runex from GitHub. Get a production HTTPS URL on *.runex.cloud and optional custom domains via cname.runex.cloud.",
  path: "/deploy/nextjs",
});

export default function DeployNextjsPage() {
  return (
    <DeployPage
      name="Next.js"
      path="/deploy/nextjs"
      headline="Deploy a Next.js application with Runex"
      summary="Runex lets developers deploy supported Next.js applications from their GitHub repository and expose them through a production HTTPS deployment URL."
      steps={[
        "Push your Next.js app to GitHub (App Router or Pages Router).",
        "Sign in at runex.cloud and install the Runex GitHub App on the repo.",
        "Select the repository and branch, then start a deployment.",
        "Open https://<deployment-slug>.runex.cloud when the deploy is ready.",
        "Optionally attach a custom domain with a CNAME to cname.runex.cloud.",
      ]}
      notes={[
        "Ensure the app listens on the port Runex expects (check dashboard/runtime docs for the current convention).",
        "Keep secrets in Runex environment variables — never commit them.",
        "Prefer production build settings that match how you run locally with next build / next start unless your project uses a documented alternative.",
      ]}
      faqs={[
        {
          question: "Can Runex deploy Next.js?",
          answer:
            "Yes. Runex supports deploying Next.js applications from GitHub when the project builds successfully in the Runex environment.",
        },
        {
          question: "Do I get HTTPS?",
          answer:
            "Yes. Deployments are served over HTTPS on *.runex.cloud, and custom domains use HTTPS once attached.",
        },
      ]}
    />
  );
}
