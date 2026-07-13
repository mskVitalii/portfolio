"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAchievementsStore } from "@/store/achievements";
import { SKILLS, CATEGORY_LABELS, CATEGORY_COLORS, LEVEL_LABELS, type SkillCategory } from "@/data/skills";

const CATEGORIES = ["backend", "frontend", "infrastructure", "ai"] as const;
const MATCH_ACHIEVEMENT_THRESHOLD = 3;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchSkillIds(text: string): Set<string> {
  if (!text.trim()) return new Set();
  const matched = new Set<string>();
  for (const skill of SKILLS) {
    const pattern = new RegExp(`\\b${escapeRegExp(skill.name)}\\b`, "i");
    if (pattern.test(text)) matched.add(skill.id);
  }
  return matched;
}

export function SkillsKeywordMatcher() {
  const t = useTranslations("SkillsPage");
  const [text, setText] = useState("");
  const unlockAchievement = useAchievementsStore((s) => s.unlock);

  const matchedIds = useMemo(() => matchSkillIds(text), [text]);
  const hasInput = text.trim().length > 0;

  useEffect(() => {
    if (matchedIds.size >= MATCH_ACHIEVEMENT_THRESHOLD) unlockAchievement("skillsMatch");
  }, [matchedIds, unlockAchievement]);

  return (
    <div>
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">{t("matcherTitle")}</h2>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("matcherPlaceholder")}
          className="min-h-24"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {hasInput
            ? t("matcherSummary", { matched: matchedIds.size, total: SKILLS.length })
            : t("matcherEmpty")}
        </p>
      </div>

      {/* List view below graph — matched skills are highlighted when text is entered */}
      <div className="mt-8 grid sm:grid-cols-2 gap-8">
        {CATEGORIES.map((cat) => {
          const catSkills = SKILLS.filter(
            (s) => s.category === cat || (cat === "backend" && s.category === "languages")
          );
          if (catSkills.length === 0) return null;
          return (
            <div key={cat}>
              <h3
                className="font-semibold mb-4 text-sm uppercase tracking-wider"
                style={{ color: CATEGORY_COLORS[cat as SkillCategory] }}
              >
                {CATEGORY_LABELS[cat as SkillCategory]}
              </h3>
              <div className="space-y-2">
                {catSkills.map((skill) => {
                  const isMatched = matchedIds.has(skill.id);
                  return (
                    <div
                      key={skill.id}
                      className={cn(
                        "flex items-center justify-between py-2 px-2 -mx-2 rounded-md border-b border-border/50 last:border-0 transition-colors",
                        hasInput && isMatched && "bg-primary/10 ring-1 ring-primary/40",
                        hasInput && !isMatched && "opacity-40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.years}y</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {LEVEL_LABELS[skill.level]}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
