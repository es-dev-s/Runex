import { type ReactNode } from "react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

export type Feature = {
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
};

export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: Feature[];
  columns?: 2 | 3;
}) {
  const grid =
    columns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Stagger className={`grid gap-4 ${grid}`}>
      {features.map((feature) => (
        <StaggerItem key={feature.title}>
          <article className="h-full rounded-2xl border border-white/10 bg-card/70 p-6 transition hover:border-accent/30 hover:bg-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                {feature.icon ?? (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
              </div>
              {feature.badge && (
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                  {feature.badge}
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {feature.description}
            </p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeIn className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted">{description}</p>
      )}
    </FadeIn>
  );
}
