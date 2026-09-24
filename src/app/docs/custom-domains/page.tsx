import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Custom Domains",
  description:
    "Connect a custom domain to Runex: point a CNAME to cname.runex.cloud and attach the domain to your deployment. HTTPS for custom domains on Runex.",
  path: "/docs/custom-domains",
});

export default function CustomDomainsPage() {
  return (
    <DocsShell current="/docs/custom-domains">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Custom domains", path: "/docs/custom-domains" },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Docs</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Custom domains on Runex
      </h1>
      <p>
        Every deployment gets a platform URL on <code>*.runex.cloud</code>. For
        production brands and client apps, attach your own domain — for example{" "}
        <code>app.example.com</code> — by pointing a CNAME to{" "}
        <code>cname.runex.cloud</code>.
      </p>

      <h2>Platform domain vs custom domain</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Example</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Platform URL</td>
            <td>
              <code>https://&lt;slug&gt;.runex.cloud</code>
            </td>
            <td>Created with the deployment; HTTPS provided</td>
          </tr>
          <tr>
            <td>Custom domain</td>
            <td>
              <code>app.example.com</code>
            </td>
            <td>
              CNAME to <code>cname.runex.cloud</code>, then attach in Runex
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Steps</h2>
      <ol>
        <li>Deploy your application so a Runex deployment exists.</li>
        <li>
          In your DNS provider, create a <strong>CNAME</strong> record for the
          hostname you want (for example <code>app</code>) targeting{" "}
          <code>cname.runex.cloud</code>.
        </li>
        <li>
          In the Runex dashboard, add the custom domain to the deployment and
          wait for DNS propagation / HTTPS provisioning.
        </li>
        <li>
          Verify in a browser: <code>https://app.example.com</code> should serve
          your app.
        </li>
      </ol>

      <h2>DNS example</h2>
      <pre>{`# Hostname: app.example.com
Type:  CNAME
Name:  app
Value: cname.runex.cloud
TTL:   300 (or provider default)`}</pre>

      <h2>HTTPS</h2>
      <p>
        Runex provides HTTPS for supported public deployments, including custom
        domains once they are correctly attached. We do not use vague encryption
        marketing claims — TLS is the concrete control.
      </p>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>Domain not resolving:</strong> confirm the CNAME target is
          exactly <code>cname.runex.cloud</code> and wait for DNS TTL.
        </li>
        <li>
          <strong>Wrong site:</strong> ensure the domain is attached to the
          intended deployment in the dashboard.
        </li>
        <li>
          <strong>Apex domains:</strong> some DNS providers need ALIAS/ANAME for
          apex (<code>example.com</code>). Prefer a subdomain when unsure, or
          follow your DNS provider’s CNAME-flattening guidance.
        </li>
      </ul>

      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting started</Link>
        </li>
        <li>
          <Link href="/blog/how-custom-domains-work">
            Blog: How custom domains work
          </Link>
        </li>
      </ul>
    </DocsShell>
  );
}
