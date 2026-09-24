import { type ReactNode } from "react";
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
    <Container className="pb-12 pt-28 sm:pb-16 sm:pt-32">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <DocsNav current={current} />
        <article className="prose-runex min-w-0">{children}</article>
      </div>
    </Container>
  );
}
