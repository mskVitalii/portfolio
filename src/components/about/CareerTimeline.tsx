"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { CAREER } from "@/data/career";
import { Briefcase, GraduationCap } from "lucide-react";

export function CareerTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />

      <div className="space-y-8">
        {CAREER.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="relative flex gap-6 md:gap-0"
          >
            {/* Dot */}
            <div className="relative z-10 shrink-0 w-12 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto">
              <div
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center
                  ${entry.type === "work"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-muted-foreground"
                  }`}
              >
                {entry.type === "work" ? (
                  <Briefcase className="h-4 w-4" />
                ) : (
                  <GraduationCap className="h-4 w-4" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 pb-2 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-[50%] md:pl-12"}`}>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                {entry.period}
              </p>
              <h3 className="font-bold text-base">{entry.role}</h3>
              <p className="text-sm font-medium text-primary">
                {entry.org}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.orgType} · {entry.location}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {entry.description}
              </p>
              {entry.achievements && (
                <div className={`mt-2 flex flex-wrap gap-1 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  {entry.achievements.map((a) => (
                    <Badge key={a} variant="secondary" className="text-xs font-semibold">
                      {a}
                    </Badge>
                  ))}
                </div>
              )}
              {entry.stack && (
                <div className={`mt-2 flex flex-wrap gap-1 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  {entry.stack.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
