"use client";

import { useViewModeStore } from "@/store/viewMode";

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  useViewModeStore();
  return <>{children}</>;
}
