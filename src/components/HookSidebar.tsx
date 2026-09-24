"use client";

import { useReducedMotion } from "framer-motion";
import { type MouseEvent } from "react";
import {
  useActiveSection,
  type SectionNavItem,
} from "@/hooks/useActiveSection";
import { useFooterGate } from "@/hooks/useFooterGate";

export type HookSection = SectionNavItem;

type HookSidebarProps = {
  sections: readonly HookSection[];
  className?: string;
};

/**
 * Rare-inspired hook sidebar: vertical section labels with an L-shaped
 * accent tick on the active item. Desktop (lg+) only; muted over footer.
 */
export function HookSidebar({ sections, className = "" }: HookSidebarProps) {
  const reduce = useReducedMotion();
  const footerInView = useFooterGate();
  const { activeId, setActiveId } = useActiveSection(sections);

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

  return (
    <nav
      aria-label="On this page"
      aria-hidden={gated || undefined}
      className={`pointer-events-none fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-300 ease-out lg:block ${
        gated ? "opacity-0" : "opacity-100"
      } ${className}`}
    >
      <ul
        className={`relative flex flex-col gap-0.5 border-l border-white/[0.08] pl-4 xl:pl-5 2xl:pl-6 ${
          gated ? "pointer-events-none" : ""
        }`}
      >
        {sections.map((section) => {
          const active = !gated && section.id === activeId;
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
                className="group relative flex items-center py-1.5 outline-none"
              >
                {/* Hook / L-tick — attaches to active label */}
                <span
                  className={`pointer-events-none absolute -left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 xl:-left-[1.05rem] ${
                    reduce
                      ? ""
                      : "transition-[opacity,transform] duration-300 ease-out"
                  }`}
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active
                      ? "translateY(-50%) scale(1)"
                      : "translateY(-50%) scale(0.85)",
                  }}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 14 14"
                    className="h-full w-full text-accent"
                    fill="none"
                  >
                    <path
                      d="M1 1v8.5a3.5 3.5 0 0 0 3.5 3.5H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span
                  className={`text-[11px] font-medium tracking-[0.04em] ${
                    reduce ? "" : "transition-colors duration-300"
                  } ${
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
