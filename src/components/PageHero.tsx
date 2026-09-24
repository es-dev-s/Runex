import { type ReactNode } from "react";
import { BrandAura, type BrandAuraPlacement } from "./BrandAura";
import { Container } from "./Container";
import { FadeIn } from "./Motion";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  auraPlacement = "tr",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  /** Subtle faded logo placement; omit-style default top-right. */
  auraPlacement?: BrandAuraPlacement | false;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div
        className="accent-bloom absolute right-[-10%] top-[-20%] h-[380px] w-[380px] opacity-50"
        aria-hidden
      />
      {auraPlacement !== false && (
        <BrandAura
          placement={auraPlacement}
          opacity={0.14}
          blurPx={30}
        />
      )}
      <Container className="relative z-10">
        <FadeIn>
          <div className="frame max-w-4xl px-6 py-8 sm:px-9 sm:py-10">
            {eyebrow && <p className="micro-label text-accent">{eyebrow}</p>}
            <h1 className="display mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="body-muted mt-5 max-w-2xl text-[15px] sm:text-base">
              {description}
            </p>
            {children && (
              <div className="mt-8 flex flex-wrap gap-3">{children}</div>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
