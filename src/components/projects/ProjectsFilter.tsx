"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { X, Building2 } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectCompanyBundle } from "./ProjectCompanyBundle";
import { useViewMode } from "@/store/viewMode";
import type { Project, ProjectCategory } from "@/data/projects";

const SECTIONS: { id: string; category: ProjectCategory; titleKey: string }[] = [
  { id: "work", category: "work", titleKey: "sectionWork" },
  { id: "hackathons", category: "hackathon", titleKey: "sectionHackathons" },
  { id: "freelance", category: "freelance", titleKey: "sectionFreelance" },
  { id: "personal", category: "personal", titleKey: "sectionPersonal" },
];

// Companies with several conceptually-linked projects read better as a single
// expandable bundle than as separate cards scattered across the work grid.
const BUNDLE_COMPANIES = [
  "Infineon Technologies AG",
  "OZON Tech",
  "onlineTours",
  "egsha",
  "WeDo.agency",
  "dunlimited",
  "Yohan Loshop (own studio)",
];

// Sort key from a project's *end* date ("MM/YYYY [– MM/YYYY|present]") so
// recently-finished (or ongoing) work surfaces first — a project that ran
// 2018-2023 reads as more recent than one that started later but wrapped
// earlier, which a start-date sort would get backwards.
function periodEndKey(period: string): number {
  const parts = period.split(/\s*[–—-]\s*/);
  const endToken = (parts[1] ?? parts[0]).trim();
  if (endToken.toLowerCase() === "present") return Infinity;
  const match = endToken.match(/(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) * 12 + parseInt(match[1], 10);
  const year = endToken.match(/\d{4}/);
  return year ? parseInt(year[0], 10) * 12 : 0;
}

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const companyFilter = searchParams.get("company");
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

  // The commercial-work section is the only one with a meaningful `company`
  // field, so a company deep-link (from the Impact Dashboard / brand cloud)
  // narrows that section and scrolls straight to it.
  useEffect(() => {
    if (companyFilter) {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [companyFilter]);

  const workProjects = projects.filter(
    (p) =>
      p.category === "work" &&
      (!companyFilter || p.company?.toLowerCase().includes(companyFilter.toLowerCase()))
  );
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

      {/* Company filter banner */}
      {companyFilter && (
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary/8 border border-primary/25 text-sm">
            <Building2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">{t("companyLabel")}</span>
            <span className="font-semibold text-primary">{companyFilter}</span>
            <button
              onClick={() => router.push("/projects")}
              aria-label={t("clearCompanyFilter")}
              className="ml-1 rounded-full p-0.5 hover:bg-primary/15 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>
      )}

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
