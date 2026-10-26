"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useViewMode, type ViewMode } from "@/store/viewMode";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MODES: ViewMode[] = ["hr", "business", "tech"];

// Routes where the lens actually changes what's on the page — everywhere else
// (Home, About, Education, Card, Recommendations, Achievements...) the switcher
// would just be chrome with nothing for it to do.
const MODE_AWARE_ROUTES = ["/projects", "/skills", "/hire-me"] as const;

function isModeAwareRoute(pathname: string): boolean {
  return MODE_AWARE_ROUTES.some((route) => pathname.startsWith(route));
}

/** Brief / Impact / Tech lens toggle. The header copy only shows on routes the lens
 * affects; `inline` renders it with a visible label right above the content it
 * changes (e.g. a project description), so the effect of a click is obvious. */
export function ViewModeSwitcher({ inline = false }: { inline?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useViewMode();
  const t = useTranslations("ViewMode");
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!inline && !isModeAwareRoute(pathname)) return null;

  const group = (
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
          className={cn("text-xs h-7 px-3", inline && "text-sm")}
        >
          {t(m)}
        </Button>
      ))}
    </div>
  );

  if (!inline) return group;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-sm text-muted-foreground" aria-hidden>
        {t("label")}:
      </span>
      {group}
    </div>
  );
}
