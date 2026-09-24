"use client";

import Link from "next/link";
import { useState } from "react";
import { appSignInUrl, appSignUpUrl, navLinks } from "@/lib/site";
import { Button } from "./Button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent shadow-[0_0_12px_var(--glow)]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Runex
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={appSignInUrl()} variant="ghost" external>
            Log in
          </Button>
          <Button href={appSignUpUrl()} external>
            Deploy
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-4 flex-col gap-1">
            <span
              className={`h-0.5 w-full bg-foreground transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-foreground transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-foreground transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-background px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href={appSignInUrl()} variant="secondary" external>
              Log in
            </Button>
            <Button href={appSignUpUrl()} external>
              Deploy
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
