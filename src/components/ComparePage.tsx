import Link from "next/link";
import { Button } from "@/components/Button";
import { BouncyIndicator } from "@/components/BouncyIndicator";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { appSignUpUrl } from "@/lib/site";

export type CompareRow = {
  capability: string;
  runex: string;
  other: string;
};

const bouncySections = [
  { id: "comparison", label: "Compare" },
  { id: "notes", label: "Notes" },
  { id: "deploy", label: "Deploy" },
] as const;

export function ComparePage({
  competitor,
  summary,
  rows,
  caveats,
  path,
}: {
  competitor: string;
  summary: string;
  rows: CompareRow[];
  caveats: string[];
  path: string;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `Runex vs ${competitor}`, path },
        ])}
      />
      <BouncyIndicator sections={bouncySections} />
      <PageHero
        eyebrow="Compare"
        title={`Runex vs ${competitor}`}
        description={summary}
        auraPlacement="bl"
      >
        <Button href={appSignUpUrl()} external>
          Try Runex
        </Button>
        <Button href="/docs" variant="secondary">
          Read docs
        </Button>
      </PageHero>

      <section
        id="comparison"
        className="scroll-mt-28 border-b border-card-border py-16"
      >
        <Container>
          <FadeIn>
            <div className="-mx-1 overflow-x-auto overscroll-x-contain rounded-[1.25rem] border border-card-border bg-card sm:mx-0">
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

            <div id="notes" className="mt-10 max-w-3xl scroll-mt-28">
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

      <CTASection id="deploy" />
    </>
  );
}
