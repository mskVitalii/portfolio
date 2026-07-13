"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useViewMode, type ViewMode } from "@/store/viewMode";

const VALID_MODES: ViewMode[] = ["hr", "business", "tech"];

/**
 * Keeps `?mode=` and the view-mode store in sync, in both directions, so the
 * active audience lens is always visible/shareable in the URL:
 *  - URL → store: an incoming `?mode=` (shared link, fresh navigation) wins
 *    over whatever was persisted locally.
 *  - store → URL: any mode change (switcher, keyboard shortcut, AudienceFilter
 *    cards) — and any navigation to a page that doesn't carry `?mode=` yet —
 *    gets written back into the address bar via a shallow `router.replace`.
 *
 * This has to be a single effect, not two. Two independent effects (one per
 * direction) race on mount/navigation: correcting the store from the URL via
 * `setMode` doesn't synchronously update the `mode` this render's other effect
 * already closed over, so that other effect sees a stale `mode` and stomps the
 * URL right back. `lastSyncedFromUrl` disambiguates "the store just changed
 * and the URL needs to catch up" from "the URL just changed and the store
 * needs to catch up" by remembering which `?mode=` value we've already
 * consumed, so a value we've seen before is never treated as a fresh signal.
 */
export function ModeParamSync() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mode, setMode } = useViewMode();
  const lastSyncedFromUrl = useRef<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("mode");

    if (raw && VALID_MODES.includes(raw as ViewMode) && raw !== lastSyncedFromUrl.current) {
      lastSyncedFromUrl.current = raw;
      if (raw !== mode) setMode(raw as ViewMode);
      return;
    }

    if (raw !== mode) {
      lastSyncedFromUrl.current = mode;
      const params = new URLSearchParams(searchParams);
      params.set("mode", mode);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [mode, pathname, searchParams, router, setMode]);

  return null;
}
