import { type ReactNode } from "react";
import { Container } from "./Container";
import { FadeIn } from "./Motion";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 pb-16 pt-16 sm:pb-20 sm:pt-20">
      <div className="glow-orb absolute -left-32 top-0 h-80 w-80" aria-hidden />
      <div className="glow-orb absolute -right-20 top-20 h-72 w-72 opacity-60" aria-hidden />
      <Container className="relative">
        <FadeIn>
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </FadeIn>
      </Container>
    </section>
  );
}
