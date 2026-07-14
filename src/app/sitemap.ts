import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PROJECTS } from "@/data/projects";
import { getPageSlugs } from "@/lib/content";

const BASE_URL = "https://vitaliipopov.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const projectSlugs = getPageSlugs("projects");

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/skills",
    "/hire-me",
    "/education",
    "/recommendations",
    "/card",
    "/achievements",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    entries.push({
      url: `${BASE_URL}/en${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((locale) => [locale, `${BASE_URL}/${locale}${route}`])),
          "x-default": `${BASE_URL}/en${route}`,
        },
      },
    });
  }

  for (const slug of projectSlugs) {
    entries.push({
      url: `${BASE_URL}/en/projects/${slug}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((locale) => [locale, `${BASE_URL}/${locale}/projects/${slug}`])),
          "x-default": `${BASE_URL}/en/projects/${slug}`,
        },
      },
    });
  }

  // Projects with only data (no MDX file yet)
  for (const project of PROJECTS) {
    if (!projectSlugs.includes(project.slug)) {
      entries.push({
        url: `${BASE_URL}/en/projects/${project.slug}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((locale) => [locale, `${BASE_URL}/${locale}/projects/${project.slug}`])),
            "x-default": `${BASE_URL}/en/projects/${project.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
