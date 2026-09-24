import { appSignUpUrl } from "@/lib/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { FadeIn } from "./Motion";

export function CTASection({
  title = "Deploy your first application",
  description = "Connect a GitHub repository, deploy with Runex, and get a production HTTPS URL on *.runex.cloud.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-card to-card px-8 py-12 text-center sm:px-12 sm:py-16">
            <div className="glow-orb absolute inset-0 opacity-40" aria-hidden />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">{description}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={appSignUpUrl()} external>
                  Deploy with Runex
                </Button>
                <Button href="/docs" variant="secondary">
                  Read the docs
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
