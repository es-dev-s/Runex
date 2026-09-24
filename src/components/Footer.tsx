import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#070707]">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
                <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
              </span>
              <span className="font-semibold tracking-tight">Runex</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline} A cloud deployment platform for developers —
              connect GitHub, deploy, and get a production HTTPS URL.
            </p>
          </div>

          {(
            [
              ["Product", footerLinks.product],
              ["Docs", footerLinks.docs],
              ["Compare", footerLinks.compare],
              ["Company", footerLinks.company],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {title}
              </h3>
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

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Runex. Easy deployment for developers.</p>
          <p className="text-stone-600">runex.cloud</p>
        </div>
      </Container>
    </footer>
  );
}
