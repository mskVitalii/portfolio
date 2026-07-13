"use client";

import { useEffect } from "react";
import { useViewModeStore, type ViewMode } from "@/store/viewMode";

const SHORTCUT_KEYS: Record<string, ViewMode> = {
  "1": "hr",
  "2": "business",
  "3": "tech",
};

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const mode = useViewModeStore((s) => s.mode);
  const setMode = useViewModeStore((s) => s.setMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-view-mode", mode);
  }, [mode]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const next = SHORTCUT_KEYS[e.key];
      if (!next) return;

      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }

      setMode(next);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [setMode]);

  return <>{children}</>;
}
