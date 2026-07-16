"use client";

import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IMPACT_METRICS } from "@/data/metrics";

const REVENUE_SEGMENTS = [
  { label: "Infineon", value: 480, color: "#6366f1", href: "/projects/infineon-parking-guidance" },
  { label: "OZON Tech", value: 86, color: "#10b981", href: "/projects/ozon-warehouse-search" },
  { label: "WeDo.agency", value: 52, color: "#f59e0b", href: "/projects?company=WeDo.agency#work" },
];
const TOTAL_REVENUE = REVENUE_SEGMENTS.reduce((sum, s) => sum + s.value, 0);

function RevenueBar({ isInView }: { isInView: boolean }) {
  const t = useTranslations("ImpactDashboard");
  return (
    <div className="mb-12 rounded-2xl border bg-card p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-4xl md:text-5xl font-bold tabular-nums">
          €{isInView ? (
            <CountUp end={TOTAL_REVENUE} duration={1.6} separator="," />
          ) : "0"}K
        </span>
        <span className="text-muted-foreground text-sm font-medium">{t("totalSavings")}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-5">{t("documented")}</p>

      {/* Proportional bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-4 gap-px">
        {REVENUE_SEGMENTS.map((seg) => (
          <motion.div
            key={seg.label}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(seg.value / TOTAL_REVENUE) * 100}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            style={{ background: seg.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {REVENUE_SEGMENTS.map((seg) => (
          <Link key={seg.label} href={seg.href} className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {seg.label}
              <span className="ml-1.5 font-semibold text-foreground">€{seg.value}K</span>
              <span className="ml-1 text-xs opacity-60">{Math.round((seg.value / TOTAL_REVENUE) * 100)}%</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ImpactDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const t = useTranslations("ImpactDashboard");
  const tCommon = useTranslations("Common");

  return (
    <section id="impact" className="py-20 px-4 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="mt-2 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div ref={sectionRef}>
          <RevenueBar isInView={isInView} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {IMPACT_METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link href={metric.projectHref}>
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-4 md:p-6 text-center flex flex-col gap-1">
                    <p className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                      {metric.prefix}
                      {isInView ? (
                        <CountUp
                          end={metric.end}
                          decimals={metric.decimals ?? 0}
                          duration={2}
                          delay={i * 0.08}
                        />
                      ) : (
                        "0"
                      )}
                      {metric.suffix}
                    </p>
                    <p className="font-semibold text-sm mt-1">{t(metric.labelKey)}</p>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {t(metric.descriptionKey)}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-xs w-fit mx-auto">
                      {metric.company}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {t("metricsNote")}{" "}
          <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
            {tCommon("seeAllProjects")}
          </Link>
        </p>
      </div>
    </section>
  );
}
