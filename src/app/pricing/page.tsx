import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Runex pricing for developers and teams. Start deploying from GitHub with a free tier; scale as your production workloads grow. Exact plan limits shown in the dashboard.",
  path: "/pricing",
});

const faqs = [
  {
    question: "Is there a free way to try Runex?",
    answer:
      "Yes. You can sign up and deploy to evaluate the platform. Current free and paid limits are shown in the Runex dashboard after sign-in.",
  },
  {
    question: "Why don’t you list exact dollar amounts here?",
    answer:
      "Plan prices and quotas can change as the product matures. The dashboard is the source of truth for current pricing so this marketing site never shows stale numbers.",
  },
  {
    question: "What do paid plans unlock?",
    answer:
      "Paid plans are intended for production usage: higher resource allowances, more deployments, and team-oriented capacity as those controls roll out. See the dashboard for live entitlements.",
  },
];

const tiers = [
  {
    name: "Hobby",
    price: "Free to start",
    description:
      "For developers evaluating Runex and shipping early projects.",
    points: [
      "GitHub App deploy",
      "HTTPS on *.runex.cloud",
      "Custom domain support (when enabled for the project)",
      "Isolated container deployments",
    ],
    cta: "Start deploying",
    highlighted: false,
  },
  {
    name: "Production",
    price: "See dashboard",
    description:
      "For apps that need sustained capacity and clearer operational limits.",
    points: [
      "Everything in Hobby",
      "Higher resource allowances",
      "More concurrent deployments",
      "Priority as platform capacity expands",
    ],
    cta: "View plans in app",
    highlighted: true,
  },
  {
    name: "Teams",
    price: "Coming into focus",
    description:
      "Collaboration and shared project boundaries for small engineering teams.",
    points: [
      "Shared project access (roadmap where noted in-app)",
      "Production-oriented limits",
      "Custom domains for client and internal apps",
      "Contact us for early access needs",
    ],
    cta: "Create account",
    highlighted: false,
    badge: "Evolving",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing. Accurate claims."
        description="Start on Runex without managing infrastructure for every app. Live plan prices and quotas live in the dashboard so this page never invents numbers."
      >
        <Button href={appSignUpUrl()} external>
          Open pricing in Runex
        </Button>
      </PageHero>

      <section className="border-b border-white/5 py-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <FadeIn key={tier.name}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-6 ${
                    tier.highlighted
                      ? "border-accent/40 bg-accent/5 shadow-[0_0_40px_rgba(245,158,11,0.08)]"
                      : "border-white/10 bg-card/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-foreground">
                      {tier.name}
                    </h2>
                    {tier.badge && (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    {tier.price}
                  </p>
                  <p className="mt-2 text-sm text-muted">{tier.description}</p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {tier.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href={appSignUpUrl()}
                      external
                      variant={tier.highlighted ? "primary" : "secondary"}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            No fake ratings or invented discounts. Sign in at{" "}
            <a
              className="text-accent hover:text-accent-soft"
              href={appSignUpUrl()}
            >
              runex.cloud
            </a>{" "}
            for current entitlements.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Pricing FAQ
          </h2>
          <FAQ items={faqs} />
        </Container>
      </section>

      <CTASection title="Ready when you are" />
    </>
  );
}
