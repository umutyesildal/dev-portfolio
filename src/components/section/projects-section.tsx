import { CompactList } from "@/components/compact-list";
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
        <CompactList
          title={data.portfolio.openSource.title}
          description={data.portfolio.openSource.description || undefined}
          items={data.openSource.map((project) => ({
            title: project.title,
            meta: project.description,
            url: project.url,
            year: project.date,
          }))}
        />
      ) : null}

      <CompactList
        title={data.portfolio.earlierProjects.title}
        description={data.portfolio.earlierProjects.description || undefined}
        items={data.earlierProjects.map((project) => ({
          title: project.title,
          meta: project.technologies.join(" · "),
          url: project.url,
          year: yearOf(project.date),
        }))}
      />
    </section>
  );
}
