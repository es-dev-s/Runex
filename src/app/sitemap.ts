import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const highPriority = new Set(["/", "/what-is-runex"]);
  const deployPriority = (path: string) =>
    path === "/deploy" || path.startsWith("/deploy/");

  const staticPaths = [
    "/",
    "/what-is-runex",
    "/features",
    "/pricing",
    "/security",
    "/about",
    "/use-cases",
    "/use-cases/full-stack-apps",
    "/docs",
    "/docs/getting-started",
    "/docs/deploy-from-github",
    "/docs/environment-variables",
    "/docs/custom-domains",
    "/docs/troubleshooting",
    "/docs/troubleshooting/deployment-failed",
    "/docs/troubleshooting/custom-domain",
    "/docs/troubleshooting/port-configuration",
    "/blog",
    "/deploy",
    "/deploy/github",
    "/deploy/nextjs",
    "/deploy/nodejs",
    "/deploy/python",
    "/deploy/go",
    "/deploy/docker",
    "/compare/runex-vs-vercel",
    "/compare/runex-vs-railway",
    "/compare/runex-vs-render",
    "/compare/runex-vs-netlify",
    "/compare/runex-vs-vps",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => {
    let priority = 0.7;
    if (highPriority.has(path)) priority = 1;
    else if (deployPriority(path)) priority = 0.8;
    else if (path.startsWith("/docs")) priority = 0.75;
    else if (path.startsWith("/use-cases")) priority = 0.75;

    return {
      url: `${base}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: path === "/" || path === "/what-is-runex" ? "weekly" : "monthly",
      priority,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
