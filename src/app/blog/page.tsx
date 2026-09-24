import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Guides for deploying applications."
        description="Practical articles that answer real questions — what a deployment platform is, how to deploy from GitHub, and how custom domains work on Runex."
      />

      <section className="pb-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">No posts yet.</p>
          ) : (
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-white/10 bg-card/60 p-6 transition hover:border-accent/30"
                  >
                    <time
                      dateTime={post.date}
                      className="text-xs font-medium uppercase tracking-wide text-stone-500"
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

          <FadeIn className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-6 text-sm text-muted">
            Looking for product docs? Start at{" "}
            <Link href="/docs" className="text-accent hover:text-accent-soft">
              /docs
            </Link>
            .
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
