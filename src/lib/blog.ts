import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) return [] as string[];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPosts(): BlogPostMeta[] {
  const files = ensureBlogDir();
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      updated: data.updated ? String(data.updated) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: stats.text,
    } satisfies BlogPostMeta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: stats.text,
    content,
  };
}

export function getAllSlugs(): string[] {
  return ensureBlogDir().map((f) => f.replace(/\.mdx$/, ""));
}
