import Link from "next/link";
import { getPortfolioData } from "@/data/portfolio";

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

export function SiteHeader({
  variant = "home",
}: {
  variant?: "home" | "portfolio";
}) {
  const data = getPortfolioData();
  const socials =
    variant === "portfolio"
      ? data.portfolio.headerSocials.flatMap((name) => {
          const social = data.contact.socials.find((item) => item.name === name);
          return social ? [social] : [];
        })
      : [];
  const homeLabel =
    data.navigation.find((item) => item.href === "/")?.label ?? "Home";
  const portfolio = data.navigation.find((item) => item.href === "/portfolio");

  return (
    <header className="flex items-center justify-between gap-5 border-b border-border/80 pb-4">
      <Link
        href="/"
        className="mono-label text-muted-foreground transition-colors hover:text-foreground"
      >
        {variant === "portfolio" ? (
          <>
            <span aria-hidden>← </span>
            {homeLabel}
          </>
        ) : (
          data.site.initials
        )}
      </Link>

      <nav aria-label="Site" className="flex items-center gap-4 sm:gap-6">
        {variant === "home" && portfolio ? (
          <Link
            href={portfolio.href}
            className="mono-label whitespace-nowrap text-foreground transition-colors hover:text-muted-foreground"
          >
            {portfolio.label} <span aria-hidden>↗</span>
          </Link>
        ) : null}

        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target={isExternal(social.url) ? "_blank" : undefined}
            rel={isExternal(social.url) ? "noopener noreferrer" : undefined}
            className="mono-label whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
          >
            {social.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
