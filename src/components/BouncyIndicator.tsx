"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type MouseEvent } from "react";
import {
  useActiveSection,
  type SectionNavItem,
} from "@/hooks/useActiveSection";
import { useFooterGate } from "@/hooks/useFooterGate";

export type BouncySection = SectionNavItem;

type BouncyIndicatorProps = {
  sections: readonly BouncySection[];
  /** Right-side progress rail by default; left when content needs clear right gutter */
  side?: "left" | "right";
  className?: string;
};

const DOT = 8;
const GAP = 16;
const TRACK = DOT + GAP;

/**
 * Compact spring section rail — premium right-side progress by default.
 * Desktop (lg+) only; muted over footer. Instant jump when reduced-motion.
 */
export function BouncyIndicator({
  sections,
  side = "right",
  className = "",
}: BouncyIndicatorProps) {
  const reduce = useReducedMotion();
  const footerInView = useFooterGate();
  const { activeId, setActiveId } = useActiveSection(sections);

  const activeIndex = useMemo(() => {
    const i = sections.findIndex((s) => s.id === activeId);
    return i < 0 ? 0 : i;
  }, [sections, activeId]);

  if (sections.length < 2) return null;

  const gated = footerInView;

  const onNavigate = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    setActiveId(id);
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  };

  const sideClass =
    side === "right"
      ? "right-0 items-end pr-4 xl:pr-6 2xl:pr-8"
      : "left-0 items-start pl-4 xl:pl-6 2xl:pl-8";

  return (
    <nav
      aria-label="Page sections"
      aria-hidden={gated || undefined}
      className={`pointer-events-none fixed top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-300 ease-out lg:flex lg:flex-col ${sideClass} ${
        gated ? "pointer-events-none opacity-0 invisible" : "opacity-100 visible"
      } ${className}`}
    >
      <div
        className={`relative ${gated ? "pointer-events-none" : "pointer-events-auto"}`}
        style={{ height: sections.length * TRACK - GAP }}
      >
        {/* Rail track */}
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white/[0.08]"
          style={{ height: "100%" }}
          aria-hidden
        />

        {/* Spring thumb */}
        <motion.span
          className="absolute left-1/2 z-10 block rounded-full bg-accent shadow-[0_0_12px_rgba(252,76,1,0.35)]"
          style={{
            width: DOT,
            height: DOT,
            marginLeft: -DOT / 2,
          }}
          animate={{ y: activeIndex * TRACK }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 360, damping: 30, mass: 0.55 }
          }
          aria-hidden
        />

        <ul className="relative m-0 list-none p-0">
          {sections.map((section, i) => {
            const active = !gated && section.id === activeId;
            return (
              <li
                key={section.id}
                className="relative flex items-center"
                style={{
                  height: DOT,
                  marginBottom: i === sections.length - 1 ? 0 : GAP,
                }}
              >
                <a
                  href={`#${section.id}`}
                  onClick={onNavigate(section.id)}
                  tabIndex={gated ? -1 : undefined}
                  aria-current={active ? "location" : undefined}
                  className={`group absolute flex items-center outline-none ${
                    side === "right" ? "right-0 flex-row-reverse" : "left-0"
                  }`}
                  style={{ top: 0 }}
                >
                  <span
                    className={`block rounded-full border transition-colors duration-300 ease-out ${
                      active
                        ? "border-accent bg-transparent"
                        : "border-white/20 bg-white/10 group-hover:border-white/40"
                    }`}
                    style={{ width: DOT, height: DOT }}
                    aria-hidden
                  />
                  <span
                    className={`max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-medium tracking-[0.06em] opacity-0 transition-all duration-300 ease-out group-hover:max-w-[9rem] group-hover:opacity-100 ${
                      side === "right" ? "mr-2.5 text-right" : "ml-2.5"
                    } ${
                      active
                        ? "!max-w-[9rem] !opacity-100 text-accent"
                        : "text-muted-dim"
                    }`}
                  >
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
