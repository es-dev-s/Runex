import { Container } from "./Container";
import { FadeIn } from "./Motion";

// PLACEHOLDER testimonials: replace these sample voices with real customer quotes before launch.
const testimonials = [
  {
    quote: "From repo to a public URL, the path feels refreshingly short.",
    name: "Maya",
    role: "Product engineer",
  },
  {
    quote: "I can hand a deployment link to the team without writing another runbook.",
    name: "Alex",
    role: "Independent developer",
  },
  {
    quote: "Runex keeps the deployment surface small so we can stay focused on the product.",
    name: "Priya",
    role: "Technical founder",
  },
  {
    quote: "The GitHub flow is the right level of boring: connect, select, ship.",
    name: "Sam",
    role: "Full-stack engineer",
  },
  {
    quote: "Custom domains came after the first deploy, not before it.",
    name: "Jordan",
    role: "Product builder",
  },
  {
    quote: "Clear status, isolated workloads, and a URL I can share.",
    name: "Noor",
    role: "Platform engineer",
  },
] as const;

type Testimonial = (typeof testimonials)[number];

/** Split six voices into three columns of two (desktop / tablet). */
const columns: Testimonial[][] = [
  [testimonials[0], testimonials[1]],
  [testimonials[2], testimonials[3]],
  [testimonials[4], testimonials[5]],
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="testimonials-marquee-card">
      <blockquote className="text-[15px] leading-relaxed tracking-tight text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-mono text-[10px] font-semibold text-accent">
          {testimonial.name[0]}
        </span>
        <span>
          <span className="block text-xs font-semibold text-foreground">
            {testimonial.name}
          </span>
          <span className="mt-0.5 block text-[11px] text-muted-dim">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeColumn({
  items,
  columnIndex,
  className = "",
}: {
  items: readonly Testimonial[];
  columnIndex: number;
  className?: string;
}) {
  // Duplicate the set so translateY(-50%) loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div
      className={`testimonials-marquee-column testimonials-marquee-column--${columnIndex + 1} ${className}`.trim()}
    >
      <div className="testimonials-marquee-column-track">
        {loop.map((testimonial, i) => (
          <TestimonialCard
            key={`${columnIndex}-${i}-${testimonial.name}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <p className="micro-label text-accent">Customer voices</p>
            <h2 className="display mt-3 text-3xl text-foreground sm:text-5xl">
              Loved by the people who ship
            </h2>
            <p className="body-muted mt-4 max-w-xl text-[15px] sm:text-base">
              Developers and teams ship production apps with Runex. Here&apos;s what
              they say about the path from code to a live URL.
            </p>
          </div>
        </FadeIn>

        <div
          className="testimonials-marquee mt-10"
          aria-label="Runex customer voices"
        >
          {/* Desktop / tablet: 3 independent columns */}
          {columns.map((items, i) => (
            <MarqueeColumn
              key={i}
              items={items}
              columnIndex={i}
              className="testimonials-marquee-column--desktop"
            />
          ))}
          {/* Mobile: one column with all six so nothing is hidden */}
          <MarqueeColumn
            items={testimonials}
            columnIndex={0}
            className="testimonials-marquee-column--mobile"
          />
        </div>
      </Container>
    </section>
  );
}
