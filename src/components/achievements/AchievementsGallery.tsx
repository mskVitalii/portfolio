"use client";

import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import { useAchievementsStore } from "@/store/achievements";
import { ACHIEVEMENTS } from "@/data/achievements";
import { cn } from "@/lib/utils";

export function AchievementsGallery() {
  const unlocked = useAchievementsStore((s) => s.unlocked);
  const t = useTranslations("Achievements");
  const tPage = useTranslations("AchievementsPage");

  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked[a.id]).length;
  const total = ACHIEVEMENTS.length;
  const pct = Math.round((unlockedCount / total) * 100);

  return (
    <div>
      <div className="mb-8 rounded-xl border bg-muted/30 p-4">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="font-semibold">
            {tPage("progressLabel", { unlocked: unlockedCount, total })}
          </span>
          <span className="text-muted-foreground">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = !!unlocked[a.id];
          const ts = unlocked[a.id];
          const Icon = a.icon;
          return (
            <div
              key={a.id}
              className={cn(
                "flex items-start gap-3.5 rounded-xl border p-4 transition-all",
                isUnlocked ? "border-primary/40 bg-primary/5" : "border-border bg-muted/20 grayscale"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                  isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {isUnlocked ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
              </div>
              <div className="min-w-0">
                <p className={cn("text-sm font-semibold", !isUnlocked && "text-muted-foreground")}>
                  {t(`${a.id}.title`)}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {t(`${a.id}.description`)}
                </p>
                {isUnlocked && ts && (
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-primary/80">
                    {tPage("unlockedOn", { date: new Date(ts).toLocaleDateString() })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
