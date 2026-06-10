"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectCategory } from "@/data/projects";

const CATEGORIES: { value: "all" | ProjectCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "education", label: "Education" },
  { value: "hackathon", label: "Hackathons" },
  { value: "personal", label: "Personal" },
];

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  const availableCategories = new Set(projects.map((p) => p.category));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.filter(
          (c) => c.value === "all" || availableCategories.has(c.value as ProjectCategory)
        ).map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              active === cat.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {cat.label}
            <span className="ml-1.5 text-xs opacity-60">
              {cat.value === "all"
                ? projects.length
                : projects.filter((p) => p.category === cat.value).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-center py-16">No projects in this category yet.</p>
      )}
    </div>
  );
}
