import Image from "next/image";
import Link from "next/link";
import { getPortfolioData } from "@/data/portfolio";

export default function HomePage() {
  const data = getPortfolioData();
  const featuredSocials = data.home.featuredSocials.flatMap((name) => {
    const social = data.contact.socials.find((item) => item.name === name);
    return social ? [social] : [];
  });

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center">
      <section className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {data.home.eyebrow}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl leading-none tracking-[-0.06em] sm:text-6xl lg:text-7xl [font-family:var(--font-display)]">
                {data.site.name}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-foreground sm:text-xl">
                {data.home.headline}
              </p>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {data.home.subheadline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {featuredSocials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="rounded-full border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent"
                >
                  {social.name}
                </Link>
            ))}
            <Link
              href={data.home.portfolioCta.href}
              className="rounded-full bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
            >
              {data.home.portfolioCta.label}
            </Link>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-6 rounded-[2rem] bg-[linear-gradient(135deg,rgba(186,225,110,0.22),rgba(255,214,167,0.18))] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 p-4 shadow-[0_24px_80px_-40px_rgba(60,72,40,0.38)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-[#f3f0e7] p-3">
                <Image
                  src={data.site.avatar}
                  alt={data.site.name}
                  width={960}
                  height={960}
                  priority
                  className="aspect-square h-auto w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
