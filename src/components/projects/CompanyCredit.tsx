"use client";

import { useTranslations, useLocale } from "next-intl";
import { ExternalLink, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { localize } from "@/lib/localized";
import type { CompanyCredit as CompanyCreditData } from "@/data/companies";

export function CompanyCredit({ credit, className }: { credit: CompanyCreditData; className?: string }) {
  const t = useTranslations("Projects");
  const locale = useLocale();

  return (
    <div className={cn("flex items-start gap-3 rounded-lg border bg-muted/30 p-4 max-w-2xl", className)}>
      <UserRound className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          {t("creditHeading")}
        </p>
        <p className="text-sm font-medium">
          {credit.name}
          <span className="text-muted-foreground font-normal"> — {localize(credit.role, locale)}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">{localize(credit.note, locale)}</p>
        <a
          href={credit.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          {t("creditLinkedIn")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
