import { z } from "zod";

const text = z.string().min(1);
const optionalText = z
  .string()
  .nullish()
  .transform((value) => value ?? "");

const isSafeUrl = (value: string) =>
  /^(https?:\/\/|mailto:|tel:|\/)/.test(value);

const urlText = z
  .string()
  .refine(isSafeUrl, "Use an https, http, mailto, tel, or root-relative URL");

const optionalUrl = z
  .string()
  .nullish()
  .transform((value) => value ?? "")
  .refine(
    (value) => value === "" || isSafeUrl(value),
    "Use an https, http, mailto, tel, or root-relative URL"
  );

const optionalAsset = z
  .string()
  .nullish()
  .transform((value) => value ?? "")
  .refine(
    (value) => value === "" || (value.startsWith("/") && !value.includes("..")),
    "Asset paths must be root-relative and cannot contain '..'"
  );

const publicAsset = z
  .string()
  .startsWith("/")
  .refine((value) => !value.includes(".."), "Asset paths cannot contain '..'");

const linkSchema = z.object({
  label: text,
  url: urlText,
});

const sectionCopySchema = z.object({
  title: text,
  description: optionalText,
});

export const portfolioSchema = z
  .object({
    site: z.object({
      name: text,
      initials: text,
      language: text,
      locale: text,
      url: z.string().url(),
      location: text,
      locationUrl: urlText,
      description: text,
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
        background: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        card: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        text: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        mutedText: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        border: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        secondaryAccent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      }),
    }),
    navigation: z.array(
      z.object({
        label: text,
        href: text,
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
      headline: text,
      intro: text,
      headerSocials: z.array(text),
      experience: sectionCopySchema,
      education: sectionCopySchema,
      projects: z.object({
        title: text,
        description: optionalText,
      }),
      openSource: sectionCopySchema,
      earlierProjects: sectionCopySchema,
    }),
    contact: z.object({
      email: z.string().email(),
      socials: z.array(
        z.object({
          name: text,
          url: urlText,
        })
      ),
    }),
    work: z.array(
      z.object({
        company: text,
        url: optionalUrl,
        location: optionalText,
        title: text,
        shortTitle: optionalText,
        start: text,
        end: text,
        description: text,
      })
    ),
    education: z.array(
      z.object({
        school: text,
        url: optionalUrl,
        degree: text,
        start: text,
        end: text,
        coursework: z.array(text).default([]),
      })
    ),
    projects: z.array(
      z.object({
        title: text,
        url: optionalUrl,
        date: text,
        metric: optionalText,
        description: text,
        technologies: z.array(text),
        links: z.array(linkSchema),
        image: optionalAsset,
      })
    ),
    openSource: z
      .array(
        z.object({
          title: text,
          description: text,
          url: urlText,
          date: text,
        })
      )
      .default([]),
    earlierProjects: z.array(
      z.object({
        title: text,
        url: urlText,
        date: text,
        technologies: z.array(text),
      })
    ),
  })
  .superRefine((data, ctx) => {
    const socialNames = new Set(
      data.contact.socials.map((social) => social.name)
    );
    const references = [
      { path: ["home", "featuredSocials"], names: data.home.featuredSocials },
      {
        path: ["portfolio", "headerSocials"],
        names: data.portfolio.headerSocials,
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
        values: data.work.map((item) => `${item.company} / ${item.title}`),
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
