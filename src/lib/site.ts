export const siteConfig = {
  name: "Runex",
  tagline: "Easy deployment for developers.",
  description:
    "Runex is a cloud deployment platform that helps developers deploy applications from GitHub without manually managing deployment infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://runex.cloud",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://runex.cloud",
  signInPath: "/sign-in",
  signUpPath: "/sign-up",
  deploymentDomain: "*.runex.cloud",
  cnameTarget: "cname.runex.cloud",
  twitter: "@runexcloud",
} as const;

export function appSignInUrl() {
  return `${siteConfig.appUrl}${siteConfig.signInPath}`;
}

export function appSignUpUrl() {
  return `${siteConfig.appUrl}${siteConfig.signUpPath}`;
}

export function appDeployUrl() {
  return appSignUpUrl();
}

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/security", label: "Security" },
  { href: "/blog", label: "Blog" },
] as const;

export const footerLinks = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
    { href: "/deploy/nextjs", label: "Deploy Next.js" },
  ],
  docs: [
    { href: "/docs", label: "Documentation" },
    { href: "/docs/getting-started", label: "Getting started" },
    { href: "/docs/deploy-from-github", label: "Deploy from GitHub" },
    { href: "/docs/custom-domains", label: "Custom domains" },
  ],
  compare: [
    { href: "/compare/runex-vs-vercel", label: "Runex vs Vercel" },
    { href: "/compare/runex-vs-railway", label: "Runex vs Railway" },
    { href: "/compare/runex-vs-render", label: "Runex vs Render" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
} as const;
