import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HookSidebar } from "@/components/HookSidebar";
import { JsonLd } from "@/components/JsonLd";
import {
  extractMarkdownHeadings,
  getAllSlugs,
  getPostBySlug,
  slugifyHeading,
} from "@/lib/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "children" in children.props
  ) {
    return childrenToText(
      (children.props as { children?: ReactNode }).children,
    );
  }
  return "";
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractMarkdownHeadings(post.content);
  const hookSections = [
    ...headings,
    { id: "deploy", label: "Deploy" },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Organization",
      name: "Runex",
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <JsonLd data={articleLd} />
      {hookSections.length >= 2 ? (
        <HookSidebar sections={hookSections} />
      ) : null}
      <article className="border-b border-card-border pb-16 pt-28 sm:pt-32">
        <Container className="max-w-3xl">
          <p className="micro-label text-accent">Blog</p>
          <h1 className="display mt-3 text-3xl text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-muted">{post.description}</p>
          <p className="mt-4 text-sm text-muted-dim">
            <time dateTime={post.date}>{post.date}</time>
            {post.updated ? (
              <>
                {" "}
                · Updated <time dateTime={post.updated}>{post.updated}</time>
              </>
            ) : null}
            {" · "}
            {post.readingTime}
          </p>

          <div className="prose-runex mt-10">
            <MDXRemote
              source={post.content}
              components={{
                a: (props) => {
                  const href = props.href ?? "";
                  if (href.startsWith("/")) {
                    return <Link href={href}>{props.children}</Link>;
                  }
                  return (
                    <a {...props} rel="noopener noreferrer">
                      {props.children}
                    </a>
                  );
                },
                h2: ({ children, ...props }) => {
                  const text = childrenToText(children);
                  const id = slugifyHeading(text);
                  return (
                    <h2 {...props} id={id || undefined} className="scroll-mt-28">
                      {children}
                    </h2>
                  );
                },
              }}
            />
          </div>

          <p className="mt-12 text-sm text-muted">
            <Link href="/blog" className="text-accent hover:text-accent-soft">
              ← All posts
            </Link>
          </p>
        </Container>
      </article>
      <CTASection id="deploy" />
    </>
  );
}
