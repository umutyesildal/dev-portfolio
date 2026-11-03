import { getPortfolioData } from "@/data/portfolio";

export function SiteFooter() {
  const data = getPortfolioData();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/80 pt-4 sm:mt-28">
      <div className="flex items-baseline justify-between gap-4">
        <p className="mono-label text-muted-foreground">
          © {year} {data.site.name}
        </p>
        <p className="mono-label text-muted-foreground">
          {data.site.location}
        </p>
      </div>
    </footer>
  );
}
