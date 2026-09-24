import type { Metadata } from "next";
import { siteConfig } from "./site";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} — Easy Deployment Platform for Developers`
      : title.includes("Runex")
        ? title
        : `${title} | Runex`;

  return {
    // absolute: avoid layout title.template doubling ("Features | Runex | Runex")
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og/runex-og.png",
          width: 1200,
          height: 630,
          alt: "Runex — Easy Deployment Platform for Developers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.twitter,
      images: ["/og/runex-og.png"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Runex",
    alternateName: siteConfig.alternateName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
    description: siteConfig.description,
    // Free tier is real; no invented paid amounts, ratings, or awards
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description:
        "Free tier available; current paid plan prices and quotas are shown in the Runex dashboard",
      availability: "https://schema.org/InStock",
    },
  };
}

export function organizationJsonLd() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Runex",
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: absoluteUrl("/runex-mark.svg"),
    description: siteConfig.description,
    slogan: siteConfig.slogan,
  };
  if (siteConfig.sameAs.length > 0) {
    org.sameAs = [...siteConfig.sameAs];
  }
  return org;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Runex",
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
