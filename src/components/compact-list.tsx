import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type CompactListItem = {
  title: string;
  meta: string;
  url: string;
  year: string;
};

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

export function CompactList({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: CompactListItem[];
}) {
  return (
    <div className="mt-10">
      <h3 className="text-[18px] font-medium tracking-[-0.02em]">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}

      <div className="mt-4 border-t border-border/60">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            target={isExternal(item.url) ? "_blank" : undefined}
            rel={isExternal(item.url) ? "noopener noreferrer" : undefined}
            className="group grid gap-1 border-b border-border/60 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
          >
            <div>
              <span className="flex items-baseline gap-2 text-[14px] font-medium">
                {item.title}
                <ArrowUpRight
                  aria-hidden
                  className="size-3 text-muted-foreground opacity-40 transition-opacity duration-150 sm:opacity-0 sm:group-hover:opacity-100"
                />
              </span>
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                {item.meta}
              </p>
            </div>
            <span className="mono-label hidden tabular-nums text-muted-foreground sm:block">
              {item.year}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
