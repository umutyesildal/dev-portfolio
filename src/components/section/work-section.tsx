/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import type { WorkItem } from "@/data/schema";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="flex size-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground shadow-sm md:size-10">
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection({ work }: { work: WorkItem[] }) {
  return (
    <Accordion type="single" collapsible className="grid w-full gap-4">
      {work.map((item) => (
        <AccordionItem
          key={item.company}
          value={item.company}
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <LogoImage src={item.logo} alt={item.company} />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-none">{item.company}</div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {item.title} {item.location ? `· ${item.location}` : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-none items-center gap-2 text-right text-xs tabular-nums text-muted-foreground">
                <span>
                  {item.start} - {item.end}
                </span>
                <span className="flex size-6 items-center justify-center rounded-full border border-border/70 bg-background/70 transition-colors group-hover:bg-accent">
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            {item.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
