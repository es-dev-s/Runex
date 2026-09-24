import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Soft top separator — single restrained line, no double borders */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-card-border to-transparent"
        aria-hidden
      />

      {/* Soft accent bloom */}
      <div
        className="pointer-events-none absolute bottom-[-12%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(252,76,1,0.12) 0%, transparent 72%)",
        }}
        aria-hidden
      />

      {/* Full-bleed wider shell — max-w-7xl breaks past page Container */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="micro-label text-accent">Runex</p>
            <p className="display mt-5 max-w-2xl text-[2.75rem] leading-[1.05] text-foreground sm:text-5xl lg:text-[3.75rem]">
              Easy deployment
              <br />
              for developers.
            </p>
            <p className="body-muted mt-6 max-w-md text-[15px]">
              Connect GitHub, deploy in isolation, ship on{" "}
              <span className="text-foreground/90">
                {siteConfig.deploymentDomain}
              </span>{" "}
              — custom domains via {siteConfig.cnameTarget}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {(
              [
                ["Product", footerLinks.product],
                ["Docs", footerLinks.docs],
                ["Compare", footerLinks.compare],
                ["Company", footerLinks.company],
              ] as const
            ).map(([title, links]) => (
              <div key={title}>
                <h3 className="micro-label">{title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Oversized brand wordmark — full-bleed feel within wide shell */}
        <div className="mt-20 overflow-hidden pt-2">
          <p
            className="display select-none text-[clamp(4rem,16vw,11rem)] leading-none tracking-[-0.04em] text-foreground/[0.045]"
            aria-hidden
          >
            RUNEX
          </p>
          <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-sm text-muted-dim sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Runex. Factual claims only.</p>
            <p className="font-mono text-xs tracking-wide">runex.cloud</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
