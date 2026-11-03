import { getPortfolioData } from "@/data/portfolio";
import type { Metadata, Viewport } from "next";
import { mono, sans } from "./fonts";
import "./globals.css";

const data = getPortfolioData();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: data.site.name,
  url: data.site.url,
  description: data.site.description,
  jobTitle: data.home.eyebrow,
  homeLocation: {
    "@type": "Place",
    name: data.site.location,
  },
  sameAs: data.contact.socials
    .filter((social) => social.url.startsWith("http"))
    .map((social) => social.url),
  worksFor: data.work[0]
    ? {
        "@type": "Organization",
        name: data.work[0].company,
        ...(data.work[0].url ? { url: data.work[0].url } : {}),
      }
    : undefined,
  alumniOf: data.education.map((entry) => ({
    "@type": "CollegeOrUniversity",
    name: entry.school,
    ...(entry.url ? { url: entry.url } : {}),
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(data.site.url),
  title: {
    default: data.site.name,
    template: `%s | ${data.site.name}`,
  },
  description: data.site.description,
  applicationName: data.site.name,
  authors: [{ name: data.site.name, url: data.site.url }],
  creator: data.site.name,
  openGraph: {
    title: data.socialPreview.title,
    description: data.socialPreview.description,
    siteName: data.site.name,
    locale: data.site.locale,
    type: "website",
  },
  twitter: {
    title: data.socialPreview.title,
    description: data.socialPreview.description,
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8EF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={data.site.language}
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="relative min-h-svh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
