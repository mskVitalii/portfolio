"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useViewMode } from "@/store/viewMode";
import { cn } from "@/lib/utils";
import { localize } from "@/lib/localized";
import type { CompanyBundle } from "@/data/companies";

export function CompanyBlurb({ blurb, className }: { blurb: CompanyBundle["blurb"]; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { mode } = useViewMode();
  const locale = useLocale();

  useEffect(() => setMounted(true), []);

  return (
    <p className={cn("text-lg text-muted-foreground max-w-2xl", className)}>
      {localize(mounted ? blurb[mode] : blurb.business, locale)}
    </p>
  );
}
