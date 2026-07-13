"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { X, Building2 } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectCategory } from "@/data/projects";

const SECTIONS: { id: string; category: ProjectCategory; titleKey: string }[] = [
  { id: "work", category: "work", titleKey: "sectionWork" },
  { id: "hackathons", category: "hackathon", titleKey: "sectionHackathons" },
  { id: "personal", category: "personal", titleKey: "sectionPersonal" },
];

// Sort key from a project's start date ("MM/YYYY [– MM/YYYY|present]") so the
// most recent — and presumably most relevant — work surfaces first.
function periodStartKey(period: string): number {
  const start = period.split(/\s*[–—-]\s*/)[0].trim();
  const match = start.match(/(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) * 12 + parseInt(match[1], 10);
  const year = start.match(/\d{4}/);
  return year ? parseInt(year[0], 10) * 12 : 0;
}

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const searchParams = useSearchParams();
  const router = useRouter();
  const companyFilter = searchParams.get("company");

  // The commercial-work section is the only one with a meaningful `company`
  // field, so a company deep-link (from the Impact Dashboard / brand cloud)
  // narrows that section and scrolls straight to it.
  useEffect(() => {
    if (companyFilter) {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [companyFilter]);

  const sections = SECTIONS.map((s) => ({
    ...s,
    projects: projects
      .filter(
        (p) =>
          p.category === s.category &&
          (s.id !== "work" || !companyFilter || p.company?.toLowerCase().includes(companyFilter.toLowerCase()))
      )
      .sort((a, b) => periodStartKey(b.period) - periodStartKey(a.period)),
  })).filter((s) => s.projects.length > 0);

  return (
    <div>
      {/* Anchor nav — jumps down the page to each section, never mixes categories together */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
          >
            {t(s.titleKey)}
            <span className="ml-1.5 text-xs opacity-60">{s.projects.length}</span>
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

      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-20 mb-16 last:mb-0">
          <h2 className="text-2xl font-bold mb-6">{t(s.titleKey)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {s.projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      ))}

      {sections.length === 0 && (
        <p className="text-muted-foreground text-center py-16">{t("noProjectsYet")}</p>
      )}
    </div>
  );
}
