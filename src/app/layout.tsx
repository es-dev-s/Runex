import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import {
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Runex — Easy Deployment Platform for Developers",
    template: "%s | Runex",
  },
  description: siteConfig.description,
  applicationName: "Runex",
  keywords: [
    "Runex",
    "Runex Cloud",
    "deployment platform",
    "easy deployment platform",
    "cloud deployment platform",
    "developer deployment platform",
    "GitHub deployment platform",
    "deploy from GitHub",
    "deploy Next.js",
    "deploy Docker",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Runex",
    title: "Runex — Easy Deployment Platform for Developers",
    description: "Deploy applications easily with Runex.",
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
    title: "Runex — Easy Deployment Platform for Developers",
    description: siteConfig.description,
    site: siteConfig.twitter,
    images: ["/og/runex-og.png"],
  },
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/runex-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/runex-mark.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={softwareApplicationJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
