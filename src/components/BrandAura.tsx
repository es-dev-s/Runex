/** Faded + blurred Runex logo watermark — decorative brand presence only. */

export type BrandAuraPlacement =
  | "tr"
  | "tl"
  | "br"
  | "bl"
  | "center"
  | "hero-right"
  | "hero-center";

const placementClass: Record<BrandAuraPlacement, string> = {
  tr: "right-[-8%] top-[-6%] h-[min(52vw,340px)] w-[min(58vw,420px)]",
  tl: "left-[-10%] top-[-8%] h-[min(48vw,300px)] w-[min(54vw,380px)]",
  br: "bottom-[-12%] right-[-6%] h-[min(50vw,320px)] w-[min(56vw,400px)]",
  bl: "bottom-[-10%] left-[-8%] h-[min(48vw,300px)] w-[min(54vw,380px)]",
  center:
    "left-1/2 top-1/2 h-[min(60vw,420px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2",
  "hero-right":
    "right-[-4%] top-[18%] h-[min(72vw,560px)] w-[min(80vw,680px)] sm:right-[2%] sm:top-[12%]",
  "hero-center":
    "left-1/2 top-[38%] h-[min(88vw,720px)] w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2",
};

export function BrandAura({
  placement = "tr",
  className = "",
  /** Overall opacity of the sharp layer (blurred layer is lower). */
  opacity = 0.18,
  /** CSS blur on the soft duplicate. */
  blurPx = 28,
  /** Use compact mark crop (nav/favicon-aligned). */
  mark = false,
}: {
  placement?: BrandAuraPlacement;
  className?: string;
  opacity?: number;
  blurPx?: number;
  mark?: boolean;
}) {
  const src = mark ? "/runex-mark.svg" : "/runex.svg";
  const pos = placementClass[placement];

  return (
    <div
      className={`pointer-events-none absolute z-0 overflow-visible ${pos} ${className}`}
      aria-hidden
    >
      {/* Soft blurred duplicate */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-contain select-none"
        style={{
          opacity: Math.max(0.06, opacity * 0.85),
          filter: `blur(${blurPx}px)`,
        }}
        draggable={false}
      />
      {/* Faint sharper silhouette */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-contain select-none"
        style={{
          opacity: Math.min(0.28, opacity),
          filter: "blur(1.5px)",
        }}
        draggable={false}
      />
    </div>
  );
}

/** Crisp nav / pill mark — no blur. */
export function RunexLogoMark({
  className = "h-[18px] w-[18px]",
}: {
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <img
        src="/runex-mark.svg"
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
        aria-hidden
      />
    </span>
  );
}
