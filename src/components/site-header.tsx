import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
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
  const socialNames =
    variant === "home"
      ? data.home.featuredSocials
      : data.portfolio.headerSocials;
  const socials = socialNames.flatMap((name) => {
    const social = data.contact.socials.find((item) => item.name === name);
    return social ? [social] : [];
  });
  const homeLabel =
    data.navigation.find((item) => item.href === "/")?.label ?? "Home";

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

      <nav aria-label="Social links" className="flex items-center gap-4 sm:gap-5">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target={isExternal(social.url) ? "_blank" : undefined}
            rel={isExternal(social.url) ? "noopener noreferrer" : undefined}
            aria-label={social.name}
            title={social.name}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <SocialIcon name={social.name} className="size-4" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
