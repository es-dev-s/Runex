export function OrbitMotif({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute select-none ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 420 420"
        className="h-full w-full text-zinc-600/40"
        fill="none"
      >
        <circle cx="210" cy="210" r="168" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="210"
          cy="210"
          r="118"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 8"
          className="orbit-pulse"
        />
        <circle cx="210" cy="210" r="68" stroke="currentColor" strokeWidth="1" />
        <path
          d="M210 84 L296 134 V234 L210 284 L124 234 V134 Z"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-zinc-500/50"
        />
        <path
          d="M210 128 L262 158 V218 L210 248 L158 218 V158 Z"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
        />
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
      </svg>
    </div>
  );
}
