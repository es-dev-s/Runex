/** Premium atmospheric hero depth — soft blooms + vignette (no rings/orbits, no line grids). */
export function HeroDepth({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Soft orange elliptical bloom — centered behind the headline */}
      <div
        className="absolute left-1/2 top-[36%] h-[min(70vw,520px)] w-[min(96vw,860px)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 68% 52% at 50% 50%, rgba(252,76,1,0.16) 0%, rgba(252,76,1,0.06) 38%, rgba(252,76,1,0.02) 58%, transparent 74%)",
        }}
      />

      {/* Secondary depth spots — max two, soft, offset */}
      <div
        className="absolute left-[12%] top-[58%] h-[280px] w-[340px] -translate-y-1/2 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(252,76,1,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-[8%] top-[28%] h-[240px] w-[300px] -translate-y-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(252,76,1,0.055) 0%, transparent 72%)",
        }}
      />

      {/* One refined angular accent — single soft hairline under the bloom */}
      <div
        className="absolute left-1/2 top-[52%] h-px w-[min(42vw,280px)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(252,76,1,0.22) 30%, rgba(244,244,245,0.08) 50%, rgba(252,76,1,0.22) 70%, transparent 100%)",
        }}
      />

      {/* Faint peripheral frame — far from H1, never a full grid */}
      <div
        className="absolute inset-[12%] rounded-[1.5rem] opacity-[0.035]"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(244,244,245,0.9)",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 50% 40%, transparent 40%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 45% at 50% 40%, transparent 40%, black 100%)",
        }}
      />

      {/* Edge vignette — fall into #070707 */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 75% 65% at 50% 42%, transparent 35%, rgba(7,7,7,0.55) 78%, #070707 100%)",
            "linear-gradient(180deg, transparent 0%, transparent 58%, rgba(7,7,7,0.5) 82%, var(--background) 100%)",
          ].join(", "),
        }}
      />

      {/* Ultra-subtle film grain (~3%) — CSS SVG filter, no assets */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
