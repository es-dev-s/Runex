import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";
import { BrandAura } from "./BrandAura";

const linkColumns = [
  ["Product", footerLinks.product],
  ["Docs", footerLinks.docs],
  ["Compare", footerLinks.compare],
  ["Company", footerLinks.company],
] as const;

export function Footer() {
  return (
    <footer
      data-site-footer
      className="relative mt-auto w-full overflow-hidden border-t border-white/[0.06] bg-[#060606]"
    >
      {/* Soft accent glow behind left wordmark */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[min(70%,640px)] opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 18% 70%, rgba(252,76,1,0.16) 0%, transparent 68%)",
        }}
        aria-hidden
      />
      <BrandAura placement="bl" opacity={0.1} blurPx={36} />

      {/* Full-bleed shell — wide padding, not cramped max-w-7xl */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16 lg:px-12 xl:px-16">
        {/* Two-column: RUNEX left · link columns right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Left brand */}
          <div className="relative shrink-0 lg:max-w-sm lg:pt-1">
            <p className="display text-[clamp(2.75rem,6vw,4.25rem)] leading-none tracking-[-0.04em] text-foreground">
              RUNEX
            </p>
            <p className="mt-3 max-w-[18rem] text-[14px] leading-snug text-muted sm:text-[15px]">
              {siteConfig.tagline}
            </p>
            <p className="mt-2.5 max-w-[20rem] text-[12px] leading-relaxed text-muted-dim">
              Connect GitHub, deploy in isolation, ship on{" "}
              <span className="text-foreground/70">
                {siteConfig.deploymentDomain}
              </span>
              .
            </p>
          </div>

          {/* Right link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:max-w-3xl lg:justify-end xl:max-w-4xl">
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

        {/* Legal row — full width under hairline */}
        <div className="relative mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-sm text-muted-dim sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Runex. Factual claims only.</p>
          <p className="font-mono text-xs tracking-wide">runex.cloud</p>
        </div>
      </div>
    </footer>
  );
}
