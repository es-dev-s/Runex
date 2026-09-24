"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { useFooterGate } from "@/hooks/useFooterGate";

export type ProximitySection = {
  id: string;
  label: string;
};

type ProximitySidebarProps = {
  sections: readonly ProximitySection[];
  className?: string;
};

/**
 * RareUI-style left proximity nav: nearest section in accent,
 * neighbors get graduated opacity/scale. Desktop only (lg+).
 * Muted when the site footer enters the viewport.
 */
export function ProximitySidebar({
  sections,
  className = "",
}: ProximitySidebarProps) {
  const reduce = useReducedMotion();
  const footerInView = useFooterGate();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  /** Distance rank: 0 = active, 1 = adjacent, 2+ = farther */
  const [ranks, setRanks] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    sections.forEach((s, i) => {
      init[s.id] = i;
    });
    return init;
  });

  const measure = useCallback(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const viewportAnchor = window.innerHeight * 0.32;
    let bestId = sections[0].id;
    let bestDist = Number.POSITIVE_INFINITY;
    const distances: { id: string; dist: number }[] = [];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top - viewportAnchor);
      distances.push({ id: section.id, dist });
      if (dist < bestDist) {
        bestDist = dist;
        bestId = section.id;
      }
    }

    distances.sort((a, b) => a.dist - b.dist);
    const nextRanks: Record<string, number> = {};
    distances.forEach((d, i) => {
      nextRanks[d.id] = i;
    });
    for (const s of sections) {
      if (nextRanks[s.id] === undefined) nextRanks[s.id] = 99;
    }

    setActiveId(bestId);
    setRanks(nextRanks);
  }, [sections]);

  useEffect(() => {
    measure();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

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

  const gated = footerInView;

  return (
    <nav
      aria-label="Page sections"
      aria-hidden={gated || undefined}
      className={`pointer-events-none fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-300 ease-out lg:block ${
        gated ? "pointer-events-none opacity-0 invisible" : "opacity-100 visible"
      } ${className}`}
    >
      <ul
        className={`flex flex-col gap-1.5 pl-4 xl:pl-6 2xl:pl-8 ${
          gated ? "pointer-events-none" : ""
        }`}
      >
        {sections.map((section) => {
          const rank = ranks[section.id] ?? 99;
          const active = !gated && section.id === activeId;
          let opacity = 0.22;
          let scale = 0.92;
          if (active) {
            opacity = 1;
            scale = 1;
          } else if (rank === 1) {
            opacity = 0.55;
            scale = 0.97;
          } else if (rank === 2) {
            opacity = 0.35;
            scale = 0.94;
          }

          if (reduce) {
            scale = 1;
            opacity = active ? 1 : 0.35;
          }

          return (
            <li
              key={section.id}
              className={gated ? "pointer-events-none" : "pointer-events-auto"}
            >
              <a
                href={`#${section.id}`}
                onClick={onNavigate(section.id)}
                tabIndex={gated ? -1 : undefined}
                aria-current={active ? "location" : undefined}
                className="group relative flex items-center gap-2.5 py-0.5 outline-none transition-[opacity,transform] duration-300 ease-out"
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  transformOrigin: "left center",
                }}
              >
                <span
                  className="h-px w-3 shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: active
                      ? "var(--accent)"
                      : "transparent",
                  }}
                  aria-hidden
                />
                <span
                  className={`text-[11px] font-medium tracking-[0.04em] transition-colors duration-300 ${
                    active
                      ? "text-accent"
                      : "text-muted-dim group-hover:text-muted"
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
