"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/data/projects";
import { localize, formatImpactValue } from "@/lib/localized";

/** Order is deliberate: recognizable brands lead (OZON, then Infineon with the bigger
 * documented number), the two more unusual builds close it out (an AI support agent,
 * a TDD-tested pricing bot). */
const FEATURED_SLUGS = [
  "ozon-barcode-scanner",
  "infineon-parking-guidance",
  "wedo-shopify-ai-support",
  "wedo-ecommerce-bidder",
] as const;

export function TopProjects() {
  const t = useTranslations("TopProjects");
  const locale = useLocale();
  const projects = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!);

  return (
    <section className="py-20 px-4 border-t">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const headline = project.impact?.[0];
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col h-full rounded-2xl border-2 bg-card p-8 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    {project.company}
                  </p>
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {localize(project.title, locale)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {localize(project.tagline, locale)}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-4">
                    {localize(project.description.business, locale)}
                  </p>

                  {headline && (
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-primary tabular-nums">
                        {formatImpactValue(headline.value, locale)}
                      </div>
                      <div className="text-sm text-muted-foreground">{localize(headline.label, locale)}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
