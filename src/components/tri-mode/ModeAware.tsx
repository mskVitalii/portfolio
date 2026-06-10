"use client";

import { useEffect, useState } from "react";
import { useViewMode, type ViewMode } from "@/store/viewMode";

interface ModeAwareProps {
  modes: ViewMode[];
  children: React.ReactNode;
}

export function ModeAware({ modes, children }: ModeAwareProps) {
  const [mounted, setMounted] = useState(false);
  const { mode } = useViewMode();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!modes.includes(mode)) return null;
  return <>{children}</>;
}
