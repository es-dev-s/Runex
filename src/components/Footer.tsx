import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";

const linkColumns = [
  ["Product", footerLinks.product],
  ["Docs", footerLinks.docs],
  ["Compare", footerLinks.compare],
  ["Company", footerLinks.company],
] as const;

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Soft top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-card-border to-transparent"
        aria-hidden
      />

      {/* Soft #FC4C01 radial glow — behind the combined stage, centered low */}
      <div
        className="pointer-events-none absolute bottom-[-8%] left-1/2 h-[420px] w-[min(100%,920px)] -translate-x-1/2 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 70%, rgba(252,76,1,0.14) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Single premium stage — brand, links, wordmark backdrop, legal */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16 lg:px-10">
        {/* Stage with wordmark as absolute backdrop */}
        <div className="relative min-h-[11rem] sm:min-h-[12.5rem] lg:min-h-[14rem]">
          {/* Oversized RUNEX wordmark — backdrop of this same block */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden select-none"
            aria-hidden
          >
            <p
              className="display translate-y-[18%] text-center text-[clamp(5.5rem,22vw,13rem)] leading-none tracking-[-0.045em] text-foreground/[0.04] sm:translate-y-[12%] sm:text-foreground/[0.045]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
              }}
            >
              RUNEX
            </p>
          </div>

          {/* Foreground: compact brand + four link columns */}
          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-xs shrink-0 lg:pt-0.5">
              <p className="micro-label text-accent">Runex</p>
              <p className="mt-2.5 text-[15px] leading-snug text-foreground/85 sm:text-base">
                {siteConfig.tagline}
              </p>
              <p className="body-muted mt-3 text-[13px] leading-relaxed">
                Connect GitHub, deploy in isolation, ship on{" "}
                <span className="text-foreground/80">
                  {siteConfig.deploymentDomain}
                </span>{" "}
                — custom domains via {siteConfig.cnameTarget}.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 lg:max-w-3xl lg:justify-end">
              {linkColumns.map(([title, links]) => (
                <div key={title}>
                  <h3 className="micro-label">{title}</h3>
                  <ul className="mt-3.5 space-y-2">
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
        </div>

        {/* Thin legal row — same shell, light separator only */}
        <div className="relative z-10 mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-sm text-muted-dim sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Runex. Factual claims only.</p>
          <p className="font-mono text-xs tracking-wide">runex.cloud</p>
        </div>
      </div>
    </footer>
  );
}
