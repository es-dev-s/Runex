"use client";

import { useEffect, useState } from "react";

/**
 * True when the site footer intersects the viewport.
 * Prefers [data-site-footer], falls back to document.querySelector("footer").
 */
export function useFooterGate() {
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const footer =
      document.querySelector<HTMLElement>("[data-site-footer]") ??
      document.querySelector<HTMLElement>("footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      {
        // Mute as soon as any footer pixel enters; slight bottom slack so
        // the last content section can stay active until footer truly arrives.
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0,
      },
    );

    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return footerInView;
}
