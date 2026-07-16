"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { useAchievementsStore } from "@/store/achievements";
import { useVisitedPagesStore } from "@/store/visitedPages";
import { SOCIAL_LINKS } from "@/data/social";
import { ACHIEVEMENTS, PAGE_ACHIEVEMENTS, ALL_PAGE_ACHIEVEMENT_IDS } from "@/data/achievements";
import { AchievementToaster } from "./AchievementToast";

const SCROLL_BOTTOM_THRESHOLD_PX = 48;

export function AchievementsProvider() {
  const pathname = usePathname();
  const unlock = useAchievementsStore((s) => s.unlock);
  const unlocked = useAchievementsStore((s) => s.unlocked);
  const markVisited = useVisitedPagesStore((s) => s.markVisited);

  // Records the visit immediately (unlike page-visit achievements below, which
  // wait for a scroll-to-bottom) so nav UI can show "already seen" right away.
  useEffect(() => {
    markVisited(pathname);
  }, [pathname, markVisited]);

  // Page-visit achievements only unlock once the visitor scrolls to the bottom of a known page
  // (pathname from next-intl navigation is already locale-stripped). Short pages that already
  // fit the viewport count immediately via the initial checkBottom() call.
  useEffect(() => {
    const segment = pathname === "/" ? "" : pathname.split("/")[1];
    const id = PAGE_ACHIEVEMENTS[segment];
    if (!id || useAchievementsStore.getState().unlocked[id]) return;

    const checkBottom = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - SCROLL_BOTTOM_THRESHOLD_PX;
      if (scrolledToBottom) {
        unlock(id);
        window.removeEventListener("scroll", checkBottom);
        window.removeEventListener("resize", checkBottom);
      }
    };

    checkBottom();
    window.addEventListener("scroll", checkBottom, { passive: true });
    window.addEventListener("resize", checkBottom);
    return () => {
      window.removeEventListener("scroll", checkBottom);
      window.removeEventListener("resize", checkBottom);
    };
  }, [pathname, unlock]);

  // Meta achievement once every page has been visited.
  useEffect(() => {
    if (ALL_PAGE_ACHIEVEMENT_IDS.every((id) => unlocked[id])) {
      unlock("visitAll");
    }
  }, [unlocked, unlock]);

  // Final meta achievement once every other achievement has been unlocked.
  useEffect(() => {
    const others = ACHIEVEMENTS.filter((a) => a.id !== "completionist");
    if (others.every((a) => unlocked[a.id])) {
      unlock("completionist");
    }
  }, [unlocked, unlock]);

  // Click delegation for contact links (email/LinkedIn/GitHub/Telegram) and CV downloads,
  // wherever they appear on the site (Header, Footer, Hero, Hire Me page, ...).
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      if (anchor.hasAttribute("download") && anchor.href.includes("/cv/")) {
        unlock("cvDownload");
        return;
      }

      if (
        anchor.href.startsWith("mailto:") ||
        SOCIAL_LINKS.some((link) => anchor.href === link.href || anchor.href.startsWith(link.href))
      ) {
        unlock("contactClick");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [unlock]);

  return <AchievementToaster />;
}
