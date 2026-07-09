"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AchievementId } from "@/data/achievements";

interface AchievementsState {
  unlocked: Partial<Record<AchievementId, number>>;
  pendingToasts: AchievementId[];
  unlock: (id: AchievementId) => void;
  dismissToast: (id: AchievementId) => void;
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlocked: {},
      pendingToasts: [],
      unlock: (id) => {
        if (get().unlocked[id]) return;
        set((s) => ({
          unlocked: { ...s.unlocked, [id]: Date.now() },
          pendingToasts: [...s.pendingToasts, id],
        }));
      },
      dismissToast: (id) => {
        set((s) => ({ pendingToasts: s.pendingToasts.filter((t) => t !== id) }));
      },
    }),
    {
      name: "portfolio-achievements",
      partialize: (s) => ({ unlocked: s.unlocked }),
    }
  )
);
