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

function TestimonialSet({ copy = false }: { copy?: boolean }) {
  return (
    <div className={`testimonials-marquee-set${copy ? " testimonials-marquee-copy" : ""}`}>
      {testimonials.map((testimonial) => (
        <figure
          className="testimonials-marquee-card"
          key={`${copy ? "copy-" : ""}${testimonial.name}`}
        >
          <blockquote className="text-[15px] leading-relaxed tracking-tight text-foreground">
            “{testimonial.quote}”
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-mono text-[10px] font-semibold text-accent">
              {testimonial.name[0]}
            </span>
            <span>
              <span className="block text-xs font-semibold text-foreground">{testimonial.name}</span>
              <span className="mt-0.5 block text-[11px] text-muted-dim">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section className="overflow-hidden border-y border-card-border py-20 sm:py-24">
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
      </Container>

      <div className="testimonials-marquee mt-10" aria-label="Runex customer voices">
        <div className="testimonials-marquee-track">
          <TestimonialSet />
          <TestimonialSet copy />
        </div>
      </div>
    </section>
  );
}
