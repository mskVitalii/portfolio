"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { useViewMode } from "@/store/viewMode";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { localize } from "@/lib/localized";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const { mode } = useViewMode();

  useEffect(() => setMounted(true), []);

  const description = localize(mounted ? project.description[mode] : project.description.business, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col h-full rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-sm transition-all"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <Badge variant="outline" className="text-xs">
              {t(`categories.${project.category}` as "categories.work")}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{project.period}</span>
        </div>

        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {localize(project.title, locale)}
        </h3>

        {project.company && (
          <p className="text-sm text-muted-foreground mb-3">{project.company}</p>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {description}
        </p>

        {project.impact && project.impact.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {project.impact.map((item) => (
              <div key={item.label.en} className="text-center">
                <div className="text-lg font-bold text-primary">{item.value}</div>
                <div className="text-xs text-muted-foreground">{localize(item.label, locale)}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.stack.length > 4 && (
              <Badge variant="secondary" className="text-xs text-muted-foreground">
                +{project.stack.length - 4}
              </Badge>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
}
