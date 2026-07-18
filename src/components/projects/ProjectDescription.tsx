"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useViewMode } from "@/store/viewMode";
import { localize } from "@/lib/localized";
import { StarFormat } from "./StarFormat";
import type { Project } from "@/data/projects";

/** Mode-aware project description for the detail page — renders the explicit
 * Situation/Task/Action/Result cards in HR mode when a project has a `star`
 * breakdown, instead of a paragraph of prose. */
export function ProjectDescription({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false);
  const { mode } = useViewMode();
  const locale = useLocale();

  useEffect(() => setMounted(true), []);

  const activeMode = mounted ? mode : "business";

  if (activeMode === "hr" && project.star) {
    return <StarFormat star={project.star} />;
  }

  const paragraphs = localize(project.description[activeMode], locale).split("\n\n");

  return (
    <div className="text-lg text-muted-foreground leading-relaxed mb-10 space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}
