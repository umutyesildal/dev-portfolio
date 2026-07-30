import { getPortfolioData } from "@/data/portfolio";
import type { Metadata } from "next";
import "./globals.css";

const data = getPortfolioData();

export const metadata: Metadata = {
  metadataBase: new URL(data.site.url),
  title: {
    default: data.site.name,
    template: `%s | ${data.site.name}`,
  },
  description: data.site.description,
  openGraph: {
    title: data.socialPreview.title,
    description: data.socialPreview.description,
    url: data.site.url,
    siteName: data.site.name,
    locale: data.site.locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: data.socialPreview.title,
    description: data.socialPreview.description,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={data.site.language} suppressHydrationWarning>
      <body
        className="relative min-h-screen bg-background font-sans antialiased"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(186,225,110,0.24),transparent_65%)]" />
          <div className="absolute right-[-18%] top-[27%] h-[38rem] w-[26rem] rotate-12 rounded-[48%] bg-[radial-gradient(ellipse_at_center,rgba(186,225,110,0.13),transparent_68%)]" />
          <div className="absolute left-[-15%] top-[52%] h-[28rem] w-[38rem] -rotate-12 rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(255,214,167,0.11),transparent_70%)]" />
          <div className="absolute right-[-10%] top-[73%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(186,225,110,0.1),transparent_68%)]" />
          <div className="absolute bottom-[-14rem] right-[-12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,214,167,0.2),transparent_68%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 sm:px-8 sm:py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
