import { type ReactNode } from "react";
import { BrandAura } from "./BrandAura";
import { Container } from "./Container";
import { DocsNav } from "./DocsNav";

export function DocsShell({
  current,
  children,
}: {
  current: string;
  children: ReactNode;
}) {
  return (
    <Container className="relative overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32">
      <BrandAura placement="tr" opacity={0.08} blurPx={36} className="right-[-5%] top-8" />
      <div className="relative z-10 grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <DocsNav current={current} />
        <article className="prose-runex min-w-0">{children}</article>
      </div>
    </Container>
  );
}
