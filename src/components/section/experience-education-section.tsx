"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import WorkSection from "@/components/section/work-section";
import { cn } from "@/lib/utils";
import type { EducationItem, WorkItem } from "@/data/schema";

type SectionCopy = {
  title: string;
  description: string;
};

type ActiveSection = "experience" | "education";

const panelClass =
  "pt-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";

function EducationPanel({ education }: { education: EducationItem[] }) {
  return (
    <div className="border-b border-border/80">
      {education.map((item) => (
        <article
          key={item.school}
          className="grid gap-2 border-t border-border/80 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
        >
          <div>
            <h3 className="text-[16px] font-medium leading-snug">
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-1.5 underline-offset-4 hover:underline"
                >
                  {item.school}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3 shrink-0 self-center text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                item.school
              )}
            </h3>
            <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
              {item.degree}
            </p>

            {item.coursework.length > 0 ? (
              <p className="mt-2 max-w-[62ch] text-[12.5px] leading-relaxed text-muted-foreground">
                {item.coursework.join(" · ")}
              </p>
            ) : null}
          </div>

          <span className="mono-label tabular-nums text-muted-foreground sm:text-right">
            {item.start} — {item.end}
          </span>
        </article>
      ))}
    </div>
  );
}

export default function ExperienceEducationSection({
  experienceCopy,
  educationCopy,
  work,
  education,
}: {
  experienceCopy: SectionCopy;
  educationCopy: SectionCopy;
  work: WorkItem[];
  education: EducationItem[];
}) {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("experience");
  const tabRefs = useRef<Record<ActiveSection, HTMLButtonElement | null>>({
    experience: null,
    education: null,
  });

  const tabs: Array<{ id: ActiveSection; label: string }> = [
    { id: "experience", label: experienceCopy.title },
    { id: "education", label: educationCopy.title },
  ];

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const next: ActiveSection =
      event.key === "ArrowLeft" || event.key === "Home"
        ? "experience"
        : "education";
    setActiveSection(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="mt-16 border-t border-border/80 pt-6 sm:mt-24">
      <h2 className="sr-only">Experience and education</h2>

      <div
        role="tablist"
        aria-label="Experience and education"
        className="flex gap-8 border-b border-border/80"
      >
        {tabs.map((tab) => {
          const isActive = activeSection === tab.id;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              id={`${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveSection(tab.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "-mb-px border-b-2 pb-3 text-[20px] font-medium tracking-[-0.02em] transition-colors sm:text-[22px]",
                isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="experience-panel"
        role="tabpanel"
        aria-labelledby="experience-tab"
        hidden={activeSection !== "experience"}
        className={cn(
          panelClass,
          activeSection === "experience" && "animate-panel-in"
        )}
      >
        {experienceCopy.description ? (
          <p className="mb-6 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
            {experienceCopy.description}
          </p>
        ) : null}
        <WorkSection work={work} />
      </div>

      <div
        id="education-panel"
        role="tabpanel"
        aria-labelledby="education-tab"
        hidden={activeSection !== "education"}
        className={cn(
          panelClass,
          activeSection === "education" && "animate-panel-in"
        )}
      >
        {educationCopy.description ? (
          <p className="mb-6 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
            {educationCopy.description}
          </p>
        ) : null}
        <EducationPanel education={education} />
      </div>
    </section>
  );
}
