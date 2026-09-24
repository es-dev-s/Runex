import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "/",
    "/features",
    "/pricing",
    "/security",
    "/about",
    "/docs",
    "/docs/getting-started",
    "/docs/deploy-from-github",
    "/docs/custom-domains",
    "/blog",
    "/deploy/nextjs",
    "/deploy/nodejs",
    "/deploy/python",
    "/deploy/go",
    "/deploy/docker",
    "/compare/runex-vs-vercel",
    "/compare/runex-vs-railway",
    "/compare/runex-vs-render",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/deploy") ? 0.8 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
