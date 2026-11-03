import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectRow } from "@/components/project-row";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioData } from "@/data/portfolio";

function yearOf(date: string) {
  return date.match(/(?:19|20)\d{2}/)?.[0] ?? "";
}

export default function ProjectsSection() {
  const data = getPortfolioData();

  return (
    <section className="mt-20 sm:mt-28">
      <SectionHeading
        title={data.portfolio.projects.title}
        description={data.portfolio.projects.description || undefined}
      />

      <div className="mt-8 border-b border-border/80">
        {data.projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>

      {data.openSource.length > 0 ? (
        <div className="mt-10">
          <h3 className="text-[18px] font-medium tracking-[-0.02em]">
            {data.portfolio.openSource.title}
          </h3>
          {data.portfolio.openSource.description ? (
            <p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-muted-foreground">
              {data.portfolio.openSource.description}
            </p>
          ) : null}
          <div className="mt-4 border-t border-border/60">
            {data.openSource.map((project) => (
              <Link
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-1 border-b border-border/60 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
              >
                <div>
                  <span className="flex items-baseline gap-2 text-[14px] font-medium">
                    {project.title}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3 text-muted-foreground opacity-40 transition-opacity duration-150 sm:opacity-0 sm:group-hover:opacity-100"
                    />
                  </span>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <span className="mono-label hidden tabular-nums text-muted-foreground sm:block">
                  {project.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10">
        <h3 className="text-[18px] font-medium tracking-[-0.02em]">
          {data.portfolio.earlierProjects.title}
        </h3>
        {data.portfolio.earlierProjects.description ? (
          <p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-muted-foreground">
            {data.portfolio.earlierProjects.description}
          </p>
        ) : null}
        <div className="mt-4 grid gap-x-12 sm:grid-cols-2">
          {data.earlierProjects.map((project) => (
            <Link
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 border-t border-border/60 py-3"
            >
              <span className="flex items-baseline gap-2 text-sm">
                {project.title}
                <ArrowUpRight
                  aria-hidden
                  className="size-3 text-muted-foreground opacity-40 transition-opacity duration-150 sm:opacity-0 sm:group-hover:opacity-100"
                />
              </span>
              <span className="mono-label tabular-nums text-muted-foreground">
                {yearOf(project.date)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
