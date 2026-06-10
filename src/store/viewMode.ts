"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "hr" | "business" | "tech";

interface ViewModeStore {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<ViewModeStore>()(
  persist(
    (set) => ({
      mode: "business",
      setMode: (mode) => set({ mode }),
    }),
    { name: "portfolio-view-mode" }
  )
);

export function useViewMode() {
  const { mode, setMode } = useViewModeStore();
  return { mode, setMode };
}
