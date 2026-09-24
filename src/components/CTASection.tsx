import { appSignUpUrl } from "@/lib/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { BrandAura } from "./BrandAura";
import { FadeIn } from "./Motion";

export function CTASection({
  title = "Deploy your first application",
  description = "Connect a GitHub repository, deploy with Runex, and get a production HTTPS URL on *.runex.cloud.",
  id,
}: {
  title?: string;
  description?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24${id ? " scroll-mt-28" : ""}`}
    >
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-card-border bg-card px-5 py-10 sm:rounded-[1.85rem] sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-[28rem] opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(252,76,1,0.18) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <BrandAura placement="br" opacity={0.12} blurPx={26} className="opacity-90" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-end">
              <div>
                <p className="micro-label text-accent">Next step</p>
                <h2 className="display mt-3 text-[1.75rem] text-foreground sm:text-[2.75rem]">
                  {title}
                </h2>
                <p className="body-muted mt-4 max-w-xl text-[15px]">{description}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <Button href={appSignUpUrl()} external className="!px-6 !py-3 sm:w-auto">
                  Deploy with Runex
                </Button>
                <Button href="/docs" variant="secondary" className="!px-6 !py-3 sm:w-auto">
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
