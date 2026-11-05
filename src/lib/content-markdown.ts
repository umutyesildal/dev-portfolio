import type { PortfolioData } from "@/data/schema";

function siteUrl(data: PortfolioData, path: string) {
  return new URL(path, data.site.url).toString();
}

function plain(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function dateRange(start: string, end: string) {
  return `${start} – ${end}`;
}

export function homeMarkdown(data: PortfolioData) {
  return [
    `# ${data.site.name}`,
    "",
    data.home.headline,
    "",
    data.home.subheadline,
    "",
    "## Links",
    "",
    `- Portfolio: ${siteUrl(data, "/portfolio")}`,
    ...data.contact.socials.map((social) => `- ${social.name}: ${social.url}`),
    "",
  ].join("\n");
}

export function portfolioMarkdown(data: PortfolioData) {
  const lines: string[] = [
    `# ${data.portfolio.headline}`,
    "",
    data.portfolio.intro,
    "",
    "## Experience",
    "",
  ];

  for (const job of data.work) {
    lines.push(`### ${job.company}`, "");
    lines.push(
      `${job.title}${job.location ? ` · ${job.location}` : ""} · ${dateRange(
        job.start,
        job.end
      )}`,
      "",
      job.description,
      ""
    );
  }

  lines.push("## Education", "");
  for (const item of data.education) {
    lines.push(`### ${item.school}`, "");
    lines.push(`${item.degree} · ${dateRange(item.start, item.end)}`, "");
    if (item.coursework.length > 0) {
      lines.push(`Coursework: ${item.coursework.join(", ")}`, "");
    }
  }

  lines.push("## Selected work", "");
  for (const project of data.projects) {
    lines.push(`### ${project.title}`, "");
    lines.push(
      `${project.date}${project.metric ? ` · ${project.metric}` : ""}`,
      "",
      project.description,
      "",
      `Technologies: ${project.technologies.join(", ")}`
    );
    if (project.links.length > 0) {
      lines.push(
        `Links: ${project.links
          .map((link) => `[${link.label}](${link.url})`)
          .join(", ")}`
      );
    }
    lines.push("");
  }

  if (data.openSource.length > 0) {
    lines.push("## Open source", "");
    for (const project of data.openSource) {
      lines.push(
        `### ${project.title}`,
        "",
        project.description,
        "",
        `${project.date} · ${project.url}`,
        ""
      );
    }
  }

  if (data.earlierProjects.length > 0) {
    lines.push("## Earlier work", "");
    for (const project of data.earlierProjects) {
      lines.push(
        `### ${project.title}`,
        "",
        `${project.date} · ${project.technologies.join(", ")}`,
        "",
        project.url,
        ""
      );
    }
  }

  lines.push(
    "## Contact",
    "",
    `Email: ${data.contact.email}`,
    ...data.contact.socials.map((social) => `${social.name}: ${social.url}`),
    ""
  );

  return lines.join("\n");
}

export function llmsTxt(data: PortfolioData) {
  const projects = data.projects.map((project) => {
    const href = project.url || siteUrl(data, "/portfolio");
    return `- [${project.title}](${href}): ${plain(project.description)}`;
  });

  const openSource = data.openSource.map(
    (project) => `- [${project.title}](${project.url}): ${plain(project.description)}`
  );

  return [
    `# ${data.site.name}`,
    "",
    `> ${data.site.description}`,
    "",
    data.home.headline,
    "",
    "## Pages",
    "",
    `- [Home](${data.site.url}): ${plain(data.home.subheadline)}`,
    `- [Portfolio](${siteUrl(data, "/portfolio")}): ${plain(
      data.portfolio.intro
    )}`,
    `- [Portfolio Markdown](${siteUrl(data, "/portfolio.md")})`,
    `- [Full content](${siteUrl(data, "/llms-full.txt")})`,
    `- [Content JSON](${siteUrl(data, "/api/portfolio.json")})`,
    `- [JSON Schema](${siteUrl(data, "/api/schema.json")})`,
    `- [Agent manifest](${siteUrl(data, "/agents.json")})`,
    ...(data.site.repository ? [`- [Source](${data.site.repository})`] : []),
    "",
    "## Selected work",
    "",
    ...projects,
    "",
    ...(openSource.length > 0
      ? ["## Open source", "", ...openSource, ""]
      : []),
    "## Contact",
    "",
    `- Email: ${data.contact.email}`,
    ...data.contact.socials.map((social) => `- ${social.name}: ${social.url}`),
    "",
  ].join("\n");
}

export function llmsFullTxt(data: PortfolioData) {
  return [
    `# ${data.site.name}`,
    "",
    `> ${data.site.description}`,
    "",
    homeMarkdown(data),
    "",
    "---",
    "",
    portfolioMarkdown(data),
  ].join("\n");
}
