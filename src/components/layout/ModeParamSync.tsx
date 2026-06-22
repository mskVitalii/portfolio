"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useViewMode, type ViewMode } from "@/store/viewMode";

const VALID_MODES: ViewMode[] = ["hr", "business", "tech"];

export function ModeParamSync() {
  const searchParams = useSearchParams();
  const { setMode } = useViewMode();

  useEffect(() => {
    const raw = searchParams.get("mode");
    if (raw && VALID_MODES.includes(raw as ViewMode)) {
      setMode(raw as ViewMode);
    }
  }, [searchParams, setMode]);

  return null;
}
