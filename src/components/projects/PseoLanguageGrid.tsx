"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Slider } from "@/components/ui/slider";

const MIN_LANGUAGES = 2;
const MAX_LANGUAGES = 60;
const DEFAULT_LANGUAGES = 60;
const GRID_PX = 400;

/** Visualizes the Dubbing project's programmatic-SEO trick: with N supported
 * languages, every ordered pair (excluding self) becomes its own landing page —
 * dragging the slider shows how fast that count grows, and picking a source
 * language lists exactly which target-language pages it generates. */
export function PseoLanguageGrid() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const languages = t.raw("pseoSim.languages") as string[];
  const [count, setCount] = useState(DEFAULT_LANGUAGES);
  const [selected, setSelected] = useState(0);

  const activeLanguages = languages.slice(0, count);
  const totalPages = count * (count - 1);
  const cell = GRID_PX / count;
  const targets = activeLanguages.filter((_, i) => i !== selected);

  const numberFmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("pseoSim.title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">{t("pseoSim.description")}</p>

      <div className="mb-5">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{t("pseoSim.languageCountLabel")}</span>
          <span className="font-semibold text-foreground">{count}</span>
        </div>
        <Slider
          min={MIN_LANGUAGES}
          max={MAX_LANGUAGES}
          step={1}
          value={count}
          onValueChange={(value) => {
            setCount(value);
            setSelected((s) => Math.min(s, value - 1));
          }}
          aria-label={t("pseoSim.languageCountLabel")}
        />
      </div>

      <div className="mb-6 rounded-lg border bg-muted/20 p-4 text-center">
        <div className="text-2xl font-bold text-primary tabular-nums">
          {numberFmt.format(count)} × {numberFmt.format(count - 1)} = {numberFmt.format(totalPages)}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{t("pseoSim.formulaCaption")}</div>
      </div>

      <svg viewBox={`0 0 ${GRID_PX} ${GRID_PX}`} className="mx-auto mb-6 block w-full max-w-[320px]">
        {activeLanguages.map((_, row) =>
          activeLanguages.map((_, col) => {
            if (row === col) return null;
            return (
              <rect
                key={`${row}-${col}`}
                x={col * cell + 0.4}
                y={row * cell + 0.4}
                width={Math.max(cell - 0.8, 0.3)}
                height={Math.max(cell - 0.8, 0.3)}
                fill="var(--primary)"
                fillOpacity={row === selected ? 1 : 0.18}
              />
            );
          })
        )}
      </svg>

      <div className="mb-3">
        <label className="mb-1.5 block text-xs text-muted-foreground">{t("pseoSim.pickLanguageLabel")}</label>
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="rounded-md border bg-background px-3 py-1.5 text-sm"
        >
          {activeLanguages.map((lang, i) => (
            <option key={lang} value={i}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-2 text-xs text-muted-foreground">
        {t("pseoSim.generatesTemplate", { lang: activeLanguages[selected] ?? "", count: targets.length })}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {targets.map((lang) => (
          <span key={lang} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
            → {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
