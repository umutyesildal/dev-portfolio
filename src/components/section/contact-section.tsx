import Link from "next/link";
import { getPortfolioData } from "@/data/portfolio";

export default function ContactSection() {
  const data = getPortfolioData();

  return (
    <section className="mt-14 border-t border-border/80 pt-6 sm:mt-20">
      <h2 className="sr-only">Contact</h2>
      <Link
        href={`mailto:${data.contact.email}`}
        className="w-fit text-[clamp(1.35rem,3vw,2rem)] leading-none tracking-[-0.02em] underline decoration-muted-foreground/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-foreground"
      >
        {data.contact.email}
      </Link>
    </section>
  );
}
