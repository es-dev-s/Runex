import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/DocsShell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Port Configuration",
  description:
    "Fix Runex port configuration issues when a container starts but the application is not reachable over HTTPS.",
  path: "/docs/troubleshooting/port-configuration",
});

export default function PortConfigurationPage() {
  return (
    <DocsShell current="/docs/troubleshooting">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Troubleshooting", path: "/docs/troubleshooting" },
          {
            name: "Port configuration",
            path: "/docs/troubleshooting/port-configuration",
          },
        ])}
      />
      <p className="micro-label mb-2 text-accent">Troubleshooting</p>
      <h1 className="display !mt-0 text-3xl text-foreground sm:text-4xl">
        Port configuration
      </h1>
      <p>
        If a deployment shows as started but{" "}
        <code>https://&lt;slug&gt;.runex.cloud</code> does not respond, the
        process may be listening on the wrong port or only on localhost inside
        the container.
      </p>
      <h2>Checklist</h2>
      <ol>
        <li>
          Bind your HTTP server to <code>0.0.0.0</code> (all interfaces), not
          only <code>127.0.0.1</code>.
        </li>
        <li>
          Listen on the port your Runex runtime expects (check the dashboard or
          current runtime docs for the convention — often provided via{" "}
          <code>PORT</code>).
        </li>
        <li>
          For Docker, <code>EXPOSE</code> the same port your process uses and
          ensure the <code>CMD</code>/<code>ENTRYPOINT</code> starts the server.
        </li>
        <li>
          Re-read start logs for “address already in use” or immediate exits —
          see{" "}
          <Link href="/docs/troubleshooting/deployment-failed">
            deployment failed
          </Link>
          .
        </li>
      </ol>
      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/deploy/docker">Deploy Docker</Link>
        </li>
        <li>
          <Link href="/docs/environment-variables">Environment variables</Link>
        </li>
      </ul>
    </DocsShell>
  );
}
