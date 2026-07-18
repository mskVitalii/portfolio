import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PROJECTS, EDUCATION_PROJECTS, type Project } from "@/data/projects";
import { COMPANY_BUNDLES, getCompanyBundle } from "@/data/companies";
import { BASE_URL, buildAlternates } from "@/lib/seo";

const STATIC_ROUTE_PRIORITIES: Record<string, number> = {
  "": 1.0,
  "/projects": 0.9,
  "/about": 0.8,
  "/skills": 0.8,
  "/hire-me": 0.8,
  "/education": 0.6,
  "/recommendations": 0.6,
  "/achievements": 0.6,
  "/card": 0.4,
};

// Labels (see `Project.impact[].label`) that represent a real, disclosed monetary
// figure or a measured business-metric change — as opposed to a technical/timing
// metric ("Search latency", "Deploy time") or an academic outcome ("Thesis grade",
// "Recognition", "Result") which aren't economics and are deliberately excluded.
const MONEY_LABEL = /savings|revenue|prize|growth/i;
const UPLIFT_LABEL = /uplift/i;
// Labels for real usage/adoption scale, ranked below direct money but above nothing.
const SCALE_LABEL = /users|active|installs|items indexed|tickets handled|sold/i;

/** Parses "€480K" / "€86K/yr" / "€1,000" into thousands-of-euros. Returns null for
 * anything without a €/$ symbol (e.g. ₽ figures) — deliberately not converted, since
 * asserting an FX rate here would fabricate a precision the source data doesn't have. */
function parseEuroThousands(value: string): number | null {
  const m = value.match(/[€$]\s*([\d.,]+)\s*(K|M)?/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ""));
  const suffix = m[2]?.toUpperCase();
  if (suffix === "K") return n;
  if (suffix === "M") return n * 1000;
  return n / 1000;
}

/**
 * Sitemap priority for a project, driven by its own disclosed business impact:
 *  0.9 — six-figure-plus € impact, or the flagship scale metric behind it (e.g. "200M" items)
 *  0.7 — a real € figure under that bar, any ₽ revenue figure, or a measured % uplift
 *  0.5 — a quantified usage/adoption metric (installs, users, tickets) with no money figure
 *  0.3 — no disclosed business outcome (academic grades/recognition don't count as economics)
 */
function projectPriority(project: Project): number {
  let hasFlagship = false;
  let hasModerateMoney = false;
  let hasScale = false;

  for (const { label, value } of project.impact ?? []) {
    const text = label.en;
    if (MONEY_LABEL.test(text)) {
      const eurK = parseEuroThousands(value);
      if (eurK !== null && eurK >= 50) hasFlagship = true;
      else hasModerateMoney = true;
    } else if (UPLIFT_LABEL.test(text)) {
      hasModerateMoney = true;
    } else if (SCALE_LABEL.test(text)) {
      hasScale = true;
      if (/\d+M\b/.test(value)) hasFlagship = true; // e.g. "200M" items indexed
    }
  }

  if (hasFlagship) return 0.9;
  if (hasModerateMoney) return 0.7;
  if (hasScale) return 0.5;
  return 0.3;
}

/** One `<url>` entry per locale for `path`, each carrying the full hreflang alternate
 * set (including itself, per Google's multi-locale sitemap guidance) — rather than a
 * single en-only entry with alternates bolted on, which under-represents the de/ru pages. */
function localizedEntries(path: string, priority: number): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    alternates: { languages: buildAlternates(locale, path).languages },
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of Object.keys(STATIC_ROUTE_PRIORITIES)) {
    entries.push(...localizedEntries(route, STATIC_ROUTE_PRIORITIES[route]));
  }

  const allProjects = [...PROJECTS, ...EDUCATION_PROJECTS];

  // Projects whose company has a merged case-study page 307-redirect away from their
  // standalone /projects/[slug] URL — excluded here since sitemaps shouldn't list
  // redirecting URLs; the case-study page below is their real, indexable destination.
  for (const project of allProjects) {
    if (!getCompanyBundle(project.company)) {
      entries.push(...localizedEntries(`/projects/${project.slug}`, projectPriority(project)));
    }
  }

  for (const bundle of COMPANY_BUNDLES) {
    const bundleProjects = allProjects.filter((p) => p.company === bundle.name);
    if (bundleProjects.length === 0) continue;
    // A bundle page's priority follows its single most economically significant
    // project — visiting the page surfaces all of them, anchored by the best one.
    const priority = Math.max(...bundleProjects.map(projectPriority));
    entries.push(...localizedEntries(`/projects/company/${bundle.slug}`, priority));
  }

  return entries;
}
