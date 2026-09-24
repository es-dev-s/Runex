import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

/** Prefer real page.tsx mtime; never stamp every URL with build-time `new Date()`. */
function pageLastModified(routePath: string): Date {
  const rel =
    routePath === "/"
      ? path.join("src", "app", "page.tsx")
      : path.join("src", "app", ...routePath.split("/").filter(Boolean), "page.tsx");
  const full = path.join(/*turbopackIgnore: true*/ process.cwd(), rel);
  try {
    return fs.statSync(full).mtime;
  } catch {
    return new Date("2026-09-24T00:00:00.000Z");
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const highPriority = new Set(["/", "/what-is-runex"]);
  const isDeploy = (p: string) => p === "/deploy" || p.startsWith("/deploy/");

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

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((routePath) => {
    let priority = 0.7;
    if (highPriority.has(routePath)) priority = 1;
    else if (isDeploy(routePath)) priority = 0.9;
    else if (routePath.startsWith("/docs")) priority = 0.75;
    else if (routePath.startsWith("/use-cases")) priority = 0.75;
    else if (routePath === "/features" || routePath === "/pricing" || routePath === "/security")
      priority = 0.8;

    return {
      url: `${base}${routePath === "/" ? "" : routePath}`,
      lastModified: pageLastModified(routePath),
      changeFrequency:
        routePath === "/" || routePath === "/what-is-runex" ? "weekly" : "monthly",
      priority,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const mdxPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "content", "blog", `${post.slug}.mdx`);
    let lastModified: Date;
    if (post.updated) lastModified = new Date(post.updated);
    else if (post.date) lastModified = new Date(post.date);
    else {
      try {
        lastModified = fs.statSync(mdxPath).mtime;
      } catch {
        lastModified = new Date("2026-09-24T00:00:00.000Z");
      }
    }

    return {
      url: `${base}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
