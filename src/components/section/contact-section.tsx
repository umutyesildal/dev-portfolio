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
    <section className="mt-20 border-t border-border/80 pt-8 sm:mt-32">
      <h2 className="max-w-[14ch] text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
        {data.portfolio.contact.title}
      </h2>

      {data.portfolio.contact.description ? (
        <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-muted-foreground">
          {data.portfolio.contact.description}
        </p>
      ) : null}

      <Link
        href={`mailto:${data.contact.email}`}
        className="mt-8 inline-block text-[clamp(1.25rem,2.8vw,1.75rem)] leading-none tracking-[-0.02em] underline decoration-muted-foreground/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-foreground"
      >
        {data.contact.email}
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
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
    </section>
  );
}
