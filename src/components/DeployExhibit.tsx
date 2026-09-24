"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site";

const stages = [
  { label: "Connecting GitHub App", detail: "repo · main" },
  { label: "Building container", detail: "detect · install · compile" },
  { label: "Starting runtime", detail: "isolated · resource-limited" },
  { label: "Live", detail: `https://app.${siteConfig.url.replace("https://", "")}` },
] as const;

export function DeployExhibit() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(stages.length - 1);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % stages.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="frame relative flex h-full min-h-[320px] flex-col overflow-hidden p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="micro-label">Live deploy</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-2.5 py-1 text-[11px] text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-accent ${step === stages.length - 1 ? "deploy-pulse" : ""}`}
          />
          {step === stages.length - 1 ? "Running" : "In progress"}
        </span>
      </div>

      <div className="terminal-surface mt-5 flex-1 p-4 font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-[13px]">
        <p className="text-zinc-600"># runex deploy — exhibit</p>
        <ul className="mt-4 space-y-3">
          {stages.map((stage, i) => {
            const active = i === step;
            const done = i < step || (reduce && i <= step);
            return (
              <li
                key={stage.label}
                className={`flex items-start gap-3 transition-opacity duration-300 ${
                  active || done ? "opacity-100" : "opacity-35"
                }`}
              >
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                    done || active ? "bg-accent" : "bg-zinc-600"
                  } ${active && !reduce ? "deploy-pulse" : ""}`}
                />
                <span>
                  <span
                    className={`block ${active || done ? "text-zinc-200" : "text-zinc-500"}`}
                  >
                    {stage.label}
                  </span>
                  <span className="text-zinc-600">{stage.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-dim">
        <span>HTTPS · {siteConfig.deploymentDomain}</span>
        <span className="font-mono text-accent/80">container isolation</span>
      </div>
    </div>
  );
}
