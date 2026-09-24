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
    columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Stagger className={`grid gap-3 ${grid}`}>
      {features.map((feature) => (
        <StaggerItem key={feature.title}>
          <article className="frame-tight flex h-full flex-col p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="micro-label">Capability</p>
              {feature.badge && (
                <span className="rounded-full border border-card-border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-dim">
                  {feature.badge}
                </span>
              )}
            </div>
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
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
      {eyebrow && <p className="micro-label text-accent">{eyebrow}</p>}
      <h2 className="display mt-3 text-2xl text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="body-muted mt-3">{description}</p>
      )}
    </FadeIn>
  );
}
