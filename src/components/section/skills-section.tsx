import { SectionHeading } from "@/components/section-heading";
import { getPortfolioData } from "@/data/portfolio";
import type { SkillItem } from "@/data/schema";

function groupSkills(skills: SkillItem[]) {
  const groups = new Map<string, SkillItem[]>();

  for (const skill of skills) {
    const key = skill.group || "Skills";
    groups.set(key, [...(groups.get(key) ?? []), skill]);
  }

  return Array.from(groups.entries());
}

export default function SkillsSection() {
  const data = getPortfolioData();
  const groups = groupSkills(data.skills);

  return (
    <section className="mt-20 sm:mt-28">
      <SectionHeading
        title={data.portfolio.skills.title}
        description={data.portfolio.skills.description || undefined}
      />

      <div className="mt-8 border-t border-border/80">
        {groups.map(([group, skills]) => (
          <div
            key={group}
            className="grid gap-2 border-b border-border/80 py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8"
          >
            <h3 className="mono-label text-muted-foreground">{group}</h3>
            <p className="text-[14px] leading-relaxed text-foreground">
              {skills.map((skill) => skill.name).join(" / ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
