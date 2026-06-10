"use client";

import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "motion/react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IMPACT_METRICS } from "@/data/metrics";

export function ImpactDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 px-4 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Impact</h2>
          <p className="mt-2 text-muted-foreground">
            Measurable outcomes from real production systems
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                    <p className="font-semibold text-sm mt-1">{metric.label}</p>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {metric.description}
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
          Each metric links to the full project case study.{" "}
          <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
            See all projects →
          </Link>
        </p>
      </div>
    </section>
  );
}
