"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useViewMode, type ViewMode } from "@/store/viewMode";
import { Button } from "@/components/ui/button";

const MODES: ViewMode[] = ["hr", "business", "tech"];

export function ViewModeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useViewMode();
  const t = useTranslations("ViewMode");

  useEffect(() => setMounted(true), []);

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
