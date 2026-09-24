/** Runex-native geometric watermark — orbit rings + hex petals (not Rare flower). */
export function OrbitMotif({
  className = "",
  variant = "corner",
}: {
  className?: string;
  variant?: "corner" | "watermark";
}) {
  const isWatermark = variant === "watermark";

  return (
    <div
      className={`pointer-events-none absolute select-none ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 420 420"
        className={`h-full w-full ${isWatermark ? "text-zinc-100/[0.045]" : "text-zinc-600/40"}`}
        fill="none"
      >
        {/* Outer orbit rings */}
        <circle
          cx="210"
          cy="210"
          r="198"
          stroke="currentColor"
          strokeWidth={isWatermark ? "1.25" : "1"}
        />
        <circle
          cx="210"
          cy="210"
          r="158"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={isWatermark ? "2 10" : "3 8"}
          className={isWatermark ? undefined : "orbit-pulse"}
        />
        <circle cx="210" cy="210" r="118" stroke="currentColor" strokeWidth="1" />
        <circle cx="210" cy="210" r="72" stroke="currentColor" strokeWidth="1" />

        {/* Hex petal ring — six hexes around center */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 210 + Math.cos(rad) * 96;
          const cy = 210 + Math.sin(rad) * 96;
          return (
            <path
              key={deg}
              d={hexPath(cx, cy, 28)}
              stroke="currentColor"
              strokeWidth="1.1"
              opacity={isWatermark ? 0.85 : 0.45}
            />
          );
        })}

        {/* Center hex */}
        <path
          d={hexPath(210, 210, 42)}
          stroke={isWatermark ? "currentColor" : "var(--accent)"}
          strokeOpacity={isWatermark ? 1 : 0.45}
          strokeWidth="1.35"
        />
        <path
          d={hexPath(210, 210, 22)}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.7}
        />

        {!isWatermark && (
          <>
            <circle cx="210" cy="210" r="5" fill="var(--accent)" fillOpacity="0.7" />
            <circle
              cx="328"
              cy="148"
              r="4"
              fill="var(--accent)"
              fillOpacity="0.55"
              className="deploy-pulse"
            />
            <circle cx="118" cy="268" r="3" fill="currentColor" fillOpacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
}

function hexPath(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  });
  return `M ${pts.join(" L ")} Z`;
}
