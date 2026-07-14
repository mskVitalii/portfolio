"use client";

import { useEffect, useState } from "react";
import { useViewMode } from "@/store/viewMode";
import { cn } from "@/lib/utils";
import type { CompanyBundle } from "@/data/companies";

export function CompanyBlurb({ blurb, className }: { blurb: CompanyBundle["blurb"]; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { mode } = useViewMode();

  useEffect(() => setMounted(true), []);

  return (
    <p className={cn("text-lg text-muted-foreground max-w-2xl", className)}>
      {mounted ? blurb[mode] : blurb.business}
    </p>
  );
}
