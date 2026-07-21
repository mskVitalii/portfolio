"use client";

import { create } from "zustand";

/** Tracks whether the home page's story-mode header has been revealed yet.
 * Not persisted — every fresh visit to "/" starts locked again. Once unlocked
 * during a session it stays unlocked (navigating away and back doesn't re-hide it). */
interface HeaderUnlockStore {
  unlocked: boolean;
  unlock: () => void;
}

export const useHeaderUnlockStore = create<HeaderUnlockStore>()((set) => ({
  unlocked: false,
  unlock: () => set({ unlocked: true }),
}));

export function useHeaderUnlock() {
  const { unlocked, unlock } = useHeaderUnlockStore();
  return { unlocked, unlock };
}
