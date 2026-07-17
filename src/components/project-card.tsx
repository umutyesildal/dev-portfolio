/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import { ContentIcon } from "@/components/content-icon";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: string;
    label: string;
    url: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const hasExternalHref = Boolean(href);
  const hasMedia = Boolean(video || image);
  const details = (
    <>
      <div className="prose max-w-full flex-1 text-xs leading-relaxed text-muted-foreground dark:prose-invert">
        <Markdown>{description}</Markdown>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="h-6 w-fit border border-border px-2 text-[11px] font-medium"
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {links.map((link, idx) => (
            <Link
              href={link.url}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
                className="flex items-center gap-1.5 bg-foreground text-xs text-background hover:bg-foreground/90"
                variant="default"
              >
                <ContentIcon name={link.icon} className="size-3" />
                {link.label}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/70 transition-all duration-300 hover:border-foreground/10 hover:shadow-[0_20px_50px_-35px_rgba(44,55,28,0.45)]",
        className
      )}
    >
      {hasMedia ? (
        <div className="relative shrink-0">
          {hasExternalHref ? (
            <Link
              href={href!}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {video ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-48 w-full object-cover"
                />
              ) : image ? (
                <ProjectImage src={image} alt={title} />
              ) : null}
            </Link>
          ) : video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="h-48 w-full object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : null}
        </div>
      ) : null}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          {hasExternalHref ? (
            <Link
              href={href!}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 pt-2 text-sm text-muted-foreground">
          {details}
        </div>
      </div>
    </div>
  );
}
