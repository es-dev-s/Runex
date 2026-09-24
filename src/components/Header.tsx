"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { appSignInUrl, appSignUpUrl, navLinks } from "@/lib/site";
import { Button } from "./Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-3 border border-card-border bg-[#0d0d0d]/90 backdrop-blur-xl transition-[padding,border-radius,box-shadow] duration-300 ${
          compact
            ? "rounded-full px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
            : "rounded-full px-3.5 py-2.5 sm:px-4"
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 pl-1">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-md border border-accent/35 bg-accent/10" />
            <svg
              viewBox="0 0 24 24"
              className="relative h-3.5 w-3.5 text-accent"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M12 2.5 19.5 7v10L12 21.5 4.5 17V7L12 2.5Zm0 2.3L6.8 8v8L12 18.9 17.2 16V8L12 4.8Z"
              />
            </svg>
          </span>
          <span className="text-[14px] font-semibold tracking-tight text-foreground">
            Runex
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <Button href={appSignInUrl()} variant="ghost" external className="!px-3 !py-1.5 text-[13px]">
            Login
          </Button>
          <Button href={appSignUpUrl()} external className="!px-3.5 !py-1.5 text-[13px]">
            Deploy
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-3.5 flex-col gap-1">
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
        <div className="pointer-events-auto mx-auto mt-2 max-w-5xl overflow-hidden rounded-[1.5rem] border border-card-border bg-[#0d0d0d]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-white/[0.04] hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button href={appSignInUrl()} variant="secondary" external>
              Login
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
