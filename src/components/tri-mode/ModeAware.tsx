"use client";

import { useEffect, useState } from "react";
import { useViewMode, type ViewMode } from "@/store/viewMode";

interface ModeAwareProps {
  /** Accepts an array (`modes={["hr", "tech"]}`) from plain TSX, or a
   * space/comma-separated string (`modes="hr tech"`) — MDX-compiled JSX
   * attribute *expressions* don't reliably survive the compileMDX pipeline,
   * so content authored in .mdx files should use the string form. */
  modes: ViewMode[] | string;
  children: React.ReactNode;
}

function normalizeModes(modes: ViewMode[] | string): ViewMode[] {
  if (Array.isArray(modes)) return modes;
  return modes.split(/[\s,]+/).filter(Boolean) as ViewMode[];
}

export function ModeAware({ modes, children }: ModeAwareProps) {
  const [mounted, setMounted] = useState(false);
  const { mode } = useViewMode();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!normalizeModes(modes).includes(mode)) return null;
  return <>{children}</>;
}
