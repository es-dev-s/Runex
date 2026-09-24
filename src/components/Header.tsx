"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { appSignInUrl, appSignUpUrl, navLinks } from "@/lib/site";
import { Button } from "./Button";

const spring = { type: "spring" as const, stiffness: 420, damping: 38, mass: 0.7 };
const instant = { duration: 0 };

function RunexMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 24 24" className="h-full w-full text-accent" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2.5 19.5 7v10L12 21.5 4.5 17V7L12 2.5Zm0 2.3L6.8 8v8L12 18.9 17.2 16V8L12 4.8Z"
        />
      </svg>
    </span>
  );
}

function Pill({
  children,
  className = "",
  expanded,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  expanded: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className={`pointer-events-auto flex items-center border border-card-border bg-[#0c0c0c]/75 backdrop-blur-xl ${className}`}
      animate={{
        borderRadius: 9999,
        paddingLeft: expanded ? 18 : 12,
        paddingRight: expanded ? 18 : 12,
        paddingTop: expanded ? 11 : 7,
        paddingBottom: expanded ? 11 : 7,
        backgroundColor: expanded
          ? "rgba(12,12,12,0.72)"
          : "rgba(12,12,12,0.88)",
      }}
      transition={reduce ? instant : spring}
      style={{
        boxShadow: expanded
          ? "0 0 0 0 transparent"
          : "0 12px 40px rgba(0,0,0,0.45)",
      }}
    >
      {children}
    </motion.div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const lastY = useRef(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = lastY.current;
    const delta = y - prev;
    lastY.current = y;

    if (y < 20) {
      setExpanded(true);
      return;
    }
    if (Math.abs(delta) < 1.5) return;
    if (delta > 0) setExpanded(false);
    else setExpanded(true);
  });

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:px-5"
        animate={{
          paddingTop: expanded ? 22 : 12,
          gap: expanded ? 14 : 8,
        }}
        transition={reduce ? instant : spring}
      >
        {/* Brand pill */}
        <Pill expanded={expanded} reduce={reduce} className="shrink-0">
          <Link href="/" className="group flex items-center gap-2.5">
            <RunexMark className="h-4 w-4" />
            <span className="text-[13px] font-semibold tracking-tight text-foreground sm:text-[14px]">
              Runex
            </span>
          </Link>
        </Pill>

        {/* Primary links pill */}
        <Pill
          expanded={expanded}
          reduce={reduce}
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
        >
          <nav className="flex items-center">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-1 h-3 w-px bg-white/10"
                    aria-hidden
                  />
                )}
                <Link
                  href={link.href}
                  className="rounded-full px-2 py-1 text-[12.5px] text-muted transition-colors hover:text-foreground lg:px-2.5 lg:text-[13px]"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </Pill>

        {/* Utilities pill */}
        <div className="flex items-center gap-2">
          <Pill
            expanded={expanded}
            reduce={reduce}
            className="hidden gap-1.5 md:flex"
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

          <Pill expanded={expanded} reduce={reduce} className="md:hidden">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-8 w-8 items-center justify-center text-foreground"
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
      </motion.div>

      {open && (
        <div className="pointer-events-auto mx-3 mt-2 overflow-hidden rounded-[1.5rem] border border-card-border bg-[#0c0c0c]/95 px-4 py-4 backdrop-blur-xl sm:mx-5 md:hidden">
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
