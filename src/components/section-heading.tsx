export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-t border-border/80 pt-6">
      <h2 className="text-[28px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[34px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
