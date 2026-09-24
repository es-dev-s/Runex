"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { appSignInUrl, appSignUpUrl, navLinks } from "@/lib/site";
import { Button } from "./Button";

const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 36,
  mass: 0.72,
};
const softSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.85,
};
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

function Cluster({
  children,
  className = "",
  split,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  split: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      layout
      className={`pointer-events-auto flex items-center ${className}`}
      animate={{
        borderRadius: 9999,
        borderColor: split ? "rgba(34,34,34,1)" : "rgba(34,34,34,0)",
        backgroundColor: split
          ? "rgba(12,12,12,0.88)"
          : "rgba(12,12,12,0)",
        paddingLeft: split ? 12 : 0,
        paddingRight: split ? 12 : 0,
        paddingTop: split ? 7 : 0,
        paddingBottom: split ? 7 : 0,
        boxShadow: split
          ? "0 12px 40px rgba(0,0,0,0.45)"
          : "0 0 0 0 transparent",
      }}
      transition={reduce ? instant : spring}
      style={{ borderWidth: 1, borderStyle: "solid" }}
    >
      {children}
    </motion.div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  /** SSR + first paint: joined + flush-top — avoids hydration flash. */
  const [entered, setEntered] = useState(false);
  const [split, setSplit] = useState(false);
  /** After user leaves the top once, returning near 0 re-attaches. */
  const [leftTop, setLeftTop] = useState(false);
  const [y, setY] = useState(0);
  const lastY = useRef(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (next) => {
    const prev = lastY.current;
    const delta = next - prev;
    lastY.current = next;
    setY(next);

    if (next > 48) setLeftTop(true);

    if (next < 20) {
      setSplit(false);
      return;
    }
    if (Math.abs(delta) < 1.5) return;
    if (delta > 0) setSplit(true);
    else setSplit(false);
  });

  const joined = !split;
  /**
   * inset rules:
   * - pre-entrance: flush (2)
   * - post-entrance joined at top: floating (16)
   * - split: compact (12)
   * - after leaving top then returning near 0 while joined: attach feel (4)
   */
  let paddingTop = 16;
  if (!entered) paddingTop = 2;
  else if (split) paddingTop = 12;
  else if (leftTop && joined && y < 10) paddingTop = 4;
  else paddingTop = 16;

  const flushChrome = !entered || (leftTop && joined && y < 10);
  const t = reduce ? instant : softSpring;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        className="relative mx-auto w-full max-w-5xl px-3 sm:px-5"
        initial={false}
        animate={{ paddingTop }}
        transition={t}
      >
        <motion.div
          layout
          className="relative flex w-full items-center justify-between"
          initial={false}
          animate={{
            gap: split ? 8 : 0,
            borderRadius: 9999,
            borderColor: joined
              ? "rgba(34,34,34,1)"
              : "rgba(34,34,34,0)",
            backgroundColor: joined
              ? "rgba(12,12,12,0.78)"
              : "rgba(12,12,12,0)",
            paddingLeft: joined ? 16 : 0,
            paddingRight: joined ? 14 : 0,
            paddingTop: joined ? 10 : 0,
            paddingBottom: joined ? 10 : 0,
            boxShadow: joined
              ? flushChrome
                ? "0 1px 0 rgba(255,255,255,0.04)"
                : "0 16px 48px rgba(0,0,0,0.35)"
              : "0 0 0 0 transparent",
          }}
          transition={reduce ? instant : spring}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            backdropFilter: joined ? "blur(20px)" : undefined,
            WebkitBackdropFilter: joined ? "blur(20px)" : undefined,
          }}
        >
          <Cluster split={split} reduce={reduce} className="shrink-0">
            <Link href="/" className="group flex items-center gap-2.5">
              <RunexMark className="h-4 w-4" />
              <span className="text-[13px] font-semibold tracking-tight text-foreground sm:text-[14px]">
                Runex
              </span>
            </Link>
          </Cluster>

          <Cluster
            split={split}
            reduce={reduce}
            className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
          >
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
                    className="rounded-full px-2 py-1 text-[12.5px] text-muted transition-colors hover:text-foreground lg:px-2.5 lg:text-[13px]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Cluster>

          <div className="flex items-center gap-2">
            <Cluster
              split={split}
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
            </Cluster>

            <Cluster split={split} reduce={reduce} className="md:hidden">
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
            </Cluster>
          </div>
        </motion.div>
      </motion.div>

      {open && (
        <div className="pointer-events-auto mx-3 mt-2 overflow-hidden rounded-[1.5rem] border border-card-border bg-[#0c0c0c]/95 px-4 py-4 backdrop-blur-xl sm:mx-5 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
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
