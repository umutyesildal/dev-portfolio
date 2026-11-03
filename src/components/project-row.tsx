import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MarkdownText } from "@/components/markdown-text";
import type { ProjectItem } from "@/data/schema";

function yearOf(date: string) {
  return date.match(/(?:19|20)\d{2}/)?.[0] ?? "";
}

export function ProjectRow({ project }: { project: ProjectItem }) {
  const external = project.url.startsWith("http");

  return (
    <article className="group grid grid-cols-1 gap-y-1.5 border-t border-border/80 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-8 sm:gap-y-0 sm:py-6">
      <span className="mono-label hidden tabular-nums text-muted-foreground sm:block sm:pt-1.5">
        {yearOf(project.date)}
      </span>

      <div className="min-w-0">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="text-[19px] font-medium leading-snug tracking-[-0.02em] sm:text-[20px]">
            {project.url ? (
              <Link
                href={project.url}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex items-baseline gap-1.5 decoration-marker decoration-2 underline-offset-[6px] group-hover:underline"
              >
                {project.title}
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 self-center text-muted-foreground transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              project.title
            )}
          </h3>

          {project.metric ? (
            <span className="shrink-0 self-start border-b-2 border-marker pb-0.5 font-mono text-[16px] font-medium tabular-nums text-foreground sm:self-auto">
              {project.metric}
            </span>
          ) : null}
        </div>

        {project.image ? (
          <div className="mt-4 w-fit overflow-hidden rounded-lg border border-border">
            <Image
              src={project.image}
              alt=""
              width={640}
              height={360}
              sizes="320px"
              className="h-auto w-full max-w-xs object-cover"
            />
          </div>
        ) : null}

        <MarkdownText className="mt-2 max-w-[58ch] text-[14px]">
          {project.description}
        </MarkdownText>

        <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
          {project.technologies.slice(0, 3).join(" · ")}
        </p>

        {project.links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-5">
            {project.links.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                {link.label} <span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
