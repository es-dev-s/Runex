import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-card-border">
      <div
        className="accent-bloom absolute bottom-[-20%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 opacity-70"
        aria-hidden
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="micro-label text-accent">Runex</p>
            <p className="display mt-4 max-w-xl text-4xl text-foreground sm:text-5xl lg:text-6xl">
              Easy deployment
              <br />
              for developers.
            </p>
            <p className="body-muted mt-5 max-w-md">
              Connect GitHub, deploy in isolation, ship on{" "}
              <span className="text-foreground/90">{siteConfig.deploymentDomain}</span>{" "}
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

        <div className="mt-16 overflow-hidden border-t border-card-border pt-8">
          <p
            className="display select-none text-[clamp(3.5rem,14vw,9rem)] leading-none text-foreground/[0.06]"
            aria-hidden
          >
            RUNEX
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-dim sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Runex. Factual claims only.</p>
            <p className="font-mono text-xs tracking-wide">runex.cloud</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
