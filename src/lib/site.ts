export const siteConfig = {
  name: "Runex",
  alternateName: "Runex Cloud",
  tagline: "Easy deployment for developers.",
  slogan: "Easy deployment platform for developers.",
  description:
    "Runex is an easy cloud deployment platform for developers. Deploy applications from GitHub or Docker to HTTPS on *.runex.cloud — without manually managing deployment infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://runex.cloud",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://runex.cloud",
  signInPath: "/sign-in",
  signUpPath: "/sign-up",
  deploymentDomain: "*.runex.cloud",
  cnameTarget: "cname.runex.cloud",
  twitter: "@runexcloud",
  /** Only real public profiles — leave empty until verified. */
  sameAs: [] as string[],
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
    { href: "/deploy", label: "Deploy" },
    { href: "/deploy/github", label: "Deploy from GitHub" },
    { href: "/security", label: "Security" },
  ],
  docs: [
    { href: "/docs", label: "Documentation" },
    { href: "/docs/getting-started", label: "Getting started" },
    { href: "/docs/deploy-from-github", label: "Deploy from GitHub" },
    { href: "/docs/environment-variables", label: "Environment variables" },
    { href: "/docs/custom-domains", label: "Custom domains" },
    { href: "/docs/troubleshooting", label: "Troubleshooting" },
  ],
  compare: [
    { href: "/compare/runex-vs-vercel", label: "Runex vs Vercel" },
    { href: "/compare/runex-vs-railway", label: "Runex vs Railway" },
    { href: "/compare/runex-vs-render", label: "Runex vs Render" },
    { href: "/compare/runex-vs-netlify", label: "Runex vs Netlify" },
    { href: "/compare/runex-vs-vps", label: "Runex vs VPS" },
  ],
  company: [
    { href: "/what-is-runex", label: "What is Runex?" },
    { href: "/about", label: "About" },
    { href: "/use-cases/full-stack-apps", label: "Full-stack apps" },
    { href: "/blog", label: "Blog" },
  ],
} as const;
