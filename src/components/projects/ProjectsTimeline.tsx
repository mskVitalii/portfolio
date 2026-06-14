"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

const START_YEAR = 2020;

function getEndYear(): number {
  return new Date().getFullYear() + 1;
}

function parsePeriod(period: string): { start: number; end: number | null } {
  const parts = period.split(/\s*[–—\-]\s*/);
  if (parts.length === 2) {
    const start = parseInt(parts[0].trim());
    const endPart = parts[1].trim().toLowerCase();
    return { start, end: endPart === "present" ? null : parseInt(endPart) };
  }
  const year = parseInt(period.trim());
  return { start: year, end: year };
}

function groupByCompany(projects: Project[]) {
  const map = new Map<string, Project[]>();
  for (const p of projects) {
    const key = p.company ?? "Personal";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return [...map.entries()]
    .map(([company, ps]) => ({ company, projects: ps }))
    .sort((a, b) => {
      const minA = Math.min(...a.projects.map((p) => parsePeriod(p.period).start));
      const minB = Math.min(...b.projects.map((p) => parsePeriod(p.period).start));
      return minA - minB;
    });
}

const CATEGORY_BAR: Record<string, string> = {
  work: "bg-primary text-primary-foreground",
  education: "bg-violet-500 text-white dark:bg-violet-400 dark:text-white",
  hackathon: "bg-amber-500 text-white",
  personal: "bg-emerald-500 text-white",
};

export function ProjectsTimeline({ projects }: { projects: Project[] }) {
  const END = getEndYear();
  const SPAN = END - START_YEAR;

  const now = new Date();
  const nowDecimal = now.getFullYear() + (now.getMonth() + 1) / 12;
  const nowPct = ((nowDecimal - START_YEAR) / SPAN) * 100;

  const years = Array.from({ length: SPAN }, (_, i) => START_YEAR + i);
  const groups = groupByCompany(projects);

  function toPct(year: number): number {
    return ((year - START_YEAR) / SPAN) * 100;
  }

  function getBarStyle(period: string): CSSProperties {
    const { start, end } = parsePeriod(period);
    const endDecimal = end !== null ? end + 1 : nowDecimal;
    return {
      left: `${toPct(start)}%`,
      width: `${((endDecimal - start) / SPAN) * 100}%`,
    };
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="min-w-[560px]">
        {/* Year header row */}
        <div className="flex items-end mb-3">
          <div className="w-44 shrink-0" />
          <div className="relative flex-1 h-7">
            {years.map((y) => (
              <span
                key={y}
                className="absolute bottom-0 text-[11px] text-muted-foreground font-medium select-none -translate-x-1/2"
                style={{ left: `${toPct(y)}%` }}
              >
                {y}
              </span>
            ))}
            <span
              className="absolute bottom-0 text-[10px] text-primary font-semibold select-none -translate-x-1/2"
              style={{ left: `${nowPct}%` }}
            >
              now
            </span>
          </div>
        </div>

        {/* Groups */}
        {groups.map(({ company, projects: gps }) => (
          <div key={company} className="mb-5">
            {/* Company header */}
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap shrink-0 pl-1">
                {company}
              </span>
              <div className="flex-1 border-t border-dashed border-border" />
            </div>

            {/* Project rows */}
            {gps.map((project, i) => {
              const { end } = parsePeriod(project.period);
              const isOngoing = end === null;
              const barCls = CATEGORY_BAR[project.category] ?? CATEGORY_BAR.work;

              return (
                <div key={project.slug} className="flex items-center h-11 group">
                  {/* Label */}
                  <div className="w-44 shrink-0 pr-3">
                    <p className="text-sm font-medium text-foreground truncate leading-tight">
                      {project.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                      {project.period}
                    </p>
                  </div>

                  {/* Track */}
                  <div className="relative flex-1 h-full">
                    {/* Year grid lines */}
                    {years.map((y) => (
                      <div
                        key={y}
                        className="absolute inset-y-0 w-px bg-border/50"
                        style={{ left: `${toPct(y)}%` }}
                      />
                    ))}

                    {/* Today indicator */}
                    <div
                      className="absolute inset-y-0 w-0.5 bg-primary/25 z-10"
                      style={{ left: `${nowPct}%` }}
                    />

                    {/* Gantt bar */}
                    <motion.div
                      className={`absolute top-2 bottom-2 rounded flex items-center px-2.5 cursor-default overflow-hidden ${barCls}`}
                      style={{
                        ...getBarStyle(project.period),
                        transformOrigin: "left center",
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      title={project.tagline}
                    >
                      <span className="text-[11px] font-medium truncate">
                        {project.title}
                      </span>
                      {isOngoing && (
                        <span className="ml-1 shrink-0 text-[10px] opacity-75">▸</span>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
