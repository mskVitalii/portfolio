"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VisitedPagesState {
  visited: string[];
  markVisited: (path: string) => void;
}

/** Tracks which top-level routes the visitor has landed on, independent of the
 * achievements store's scroll-to-bottom-gated unlock — used to show a "already
 * seen" indicator in navigation, not to gamify anything. */
export const useVisitedPagesStore = create<VisitedPagesState>()(
  persist(
    (set, get) => ({
      visited: [],
      markVisited: (path) => {
        if (get().visited.includes(path)) return;
        set((s) => ({ visited: [...s.visited, path] }));
      },
    }),
    { name: "portfolio-visited-pages" }
  )
);
