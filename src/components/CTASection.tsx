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
    <section className="py-16 sm:py-20">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-card-border bg-card px-7 py-11 sm:px-12 sm:py-14">
            <div
              className="accent-bloom absolute -right-16 -top-16 h-64 w-64 opacity-60"
              aria-hidden
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-end">
              <div>
                <p className="micro-label text-accent">Next step</p>
                <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">
                  {title}
                </h2>
                <p className="body-muted mt-4 max-w-xl">{description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
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
