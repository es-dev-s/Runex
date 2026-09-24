import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Custom Domain Troubleshooting",
  description:
    "Troubleshoot Runex custom domains: CNAME to cname.runex.cloud, DNS propagation, and attaching HTTPS to your deployment.",
  path: "/docs/troubleshooting/custom-domain",
});

export default function CustomDomainTroubleshootingPage() {
  return (
    <DocsShell current="/docs/troubleshooting">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Troubleshooting", path: "/docs/troubleshooting" },
          {
            name: "Custom domain",
            path: "/docs/troubleshooting/custom-domain",
          },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Troubleshooting</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Custom domain issues
      </h1>
      <p>
        Custom domains on Runex use a CNAME to{" "}
        <code>{siteConfig.cnameTarget}</code>. If the domain does not resolve or
        HTTPS is not ready, work through DNS first, then attachment in the
        dashboard.
      </p>
      <h2>Checklist</h2>
      <ol>
        <li>
          Create a CNAME from your hostname (for example{" "}
          <code>app.example.com</code>) to <code>{siteConfig.cnameTarget}</code>
          .
        </li>
        <li>
          Wait for DNS propagation; verify with your DNS provider or{" "}
          <code>dig</code> / similar tools.
        </li>
        <li>
          Attach the hostname to the correct deployment in the Runex dashboard.
        </li>
        <li>
          Confirm the platform URL on <code>*.runex.cloud</code> still works — if
          it does not, fix the deployment before debugging DNS.
        </li>
      </ol>
      <p>
        Full steps:{" "}
        <Link href="/docs/custom-domains">Custom domains documentation</Link>.
      </p>
    </DocsShell>
  );
}
