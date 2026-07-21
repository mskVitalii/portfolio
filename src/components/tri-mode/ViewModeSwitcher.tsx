"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useViewMode, type ViewMode } from "@/store/viewMode";
import { Button } from "@/components/ui/button";

const MODES: ViewMode[] = ["hr", "business", "tech"];

// Routes where the audience mode actually changes what's on the page — everywhere
// else (About, Education, Card, Recommendations, Achievements...) the switcher
// would just be chrome with nothing for it to do.
const MODE_AWARE_ROUTES = ["/projects", "/skills", "/hire-me"] as const;

function isModeAwareRoute(pathname: string): boolean {
  return pathname === "/" || MODE_AWARE_ROUTES.some((route) => pathname.startsWith(route));
}

export function ViewModeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useViewMode();
  const t = useTranslations("ViewMode");
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!isModeAwareRoute(pathname)) return null;

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-lg border p-1"
    >
      {MODES.map((m) => (
        <Button
          key={m}
          variant={mounted && mode === m ? "default" : "ghost"}
          size="sm"
          onClick={() => setMode(m)}
          aria-pressed={mounted ? mode === m : false}
          data-active={mounted ? mode === m : false}
          className="text-xs h-7 px-3"
        >
          {t(m)}
        </Button>
      ))}
    </div>
  );
}
