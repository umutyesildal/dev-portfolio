import Link from "next/link";
import { getPortfolioData } from "@/data/portfolio";

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

export default function ContactSection() {
  const data = getPortfolioData();
  const socials = data.portfolio.contact.socials.flatMap((name) => {
    const social = data.contact.socials.find((item) => item.name === name);
    return social ? [social] : [];
  });

  return (
    <section className="mt-14 border-t border-border/80 pt-6 sm:mt-20">
      <h2 className="sr-only">Contact</h2>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between">
        <Link
          href={`mailto:${data.contact.email}`}
          className="w-fit text-[clamp(1.35rem,3vw,2rem)] leading-none tracking-[-0.02em] underline decoration-muted-foreground/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-foreground"
        >
          {data.contact.email}
        </Link>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {socials.map((social, index) => (
            <span key={social.name} className="flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden className="text-border">
                  /
                </span>
              ) : null}
              <Link
                href={social.url}
                target={isExternal(social.url) ? "_blank" : undefined}
                rel={isExternal(social.url) ? "noopener noreferrer" : undefined}
                className="mono-label text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {social.name}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
