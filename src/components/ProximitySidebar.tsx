"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

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
 */
export function ProximitySidebar({
  sections,
  className = "",
}: ProximitySidebarProps) {
  const reduce = useReducedMotion();
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
      // Prefer section whose top is near the reading line; clamp below-fold far
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
    // Keep missing ids muted
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
    // Reflect immediately for snappy feedback
    setActiveId(id);
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Page sections"
      className={`pointer-events-none fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${className}`}
    >
      <ul className="flex flex-col gap-1.5 pl-4 xl:pl-6 2xl:pl-8">
        {sections.map((section) => {
          const rank = ranks[section.id] ?? 99;
          const active = section.id === activeId;
          // Graduated proximity: active full, neighbors soft, far muted
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
            <li key={section.id} className="pointer-events-auto">
              <a
                href={`#${section.id}`}
                onClick={onNavigate(section.id)}
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
