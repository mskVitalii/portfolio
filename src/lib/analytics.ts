"use client";

import { sendGAEvent } from "@next/third-parties/google";

/** Fires only once GA's script has actually loaded (sendGAEvent no-ops otherwise
 * outside a browser with the dataLayer present) — safe to call unconditionally
 * from click handlers even when NEXT_PUBLIC_GA_ID is unset. */
export function trackContactClick(method: "email" | "linkedin" | "github" | "telegram", location: string) {
  sendGAEvent("event", "contact_click", { method, location });
}

export function trackCvDownload(location: string) {
  sendGAEvent("event", "cv_download", { location });
}
