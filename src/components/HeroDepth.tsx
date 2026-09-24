/** Non-circular hero depth — angular grid + soft rectangular bloom (no rings/orbits). */
export function HeroDepth({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Soft rectangular forest bloom — elliptical fill, not a ring */}
      <div
        className="absolute left-1/2 top-[38%] h-[420px] w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(34,139,90,0.14) 0%, rgba(34,139,90,0.04) 45%, transparent 72%)",
        }}
      />

      {/* Angular perspective grid */}
      <svg
        className="absolute left-1/2 top-[52%] h-[min(88vw,640px)] w-[min(110vw,900px)] -translate-x-1/2 -translate-y-1/2 text-zinc-100/[0.055]"
        viewBox="0 0 900 640"
        fill="none"
      >
        {/* Horizontal perspective lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const t = i / 8;
          const y = 80 + t * 480;
          const inset = 40 + t * t * 120;
          return (
            <line
              key={`h-${i}`}
              x1={inset}
              y1={y}
              x2={900 - inset}
              y2={y}
              stroke="currentColor"
              strokeWidth={i === 4 ? 1.15 : 0.85}
              opacity={0.35 + (1 - Math.abs(t - 0.45)) * 0.45}
            />
          );
        })}
        {/* Vertical rays converging upward */}
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => {
          const xBottom = 450 + i * 95;
          const xTop = 450 + i * 28;
          return (
            <line
              key={`v-${i}`}
              x1={xTop}
              y1={70}
              x2={xBottom}
              y2={580}
              stroke="currentColor"
              strokeWidth={i === 0 ? 1.1 : 0.8}
              opacity={0.28 + (1 - Math.abs(i) / 4) * 0.35}
            />
          );
        })}
        {/* Hexagonal fragment — angular, not a circle */}
        <path
          d="M450 210 L510 245 L510 315 L450 350 L390 315 L390 245 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.55"
        />
        <path
          d="M450 245 L480 262 L480 298 L450 315 L420 298 L420 262 Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Corner brackets */}
        <path
          d="M120 140 H170 M120 140 V190"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.5"
        />
        <path
          d="M780 140 H730 M780 140 V190"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.5"
        />
        <path
          d="M120 500 H170 M120 500 V450"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.35"
        />
        <path
          d="M780 500 H730 M780 500 V450"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.35"
        />
      </svg>

      {/* Soft vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 55%, rgba(7,7,7,0.55) 88%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
