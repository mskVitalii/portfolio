"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./ProjectCard";
import { ProjectCompanyBundle } from "./ProjectCompanyBundle";
import { useViewMode } from "@/store/viewMode";
import { periodEndKey, type Project, type ProjectCategory } from "@/data/projects";
import { COMPANY_BUNDLES } from "@/data/companies";

const SECTIONS: { id: string; category: ProjectCategory; titleKey: string }[] = [
  { id: "work", category: "work", titleKey: "sectionWork" },
  { id: "hackathons", category: "hackathon", titleKey: "sectionHackathons" },
  { id: "freelance", category: "freelance", titleKey: "sectionFreelance" },
  { id: "personal", category: "personal", titleKey: "sectionPersonal" },
];

// Companies with several conceptually-linked projects read better as a single
// expandable bundle than as separate cards scattered across the work grid.
const BUNDLE_COMPANIES = COMPANY_BUNDLES.map((b) => b.name);

// Rough, ordering-only currency normalization — good enough to rank a €480K/yr
// corporate saving above a ₽15,000 freelance gig, not a financial calculation.
const CURRENCY_TO_EUR: Record<string, number> = { "€": 1, "$": 0.9, "₽": 1 / 90 };

// The "business" lens sorts by financial outcome rather than by date. Only the
// first impact metric that looks monetary counts — percentages, counts, and
// timings ("11.63%", "8,000 users", "<5 sec") aren't comparable to revenue,
// so projects without a monetary headline metric simply sort last.
function profitScore(project: Project): number {
  const value = project.impact?.[0]?.value;
  if (!value) return 0;
  const match = value.match(/^([€$₽])\s?([\d,.]+)\s?(K|M)?/i);
  if (!match) return 0;
  const [, currency, rawNumber, suffix] = match;
  const number = parseFloat(rawNumber.replace(/,/g, ""));
  if (Number.isNaN(number)) return 0;
  const multiplier = suffix?.toUpperCase() === "M" ? 1_000_000 : suffix?.toUpperCase() === "K" ? 1_000 : 1;
  return number * multiplier * (CURRENCY_TO_EUR[currency] ?? 0);
}

type WorkEntry =
  | { kind: "project"; sortKey: number; profitKey: number; project: Project }
  | { kind: "bundle"; sortKey: number; profitKey: number; company: string; projects: Project[] };

function buildWorkEntries(workProjects: Project[]): WorkEntry[] {
  const byCompany = new Map<string, Project[]>();
  const singles: Project[] = [];

  for (const p of workProjects) {
    if (p.company && BUNDLE_COMPANIES.includes(p.company)) {
      if (!byCompany.has(p.company)) byCompany.set(p.company, []);
      byCompany.get(p.company)!.push(p);
    } else {
      singles.push(p);
    }
  }

  const entries: WorkEntry[] = [
    ...singles.map((project): WorkEntry => ({
      kind: "project",
      sortKey: periodEndKey(project.period),
      profitKey: profitScore(project),
      project,
    })),
    ...[...byCompany.entries()].map(([company, ps]): WorkEntry => {
      const sorted = [...ps].sort((a, b) => periodEndKey(b.period) - periodEndKey(a.period));
      return {
        kind: "bundle",
        sortKey: periodEndKey(sorted[0].period),
        profitKey: Math.max(...sorted.map(profitScore)),
        company,
        projects: sorted,
      };
    }),
  ];

  return entries;
}

function sortEntries(entries: WorkEntry[], businessMode: boolean): WorkEntry[] {
  return [...entries].sort((a, b) =>
    businessMode ? b.profitKey - a.profitKey || b.sortKey - a.sortKey : b.sortKey - a.sortKey
  );
}

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const { mode } = useViewMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const businessMode = mounted && mode === "business";
  // Hackathon entries carry no business/economic outcome — noise for the
  // Business lens, so hide that section entirely once we know the real mode.
  const hideHackathons = businessMode;
  // The Business lens cares about paid engagements, not unpaid side projects —
  // show Freelance (which all earned real revenue) instead of Personal there.
  const hidePersonal = businessMode;

  const workProjects = projects.filter((p) => p.category === "work");
  const workEntries = sortEntries(buildWorkEntries(workProjects), businessMode);

  const otherSections = SECTIONS.filter(
    (s) =>
      s.id !== "work" &&
      !(hideHackathons && s.id === "hackathons") &&
      !(hidePersonal && s.id === "personal")
  ).map((s) => ({
    ...s,
    projects: projects
      .filter((p) => p.category === s.category)
      .sort((a, b) =>
        businessMode
          ? profitScore(b) - profitScore(a) || periodEndKey(b.period) - periodEndKey(a.period)
          : periodEndKey(b.period) - periodEndKey(a.period)
      ),
  })).filter((s) => s.projects.length > 0);

  const navSections = [
    ...(workProjects.length > 0 ? [{ id: "work", titleKey: "sectionWork", count: workProjects.length }] : []),
    ...otherSections.map((s) => ({ id: s.id, titleKey: s.titleKey, count: s.projects.length })),
  ];

  return (
    <div>
      {/* Anchor nav — jumps down the page to each section, never mixes categories together */}
      <div className="flex flex-wrap gap-2 mb-8">
        {navSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
          >
            {t(s.titleKey)}
            <span className="ml-1.5 text-xs opacity-60">{s.count}</span>
          </a>
        ))}
      </div>

      {workEntries.length > 0 && (
        <section id="work" className="scroll-mt-20 mb-16 last:mb-0">
          <h2 className="text-2xl font-bold mb-6">{t("sectionWork")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {workEntries.map((entry, i) =>
              entry.kind === "bundle" ? (
                <ProjectCompanyBundle key={entry.company} company={entry.company} projects={entry.projects} />
              ) : (
                <ProjectCard key={entry.project.slug} project={entry.project} index={i} />
              )
            )}
          </div>
        </section>
      )}

      {otherSections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-20 mb-16 last:mb-0">
          <h2 className="text-2xl font-bold mb-6">{t(s.titleKey)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {s.projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      ))}

      {navSections.length === 0 && (
        <p className="text-muted-foreground text-center py-16">{t("noProjectsYet")}</p>
      )}
    </div>
  );
}
