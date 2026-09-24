import Link from "next/link";

const links = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/docs/deploy-from-github", label: "Deploy from GitHub" },
  { href: "/docs/custom-domains", label: "Custom domains" },
  { href: "/deploy/nextjs", label: "Deploy Next.js" },
  { href: "/deploy/nodejs", label: "Deploy Node.js" },
  { href: "/deploy/python", label: "Deploy Python" },
  { href: "/deploy/go", label: "Deploy Go" },
  { href: "/deploy/docker", label: "Deploy Docker" },
  { href: "/security", label: "Security" },
];

export function DocsNav({ current }: { current?: string }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        Documentation
      </p>
      <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {links.map((link) => {
          const active = current === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
