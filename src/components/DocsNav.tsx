import Link from "next/link";

const links = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/docs/deploy-from-github", label: "Deploy from GitHub" },
  { href: "/docs/environment-variables", label: "Environment variables" },
  { href: "/docs/custom-domains", label: "Custom domains" },
  { href: "/docs/troubleshooting", label: "Troubleshooting" },
  { href: "/deploy", label: "Deploy hub" },
  { href: "/deploy/github", label: "Deploy GitHub" },
  { href: "/deploy/nextjs", label: "Deploy Next.js" },
  { href: "/deploy/nodejs", label: "Deploy Node.js" },
  { href: "/deploy/python", label: "Deploy Python" },
  { href: "/deploy/go", label: "Deploy Go" },
  { href: "/deploy/docker", label: "Deploy Docker" },
  { href: "/security", label: "Security" },
];

export function DocsNav({ current }: { current?: string }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="frame-tight p-3 sm:p-4">
        <p className="micro-label mb-3 px-2">Documentation</p>
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
          {links.map((link) => {
            const active =
              current === link.href ||
              (link.href === "/docs/troubleshooting" &&
                current?.startsWith("/docs/troubleshooting"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm transition ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-white/[0.03] hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
