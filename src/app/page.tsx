import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const enter = (delay: number) =>
  ({ "--enter-delay": `${delay}ms` }) as React.CSSProperties;

export default function HomePage() {
  const data = getPortfolioData();
  const socials = data.home.featuredSocials.flatMap((name) => {
    const social = data.contact.socials.find((item) => item.name === name);
    return social ? [social] : [];
  });

  return (
    <>
      <SiteHeader />

      <main
        id="content"
        tabIndex={-1}
        className="flex flex-1 flex-col justify-center py-12 sm:py-16 lg:py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1
              data-enter
              style={enter(0)}
              className="max-w-[15ch] text-[clamp(2.9rem,7.2vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.04em]"
            >
              {data.site.name}
            </h1>

            <p
              data-enter
              style={enter(60)}
              className="mt-6 max-w-[32ch] text-[19px] leading-[1.4] tracking-[-0.015em] text-foreground sm:text-[22px]"
            >
              {data.home.headline}
            </p>

            <p
              data-enter
              style={enter(100)}
              className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground"
            >
              {data.home.subheadline}
            </p>

            <div
              data-enter
              style={enter(150)}
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                href={data.home.portfolioCta.href}
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {data.home.portfolioCta.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                />
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
                      target={
                        social.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mono-label text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {social.name}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:mr-0">
              <div className="rounded-2xl border border-border bg-card p-2 shadow-[0_18px_40px_-28px_rgba(33,34,20,0.38)]">
                <div className="overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={data.site.avatar}
                    alt={`Portrait of ${data.site.name}`}
                    width={960}
                    height={960}
                    priority
                    sizes="(max-width: 640px) 300px, 340px"
                    className="aspect-square h-auto w-full object-cover"
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
