"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, ChevronDown, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ModeAware } from "@/components/tri-mode/ModeAware";
import { CompanyBlurb } from "./CompanyBlurb";
import { getCompanyBundle } from "@/data/companies";
import { localize, formatImpactValue, formatPeriod } from "@/lib/localized";
import type { Project } from "@/data/projects";

// Same "MM/YYYY" comparison approach as ProjectsFilter's periodStartKey, kept
// local since it also needs to resolve the *end* of a range (incl. "present").
function periodKey(token: string): number {
  const match = token.match(/(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) * 12 + parseInt(match[1], 10);
  const year = token.match(/\d{4}/);
  return year ? parseInt(year[0], 10) * 12 : 0;
}

function formatPeriodRange(projects: Project[], presentLabel: string): string {
  const ranges = projects.map((p) => p.period.split(/\s*[–—-]\s*/).map((s) => s.trim()));
  const starts = ranges.map((r) => r[0]);
  const ends = ranges.map((r) => r[1] ?? r[0]);
  const hasPresent = ends.some((e) => e.toLowerCase() === "present");

  const earliestStart = starts.reduce((a, b) => (periodKey(a) < periodKey(b) ? a : b));
  if (hasPresent) return `${earliestStart} – ${presentLabel}`;

  const latestEnd = ends.reduce((a, b) => (periodKey(a) > periodKey(b) ? a : b));
  return earliestStart === latestEnd ? earliestStart : `${earliestStart} – ${latestEnd}`;
}

export function ProjectCompanyBundle({ company, projects }: { company: string; projects: Project[] }) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [expanded, setExpanded] = useState(true);

  const stack = Array.from(new Set(projects.flatMap((p) => p.stack))).slice(0, 6);
  const bundle = getCompanyBundle(company);

  return (
    <div
      id={bundle?.slug}
      className="sm:col-span-2 scroll-mt-20 rounded-xl border bg-card overflow-hidden hover:border-primary/50 transition-colors"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Building2 className="h-4 w-4 text-primary shrink-0" />
            <h3 className="font-semibold text-lg">{company}</h3>
            <Badge variant="outline" className="text-xs">
              {t("projectCount", { count: projects.length })}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{formatPeriodRange(projects, t("timelinePresent"))}</p>

          {bundle && <CompanyBlurb blurb={bundle.blurb} className="text-sm mb-3" />}

          {/* Raw tech-stack names are only meaningful to recruiters and engineers, not a business audience */}
          <ModeAware modes={["hr", "tech"]}>
            <div className="flex flex-wrap gap-1">
              {stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </ModeAware>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 mt-1 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border divide-y divide-border">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/company/${bundle?.slug ?? ""}#${project.slug}`}
                  className="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {localize(project.title, locale)}
                      </span>
                      <ProjectStatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{localize(project.tagline, locale)}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {project.impact && project.impact.length > 0 && (
                      <div className="hidden sm:flex flex-col items-end leading-tight">
                        <span className="text-sm font-bold text-primary">{formatImpactValue(project.impact[0].value, locale)}</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{localize(project.impact[0].label, locale)}</span>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground hidden sm:inline">{formatPeriod(project.period, t("timelinePresent"))}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
