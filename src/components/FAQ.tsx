export type FAQItem = { question: string; answer: string };

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-card-border overflow-hidden rounded-[1.35rem] border border-card-border bg-card">
      {items.map((item) => (
        <details
          key={item.question}
          className="group px-5 py-4 transition-colors hover:bg-white/[0.015] sm:px-7 sm:py-5"
        >
          <summary className="cursor-pointer list-none text-left text-[15px] font-medium tracking-tight text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              <span>{item.question}</span>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-card-border text-muted-dim transition group-open:rotate-45 group-open:border-accent/40 group-open:text-accent">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pb-1 text-sm leading-relaxed text-muted sm:text-[15px]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
