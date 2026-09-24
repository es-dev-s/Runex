export type FAQItem = { question: string; answer: string };

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-card-border overflow-hidden rounded-[1.25rem] border border-card-border bg-card">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4 sm:px-6">
          <summary className="cursor-pointer list-none text-left text-[15px] font-medium tracking-tight text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span className="mt-0.5 text-muted-dim transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
