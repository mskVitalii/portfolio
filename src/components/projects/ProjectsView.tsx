"use client";

import { useState, Suspense } from "react";
import { LayoutGrid, AlignLeft } from "lucide-react";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsTimeline } from "./ProjectsTimeline";
import type { Project } from "@/data/projects";

type View = "grid" | "timeline";

interface Props {
  projects: Project[];
  allProjects: Project[];
}

export function ProjectsView({ projects, allProjects }: Props) {
  const [view, setView] = useState<View>("grid");

  return (
    <div>
      {/* View toggle */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-0.5 rounded-lg border border-border p-1 bg-muted/30">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              view === "grid"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            List
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              view === "timeline"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Timeline
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <Suspense fallback={<div className="text-muted-foreground text-sm py-8 text-center">Loading…</div>}>
          <ProjectsFilter projects={projects} />
        </Suspense>
      ) : (
        <ProjectsTimeline projects={allProjects} />
      )}
    </div>
  );
}
