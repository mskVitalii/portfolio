"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  de: "DE",
  ru: "RU",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-muted-foreground/40 mx-0.5">·</span>}
          <button
            onClick={() => switchLocale(l)}
            className={
              l === locale
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            {LOCALE_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
