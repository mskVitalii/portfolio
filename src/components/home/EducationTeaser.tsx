"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { formatPeriod } from "@/lib/localized";
import { cn } from "@/lib/utils";

const DEGREES = [
  {
    id: "tuc",
    degreeKey: "tucDegree" as const,
    orgKey: "tucOrg" as const,
    descKey: "tucDesc" as const,
    period: "2023 – present",
    gpa: "GPA 2.39",
    gpaNoteKey: "tucGpaNote" as const,
  },
  {
    id: "hse",
    degreeKey: "hseDegree" as const,
    orgKey: "hseOrg" as const,
    descKey: "hseDesc" as const,
    period: "2019 – 2023",
    gpa: "GPA 4.2 / 5.0",
    gpaNoteKey: undefined,
  },
];

export function EducationTeaser() {
  const t = useTranslations("EducationTeaser");
  const tEdu = useTranslations("EducationPage");
  const tProjects = useTranslations("Projects");

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
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEGREES.map((degree, i) => (
            <motion.div
              key={degree.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border bg-card p-6"
            >
              <GraduationCap className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-1">{t(degree.degreeKey)}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t(degree.orgKey)} · {formatPeriod(degree.period, tProjects("timelinePresent"))}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {t(degree.descKey)}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{degree.gpa}</span>
                {degree.gpaNoteKey && <> ({tEdu(degree.gpaNoteKey)})</>}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/education"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
