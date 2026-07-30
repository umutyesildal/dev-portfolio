"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import WorkSection from "@/components/section/work-section";
import { cn } from "@/lib/utils";
import type { EducationItem, WorkItem } from "@/data/schema";

type SectionCopy = {
  title: string;
  description: string;
};

type ActiveSection = "experience" | "education";

const panelVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -28 }),
};

function EducationPanel({ education }: { education: EducationItem[] }) {
  return (
    <div className="space-y-10">
      {education.map((item) => (
        <article key={item.school} className="space-y-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1.5">
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-foreground"
              >
                {item.school}
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <p className="text-sm text-muted-foreground">{item.degree}</p>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {item.start} - {item.end}
            </span>
          </div>

          {item.coursework.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Selected coursework
              </h3>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {item.coursework.map((course) => (
                  <div
                    key={course}
                    className="border-t border-border/60 py-3 text-sm leading-6"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
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
  const [activeSection, setActiveSection] = useState<ActiveSection>("experience");
  const [direction, setDirection] = useState(1);
  const activeCopy = activeSection === "experience" ? experienceCopy : educationCopy;

  function selectSection(nextSection: ActiveSection) {
    if (nextSection === activeSection) return;
    setDirection(nextSection === "education" ? 1 : -1);
    setActiveSection(nextSection);
  }

  return (
    <section className="overflow-hidden">
      <div
        className="flex items-center justify-between gap-6 border-b border-border/60"
        role="tablist"
        aria-label="Experience and education"
      >
        {(["experience", "education"] as const).map((section) => {
          const copy = section === "experience" ? experienceCopy : educationCopy;
          const isActive = activeSection === section;

          return (
            <button
              key={section}
              id={`${section}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${section}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectSection(section)}
              onKeyDown={(event) => {
                if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                  event.preventDefault();
                  const nextSection = ["ArrowRight", "End"].includes(event.key)
                    ? "education"
                    : "experience";
                  selectSection(nextSection);
                  requestAnimationFrame(() => {
                    document.getElementById(`${nextSection}-tab`)?.focus();
                  });
                }
              }}
              className={cn(
                "relative cursor-pointer py-3 text-xl font-semibold tracking-tight transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-2xl",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {copy.title}
              {isActive ? (
                <motion.span
                  layoutId="experience-education-indicator"
                  className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {activeCopy.description}
      </p>

      <div className="mt-5">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeSection}
            id={`${activeSection}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeSection}-tab`}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSection === "experience" ? (
              <WorkSection work={work} />
            ) : (
              <EducationPanel education={education} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
