"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useAchievementsStore } from "@/store/achievements";
import { ACHIEVEMENTS } from "@/data/achievements";

const ACHIEVEMENT_MAP = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));
const AUTO_DISMISS_MS = 6000;

export function AchievementToaster() {
  const pendingToasts = useAchievementsStore((s) => s.pendingToasts);
  const dismissToast = useAchievementsStore((s) => s.dismissToast);
  const t = useTranslations("Achievements");

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-100 flex w-[min(92vw,360px)] flex-col-reverse gap-3">
      <AnimatePresence>
        {pendingToasts.map((id) => {
          const def = ACHIEVEMENT_MAP.get(id);
          if (!def) return null;
          const Icon = def.icon;
          return (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="pointer-events-auto overflow-hidden rounded-lg border border-primary/40 bg-card text-card-foreground shadow-2xl shadow-black/20"
            >
              <ToastTimer onDone={() => dismissToast(id)} />
              <div className="flex items-start gap-3 p-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {t("unlockedLabel")}
                  </p>
                  <p className="truncate text-sm font-semibold">{t(`${id}.title`)}</p>
                  <p className="text-xs leading-snug text-muted-foreground">{t(`${id}.description`)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function ToastTimer({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0 }}
      transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
      style={{ transformOrigin: "left" }}
      className="h-0.5 bg-primary"
    />
  );
}
