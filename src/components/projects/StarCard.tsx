"use client";

import { useTranslations } from "next-intl";
import { Compass, ListChecks, Zap, Trophy, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type StarKind = "situation" | "task" | "action" | "result";

export const STAR_ICONS: Record<StarKind, LucideIcon> = {
  situation: Compass,
  task: ListChecks,
  action: Zap,
  result: Trophy,
};

/** Single Situation/Task/Action/Result card — the shared visual unit behind
 * both the data-driven StarFormat (project.star) and the MDX-authored
 * StarStory components, so both renderings stay visually identical. */
export function StarCard({ kind, children }: { kind: StarKind; children: ReactNode }) {
  const t = useTranslations("Projects");
  const Icon = STAR_ICONS[kind];

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {t(`star.${kind}`)}
        </span>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
