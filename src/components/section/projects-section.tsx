import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { getPortfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    const data = getPortfolioData();

    return (
        <section id="projects" className="flex min-h-0 flex-col gap-y-8 border-t border-border/60 pt-8">
            <div className="flex flex-col gap-y-3">
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {data.portfolio.projects.label}
                </span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {data.portfolio.projects.title}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {data.portfolio.projects.description}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 auto-rows-fr">
                {data.projects.map((project, id) => (
                    <BlurFade
                        key={project.title}
                        delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                        className="h-full"
                    >
                        <ProjectCard
                            href={project.url}
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            dates={project.date}
                            tags={project.technologies}
                            image={project.image}
                            video={project.video}
                            links={project.links}
                        />
                    </BlurFade>
                ))}
            </div>
            <div className="border-t border-border/60 pt-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold">{data.portfolio.earlierProjects.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {data.portfolio.earlierProjects.description}
                        </p>
                    </div>
                </div>
                <div className="divide-y divide-border/60">
                    {data.earlierProjects.map((project) => (
                        <Link
                            key={project.title}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 py-4"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{project.title}</span>
                                    <span className="text-xs text-muted-foreground">{project.date}</span>
                                </div>
                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                    {project.technologies.join(" · ")}
                                </p>
                            </div>
                            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
