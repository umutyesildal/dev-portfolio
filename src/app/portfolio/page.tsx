import type { Metadata } from "next";
import ContactSection from "@/components/section/contact-section";
import ExperienceEducationSection from "@/components/section/experience-education-section";
import ProjectsSection from "@/components/section/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/data/portfolio";

export function generateMetadata(): Metadata {
  const data = getPortfolioData();
  return {
    title: data.portfolio.metadataTitle,
    description: data.portfolio.metadataDescription,
    alternates: { canonical: "/portfolio" },
    openGraph: {
      url: "/portfolio",
      siteName: data.site.name,
      locale: data.site.locale,
      type: "website",
      title: data.portfolio.metadataTitle,
      description: data.portfolio.metadataDescription,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: data.socialPreview.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.portfolio.metadataTitle,
      description: data.portfolio.metadataDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default function PortfolioPage() {
  const data = getPortfolioData();

  return (
    <>
      <SiteHeader variant="portfolio" />

      <main id="content" className="flex flex-1 flex-col" tabIndex={-1}>
        <section className="pt-10 sm:pt-14">
          <h1
            data-enter
            style={{ "--enter-delay": "0ms" } as React.CSSProperties}
            className="max-w-[20ch] text-[clamp(2.25rem,4.8vw,3.5rem)] font-medium leading-[1.0] tracking-[-0.035em]"
          >
            {data.portfolio.headline}
          </h1>

          <p
            data-enter
            style={{ "--enter-delay": "60ms" } as React.CSSProperties}
            className="mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-muted-foreground"
          >
            {data.portfolio.intro}
          </p>
        </section>

        <ExperienceEducationSection
          experienceCopy={data.portfolio.experience}
          educationCopy={data.portfolio.education}
          work={data.work}
          education={data.education}
        />

        <ProjectsSection />

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
