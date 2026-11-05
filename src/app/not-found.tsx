import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/data/portfolio";

export default function NotFound() {
  const { notFound } = getPortfolioData();

  return (
    <>
      <SiteHeader />

      <main
        id="content"
        tabIndex={-1}
        className="flex flex-1 flex-col justify-center py-20 sm:py-28"
      >
        <p className="mono-label text-muted-foreground">{notFound.code}</p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {notFound.title}
        </h1>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
          {notFound.description}
        </p>
        <Link
          href={notFound.cta.href}
          className="group mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
          />
          {notFound.cta.label}
        </Link>
      </main>

      <SiteFooter />
    </>
  );
}
