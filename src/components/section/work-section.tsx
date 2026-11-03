"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import type { WorkItem } from "@/data/schema";

export default function WorkSection({ work }: { work: WorkItem[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={work.length > 0 ? "work-0" : undefined}
      className="border-b border-border/80"
    >
      {work.map((item, index) => (
        <AccordionItem
          key={`${item.company}-${index}`}
          value={`work-${index}`}
          className="border-b-0 border-t border-border/80 first:border-t-0"
        >
          <AccordionTrigger className="group flex w-full items-start justify-between gap-4 py-5 text-left hover:no-underline">
            <div className="min-w-0">
              <div className="text-[16px] font-medium leading-snug">
                {item.company}
              </div>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                {item.shortTitle || item.title}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <p className="mono-label mt-1.5 text-muted-foreground sm:hidden">
                {item.start} – {item.end}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 pt-1">
              <span className="mono-label hidden tabular-nums text-muted-foreground sm:inline">
                {item.start} – {item.end}
              </span>
              <ChevronDown
                aria-hidden
                className="size-3.5 text-muted-foreground transition-transform duration-200"
              />
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-6">
            <p className="max-w-[62ch] text-[14px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
