import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { appSignUpUrl } from "@/lib/site";

export type CompareRow = {
  capability: string;
  runex: string;
  other: string;
};

export function ComparePage({
  competitor,
  summary,
  rows,
  caveats,
}: {
  competitor: string;
  summary: string;
  rows: CompareRow[];
  caveats: string[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title={`Runex vs ${competitor}`}
        description={summary}
      >
        <Button href={appSignUpUrl()} external>
          Try Runex
        </Button>
        <Button href="/docs" variant="secondary">
          Read docs
        </Button>
      </PageHero>

      <section className="border-b border-card-border py-16">
        <Container>
          <FadeIn>
            <div className="overflow-x-auto rounded-[1.25rem] border border-card-border bg-card">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-card-border bg-white/[0.02]">
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Capability
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      Runex
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">
                      {competitor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.capability}
                      className="border-b border-card-border last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {row.capability}
                      </td>
                      <td className="px-4 py-3 text-muted">{row.runex}</td>
                      <td className="px-4 py-3 text-muted">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                How to read this comparison
              </h2>
              <ul className="mt-4 space-y-2">
                {caveats.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Competitor capabilities change. Verify against official{" "}
                {competitor} documentation before making a purchasing decision.
                See also{" "}
                <Link href="/features" className="text-accent hover:text-accent-soft">
                  Runex features
                </Link>{" "}
                and{" "}
                <Link href="/security" className="text-accent hover:text-accent-soft">
                  security
                </Link>
                .
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
