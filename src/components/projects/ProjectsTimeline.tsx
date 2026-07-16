"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { localize } from "@/lib/localized";
import type { Project } from "@/data/projects";

const START_YEAR = 2020;

function getEndYear(): number {
  return new Date().getFullYear() + 1;
}

// "MM/YYYY" -> decimal year (e.g. "09/2024" -> 2024.667), so bars position by
// month, not just year. A bare year ("2020") still parses via the fallback.
function parseToken(token: string): number {
  const match = token.trim().match(/(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) + (parseInt(match[1], 10) - 1) / 12;
  const year = token.match(/\d{4}/);
  return year ? parseInt(year[0], 10) : 0;
}

function parsePeriod(period: string): { start: number; end: number | null } {
  const parts = period.split(/\s*[–—-]\s*/);
  if (parts.length === 2) {
    const endToken = parts[1].trim().toLowerCase();
    return { start: parseToken(parts[0]), end: endToken === "present" ? null : parseToken(parts[1]) };
  }
  const value = parseToken(period);
  return { start: value, end: value };
}

// Original "MM/YYYY" text of a period's start/end, kept alongside the decimal
// value above so group labels can show real dates rather than rounded years.
function periodTokens(period: string): { startText: string; endText: string | null } {
  const parts = period.split(/\s*[–—-]\s*/);
  if (parts.length === 2) {
    const endToken = parts[1].trim();
    return { startText: parts[0].trim(), endText: endToken.toLowerCase() === "present" ? null : endToken };
  }
  return { startText: period.trim(), endText: period.trim() };
}

interface CompanyGroup {
  company: string;
  projects: Project[];
  start: number;
  end: number | null;
  startText: string;
  endText: string | null;
}

function groupByCompany(projects: Project[]): CompanyGroup[] {
  const map = new Map<string, Project[]>();
  for (const p of projects) {
    const key = p.company ?? "Personal";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return [...map.entries()]
    .map(([company, ps]): CompanyGroup => {
      let start = Infinity;
      let end: number | null = -Infinity;
      let startText = "";
      let endText: string | null = "";

      for (const p of ps) {
        const parsed = parsePeriod(p.period);
        const tokens = periodTokens(p.period);
        if (parsed.start < start) {
          start = parsed.start;
          startText = tokens.startText;
        }
        if (end !== null) {
          if (parsed.end === null) {
            end = null;
            endText = null;
          } else if (parsed.end > end) {
            end = parsed.end;
            endText = tokens.endText;
          }
        }
      }

      return { company, projects: ps, start, end, startText, endText: endText ?? null };
    })
    .sort((a, b) => a.start - b.start);
}

const CATEGORY_BAR: Record<string, string> = {
  work: "bg-primary text-primary-foreground",
  hackathon: "bg-amber-500 text-white",
  personal: "bg-emerald-500 text-white",
};

export function ProjectsTimeline({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const END = getEndYear();
  const SPAN = END - START_YEAR;

  const now = new Date();
  const nowDecimal = now.getFullYear() + (now.getMonth() + 1) / 12;
  const nowPct = ((nowDecimal - START_YEAR) / SPAN) * 100;

  const years = Array.from({ length: SPAN }, (_, i) => START_YEAR + i);
  // University stints (HSE, TU Chemnitz) clutter a company/employer timeline —
  // keep this view scoped to work, personal and hackathon history.
  const groups = groupByCompany(projects.filter((p) => p.category !== "education"));

  function toPct(year: number): number {
    return ((year - START_YEAR) / SPAN) * 100;
  }

  function getBarStyle(start: number, end: number | null): CSSProperties {
    const endDecimal = end ?? nowDecimal;
    // Clamp to the visible window: a raw negative `left` (a group that started
    // before START_YEAR) would still paint on top of the row's own label,
    // since the absolutely-positioned bar stacks above the static label div
    // regardless of DOM order.
    const left = Math.max(0, toPct(start));
    const right = Math.min(100, toPct(endDecimal));
    return {
      left: `${left}%`,
      width: `${Math.max(right - left, 0.5)}%`,
    };
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="min-w-140">
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
              {t("timelineNow")}
            </span>
          </div>
        </div>

        {/* One aggregate row per company/employer — enough to read six years
            of history at a glance, instead of one row per individual project. */}
        {groups.map((group, i) => {
          const isOngoing = group.end === null;
          // A named company (even a one-person studio like "Yohan Loshop") reads
          // as a company row and gets the work color, not its projects' category
          // color — only the true company-less "Personal" bucket falls back to that.
          const barCls =
            group.company === "Personal"
              ? (CATEGORY_BAR[group.projects[0].category] ?? CATEGORY_BAR.personal)
              : CATEGORY_BAR.work;
          const periodLabel = group.endText
            ? `${group.startText} – ${group.endText}`
            : `${group.startText} – ${t("timelinePresent")}`;
          const tooltip = group.projects
            .map((p) => `${localize(p.title, locale)} (${p.period})`)
            .join("\n");

          return (
            <div key={group.company} className="flex items-center h-14 group">
              {/* Label */}
              <div className="w-44 shrink-0 pr-3">
                <p className="text-sm font-semibold text-foreground truncate leading-tight">
                  {group.company}
                </p>
                <p className="text-[11px] text-muted-foreground/70 mt-0.5 truncate">
                  {periodLabel} · {t("projectCount", { count: group.projects.length })}
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
                  className={`absolute top-2.5 bottom-2.5 rounded flex items-center px-2.5 cursor-default overflow-hidden ${barCls}`}
                  style={{
                    ...getBarStyle(group.start, group.end),
                    transformOrigin: "left center",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  title={tooltip}
                >
                  <span className="text-[11px] font-medium truncate">{group.company}</span>
                  {isOngoing && <span className="ml-1 shrink-0 text-[10px] opacity-75">▸</span>}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
