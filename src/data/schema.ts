import { z } from "zod";

const text = z.string().min(1);
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex color");
const optionalAsset = z.string().default("");
const publicAsset = z
  .string()
  .startsWith("/")
  .refine((value) => !value.includes(".."), "Asset paths cannot contain '..'");

const iconName = z.enum([
  "email",
  "github",
  "globe",
  "home",
  "linkedin",
  "nextjs",
  "nodejs",
  "portfolio",
  "python",
  "react",
  "typescript",
  "x",
]);

const linkSchema = z.object({
  label: text,
  url: text,
  icon: iconName,
});

const sectionCopySchema = z.object({
  title: text,
  description: text,
});

export const portfolioSchema = z.object({
  site: z.object({
    name: text,
    initials: text,
    language: text,
    locale: text,
    url: z.string().url(),
    location: text,
    locationUrl: z.string().url(),
    description: text,
    summary: text,
    avatar: publicAsset,
  }),
  socialPreview: z.object({
    title: text,
    description: text,
    eyebrow: text,
    footer: text,
    imageAlt: text,
    avatar: publicAsset,
    colors: z.object({
      background: hexColor,
      card: hexColor,
      text: hexColor,
      mutedText: hexColor,
      border: hexColor,
      accent: hexColor,
      secondaryAccent: hexColor,
    }),
  }),
  navigation: z.array(
    z.object({
      label: text,
      href: text,
      icon: iconName,
    })
  ),
  home: z.object({
    eyebrow: text,
    headline: text,
    subheadline: text,
    featuredSocials: z.array(text),
    portfolioCta: z.object({
      label: text,
      href: text,
    }),
  }),
  notFound: z.object({
    code: text,
    title: text,
    description: text,
    cta: z.object({
      label: text,
      href: text,
    }),
  }),
  portfolio: z.object({
    metadataTitle: text,
    metadataDescription: text,
    label: text,
    headline: text,
    intro: text,
    headerSocials: z.array(text),
    experience: sectionCopySchema,
    education: sectionCopySchema,
    projects: z.object({
      label: text,
      title: text,
      description: text,
    }),
    earlierProjects: sectionCopySchema,
    skills: sectionCopySchema,
    contact: sectionCopySchema.extend({
      socials: z.array(text),
    }),
  }),
  contact: z.object({
    email: z.string().email(),
    socials: z.array(
      z.object({
        name: text,
        url: text,
        icon: iconName,
        navbar: z.boolean().default(false),
      })
    ),
  }),
  skills: z.array(
    z.object({
      name: text,
      icon: iconName.optional(),
    })
  ),
  work: z.array(
    z.object({
      company: text,
      url: z.string(),
      location: z.string(),
      title: text,
      logo: optionalAsset,
      start: text,
      end: text,
      description: text,
    })
  ),
  education: z.array(
    z.object({
      school: text,
      url: z.string().url(),
      degree: text,
      start: text,
      end: text,
      coursework: z.array(text).default([]),
    })
  ),
  projects: z.array(
    z.object({
      title: text,
      url: z.string(),
      date: text,
      description: text,
      technologies: z.array(text),
      links: z.array(linkSchema),
      image: optionalAsset,
      video: optionalAsset,
    })
  ),
  earlierProjects: z.array(
    z.object({
      title: text,
      url: text,
      date: text,
      technologies: z.array(text),
    })
  ),
  hackathons: z.array(
    z.object({
      title: text,
      date: text,
      location: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      links: z.array(linkSchema).optional(),
    })
  ),
}).superRefine((data, ctx) => {
  const socialNames = new Set(data.contact.socials.map((social) => social.name));
  const references = [
    { path: ["home", "featuredSocials"], names: data.home.featuredSocials },
    { path: ["portfolio", "headerSocials"], names: data.portfolio.headerSocials },
    {
      path: ["portfolio", "contact", "socials"],
      names: data.portfolio.contact.socials,
    },
  ];

  for (const reference of references) {
    for (const [index, name] of reference.names.entries()) {
      if (!socialNames.has(name)) {
        ctx.addIssue({
          code: "custom",
          message: `Unknown social reference: ${name}`,
          path: [...reference.path, index],
        });
      }
    }
  }

  const uniqueGroups = [
    {
      path: ["contact", "socials"],
      values: data.contact.socials.map((item) => item.name),
    },
    {
      path: ["work"],
      values: data.work.map((item) => `${item.company} — ${item.title}`),
    },
    { path: ["projects"], values: data.projects.map((item) => item.title) },
    {
      path: ["earlierProjects"],
      values: data.earlierProjects.map((item) => item.title),
    },
  ];

  for (const group of uniqueGroups) {
    const seen = new Set<string>();
    group.values.forEach((value, index) => {
      if (seen.has(value)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate entry: ${value}`,
          path: [...group.path, index],
        });
      }
      seen.add(value);
    });
  }
});

export type PortfolioData = z.infer<typeof portfolioSchema>;
export type WorkItem = PortfolioData["work"][number];
export type EducationItem = PortfolioData["education"][number];
export type ProjectItem = PortfolioData["projects"][number];
