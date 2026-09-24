import type { Metadata } from "next";
import Link from "next/link";
import { BouncyIndicator } from "@/components/BouncyIndicator";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Runex blog: deployment platform explainers, GitHub deploy tutorials, custom domains, and practical guides for developers.",
  path: "/blog",
});

const bouncySections = [
  { id: "posts", label: "Posts" },
  { id: "deploy", label: "Deploy" },
] as const;

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BouncyIndicator sections={bouncySections} />
      <PageHero
        eyebrow="Blog"
        title="Guides for deploying applications."
        description="Practical articles that answer real questions — what a deployment platform is, how to deploy from GitHub, and how custom domains work on Runex."
      />

      <section id="posts" className="scroll-mt-28 pb-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">No posts yet.</p>
          ) : (
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="frame-tight flex h-full flex-col p-6 transition hover:border-zinc-500"
                  >
                    <time
                      dateTime={post.date}
                      className="micro-label"
                    >
                      {post.date}
                      {post.readingTime ? ` · ${post.readingTime}` : ""}
                    </time>
                    <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {post.description}
                    </p>
                    <span className="mt-4 text-sm font-medium text-accent">
                      Read article →
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <FadeIn className="frame-tight mt-12 p-6 text-sm text-muted">
            Looking for product docs? Start at{" "}
            <Link href="/docs" className="text-accent hover:text-accent-soft">
              /docs
            </Link>
            .
          </FadeIn>
        </Container>
      </section>
      <CTASection id="deploy" title="Ship what you just read about" />
    </>
  );
}
