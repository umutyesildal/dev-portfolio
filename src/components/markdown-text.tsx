import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export function MarkdownText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-sm leading-relaxed text-muted-foreground",
        className
      )}
    >
      <Markdown
        components={{
          p: ({ children }) => (
            <p className="m-0 [&:not(:first-child)]:mt-2">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-foreground">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded-sm bg-secondary px-1 py-0.5 font-mono text-[0.9em] text-foreground">
              {children}
            </code>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
