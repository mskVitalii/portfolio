"use client";

import dynamic from "next/dynamic";
import { useViewMode } from "@/store/viewMode";
import { SkillsKeywordMatcher } from "@/components/skills/SkillsKeywordMatcher";
import { SkillsSwitchModePrompt } from "@/components/skills/SkillsSwitchModePrompt";
import { SkillsHrCopyButton } from "@/components/skills/SkillsHrCopyButton";

// React Flow is a sizeable interactive-only dependency — defer it out of the
// initial /skills bundle instead of loading it eagerly for every visitor.
const SkillsExplorer = dynamic(
  () => import("@/components/skills/SkillsExplorer").then((m) => m.SkillsExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="h-105 rounded-xl border bg-muted/40 animate-pulse" />
    ),
  }
);

export function SkillsModeContent() {
  const { mode } = useViewMode();

  if (mode === "hr") {
    return (
      <div className="space-y-16">
        <SkillsHrCopyButton />
        <SkillsKeywordMatcher />
        <SkillsSwitchModePrompt />
      </div>
    );
  }

  if (mode === "business") {
    return <SkillsExplorer />;
  }

  return (
    <div className="space-y-16">
      <SkillsKeywordMatcher />
      <SkillsExplorer />
    </div>
  );
}
