"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useState, type ReactNode } from "react";
import { appSignInUrl, appSignUpUrl, navLinks } from "@/lib/site";
import { Button } from "./Button";

const softSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.85,
};
const instant = { duration: 0 };

/** Dark inset ring only — never CSS border (avoids white/default flash on first paint). */
const CHROME_RING = "inset 0 0 0 1px rgba(34,34,34,1)";

/** Pill cluster gaps: open at rest, tight when scrolled (Rare-like). */
const GAP_TOP = 40;
const GAP_SCROLLED = 6;

function RunexMark({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center leading-none ${className}`}
    >
      <img
        src="/runex-mark.svg"
        alt=""
        className="pointer-events-none block h-full w-full select-none object-contain"
        draggable={false}
        aria-hidden
      />
    </span>
  );
}

/** Always-on floating dark glass pill — no join/split parent chrome. */
function Pill({
  children,
  className = "",
  reduce,
  elevated,
  /** Perfect circle chrome (logo mark). Default stays a soft capsule. */
  circle = false,
}: {
  children: ReactNode;
  className?: string;
  reduce: boolean | null;
  elevated: boolean;
  circle?: boolean;
}) {
  return (
    <motion.div
      className={`pointer-events-auto flex items-center outline-none ${
        circle
          ? "relative h-10 w-10 shrink-0 items-center justify-center overflow-hidden !p-0"
          : ""
      } ${className}`}
      initial={false}
      animate={{
        borderRadius: 9999,
        backgroundColor: "rgba(12,12,12,0.88)",
        paddingLeft: circle ? 0 : 10,
        paddingRight: circle ? 0 : 10,
        paddingTop: circle ? 0 : 6,
        paddingBottom: circle ? 0 : 6,
        boxShadow: elevated
          ? `${CHROME_RING}, 0 14px 44px rgba(0,0,0,0.5)`
          : `${CHROME_RING}, 0 10px 32px rgba(0,0,0,0.38)`,
      }}
      transition={reduce ? instant : softSpring}
      style={{
        borderWidth: 0,
        borderStyle: "none",
        borderColor: "transparent",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        ...(circle
          ? {
              width: 40,
              height: 40,
              minWidth: 40,
              minHeight: 40,
              padding: 0,
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
          : {}),
      }}
    >
      {children}
    </motion.div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const t = reduce ? instant : softSpring;

  useMotionValueEvent(scrollY, "change", (next) => {
    setScrolled(next > 24);
  });

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <motion.div
        className="relative mx-auto w-full max-w-5xl px-3 sm:px-5"
        initial={false}
        animate={{
          // Subtle float: slightly more top pad at rest, tighter when scrolled
          paddingTop: scrolled ? 10 : 14,
        }}
        transition={t}
      >
        {/* Mobile: logo left, hamburger right — simple spacing */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Pill reduce={reduce} elevated={scrolled} className="shrink-0">
            <Link
              href="/"
              aria-label="Runex home"
              className="group flex min-h-11 items-center gap-2.5 px-0.5 outline-none"
            >
              <RunexMark className="h-[20px] w-[20px]" />
              <span className="text-[13px] font-semibold tracking-tight text-foreground sm:text-[14px]">
                Runex
              </span>
            </Link>
          </Pill>

          <Pill reduce={reduce} elevated={scrolled}>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center text-foreground outline-none ring-0"
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
          </Pill>
        </div>

        {/* Desktop: three separate pills in a flex row — gap animates open↔tight */}
        <motion.div
          className="hidden w-full items-center justify-center md:flex"
          initial={false}
          animate={{ gap: scrolled ? GAP_SCROLLED : GAP_TOP }}
          transition={t}
        >
          <Pill reduce={reduce} elevated={scrolled} circle className="shrink-0">
            <Link
              href="/"
              aria-label="Runex home"
              className="group absolute inset-0 flex items-center justify-center outline-none transition-opacity hover:opacity-90"
            >
              <RunexMark className="h-[22px] w-[22px]" />
            </Link>
          </Pill>

          <Pill reduce={reduce} elevated={scrolled} className="shrink-0">
            <nav className="flex items-center" aria-label="Primary">
              {navLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="mx-0.5 h-3 w-px bg-white/10 sm:mx-1"
                      aria-hidden
                    />
                  )}
                  <Link
                    href={link.href}
                    className="rounded-full px-2.5 py-1.5 text-[12.5px] text-muted outline-none transition-colors hover:text-foreground lg:px-2.5 lg:text-[13px]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Pill>

          <Pill
            reduce={reduce}
            elevated={scrolled}
            className="shrink-0 gap-1.5"
          >
            <Button
              href={appSignInUrl()}
              variant="ghost"
              external
              className="!px-3 !py-1 text-[13px]"
            >
              Login
            </Button>
            <Button
              href={appSignUpUrl()}
              external
              className="!px-3.5 !py-1.5 text-[13px]"
            >
              Deploy
            </Button>
          </Pill>
        </motion.div>
      </motion.div>

      {open && (
        <div className="pointer-events-auto mx-3 mt-2 max-h-[min(78dvh,calc(100dvh-5.5rem))] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border border-card-border bg-[#0c0c0c]/95 px-3 py-3 backdrop-blur-xl sm:mx-5 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-[15px] text-muted transition-colors hover:bg-white/[0.04] hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3">
            <Button
              href={appSignInUrl()}
              variant="secondary"
              external
              className="min-h-11 w-full"
            >
              Login
            </Button>
            <Button href={appSignUpUrl()} external className="min-h-11 w-full">
              Deploy
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
