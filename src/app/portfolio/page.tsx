import Link from "next/link";
import type { Metadata } from "next";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ContentIcon } from "@/components/content-icon";
import { getPortfolioData } from "@/data/portfolio";

export function generateMetadata(): Metadata {
  const data = getPortfolioData();
  return {
    title: data.portfolio.metadataTitle,
    description: data.portfolio.metadataDescription,
  };
}

export default function PortfolioPage() {
  const data = getPortfolioData();
  const homeNavigation = data.navigation.find((item) => item.href === "/");
  const headerSocials = data.portfolio.headerSocials.flatMap((name) => {
    const social = data.contact.socials.find((item) => item.name === name);
    return social ? [social] : [];
  });
  const contactSocials = data.portfolio.contact.socials.flatMap((name) => {
    const social = data.contact.socials.find((item) => item.name === name);
    return social ? [social] : [];
  });

  return (
    <main className="flex flex-col gap-14 py-4 sm:py-8">
      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={homeNavigation?.href ?? "/"}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {homeNavigation?.label ?? "Home"}
          </Link>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{data.site.location}</span>
            {headerSocials.map((social) => (
              <span key={social.name} className="contents">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {social.name}
                </Link>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {data.portfolio.label}
            </span>
            <h1 className="max-w-3xl text-4xl leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl [font-family:var(--font-display)]">
              {data.portfolio.headline}
            </h1>
          </div>
          <div className="max-w-md space-y-2 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              {data.portfolio.intro}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
              {data.portfolio.companyLine}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {data.portfolio.experience.title}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {data.portfolio.experience.description}
            </p>
          </div>
          <WorkSection work={data.work} />
        </div>

        <div className="space-y-6">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {data.portfolio.education.title}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {data.portfolio.education.description}
            </p>
          </div>
          <div className="divide-y divide-border/60">
            {data.education.map((item) => (
              <Link
                key={item.school}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-5 transition-colors hover:text-foreground"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.school}</h3>
                    <p className="text-sm text-muted-foreground">{item.degree}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.start} - {item.end}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection />

      <section className="space-y-6">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {data.portfolio.skills.title}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {data.portfolio.skills.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {data.skills.map((skill) => (
            <div
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm"
            >
              {skill.icon ? (
                <ContentIcon name={skill.icon} className="size-4 rounded-sm overflow-hidden object-contain" />
              ) : null}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 border-t border-border/60 pt-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {data.portfolio.contact.title}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              {data.portfolio.contact.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href={`mailto:${data.contact.email}`}
              className="rounded-full bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
            >
              {data.contact.email}
            </Link>
            {contactSocials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-background px-4 py-2 transition-colors hover:bg-accent"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
