"use client";

import { useTranslations, useLocale } from "next-intl";
import { Compass, ListChecks, Zap, Trophy } from "lucide-react";
import { localize } from "@/lib/localized";
import type { Project } from "@/data/projects";

const STEPS = [
  { key: "situation", icon: Compass },
  { key: "task", icon: ListChecks },
  { key: "action", icon: Zap },
  { key: "result", icon: Trophy },
] as const;

/** Explicit Situation/Task/Action/Result cards for HR-mode project stories —
 * a scannable alternative to a paragraph of prose. */
export function StarFormat({ star }: { star: NonNullable<Project["star"]> }) {
  const t = useTranslations("Projects");
  const locale = useLocale();

  return (
    <div className="grid gap-3 sm:grid-cols-2 mb-10">
      {STEPS.map(({ key, icon: Icon }) => (
        <div key={key} className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t(`star.${key}`)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {localize(star[key], locale)}
          </p>
        </div>
      ))}
    </div>
  );
}
