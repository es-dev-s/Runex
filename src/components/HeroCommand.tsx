"use client";

import { useState } from "react";

export function HeroCommand({
  command,
  copyText,
}: {
  command: string;
  copyText?: string;
}) {
  const [copied, setCopied] = useState(false);
  const payload = copyText ?? command;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="terminal-surface flex min-w-0 max-w-full items-center gap-3 rounded-full px-4 py-3 font-mono text-[12px] text-zinc-400 sm:px-5 sm:text-[13px]">
      <span className="shrink-0 text-accent">$</span>
      <span className="min-w-0 truncate whitespace-nowrap">{command}</span>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="ml-auto shrink-0 rounded-md p-1.5 text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-200"
      >
        {copied ? (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <path
              d="M3.5 8.5 6.5 11.5 12.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <rect
              x="5.5"
              y="5.5"
              width="7"
              height="7"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M10.5 5.5V4.2A1.2 1.2 0 0 0 9.3 3H4.2A1.2 1.2 0 0 0 3 4.2v5.1A1.2 1.2 0 0 0 4.2 10.5H5.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
