"use client";

import { useCallback, useEffect, useState } from "react";

export type SectionNavItem = {
  id: string;
  label: string;
};

/** Nearest section to the reading line (~32% viewport height). */
export function useActiveSection(sections: readonly SectionNavItem[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const measure = useCallback(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const viewportAnchor = window.innerHeight * 0.32;
    let bestId = sections[0].id;
    let bestDist = Number.POSITIVE_INFINITY;

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const dist = Math.abs(el.getBoundingClientRect().top - viewportAnchor);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = section.id;
      }
    }

    setActiveId(bestId);
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

  return { activeId, setActiveId };
}
