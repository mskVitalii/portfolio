/** Shared shape for content that is authored per-locale directly in `src/data/*.ts`
 * (titles, taglines, tri-mode descriptions, company blurbs) rather than routed
 * through `messages/*.json` — keeps structured project/company data self-contained
 * per the project's "data files hold structure + prose" convention. */
export type Locale = "en" | "de" | "ru";
export type LocalizedText = Record<Locale, string>;

export function localize(text: LocalizedText, locale: string): string {
  return text[locale as Locale] ?? text.en;
}

/** `period` strings in data files (e.g. "09/2024 – present") are authored once in
 * English; swap the trailing "present" for the locale's translated word at render
 * time instead of maintaining per-locale period strings in the data. */
export function formatPeriod(period: string, presentLabel: string): string {
  return period.replace(/present\s*$/i, presentLabel);
}

/** Impact-metric values (e.g. "₽7,000") are authored once, prefix-symbol style
 * (matching EN/DE convention), and shared across locales. Russian typographic
 * convention puts the ₽ symbol after the number, so flip it at render time for
 * the ru locale instead of duplicating every impact value per locale. */
export function formatImpactValue(value: string, locale: string): string {
  let result = value;

  if (locale === "ru") {
    result = result.replace(/₽\s*([\d][\d.,]*[KM]?)/gi, (_, num: string) => `${num}₽`);
  }

  // "/mo" and "/yr" are authored in English (matching most impact values); DE/RU
  // need a translated rate suffix instead of a bare English abbreviation.
  const RATE_SUFFIXES: Record<string, { de: string; ru: string }> = {
    "/mo": { de: "/Monat", ru: " в месяц" },
    "/yr": { de: "/Jahr", ru: " в год" },
  };
  if (locale === "de" || locale === "ru") {
    for (const [suffix, translated] of Object.entries(RATE_SUFFIXES)) {
      if (result.endsWith(suffix)) {
        result = result.slice(0, -suffix.length) + translated[locale];
        break;
      }
    }
  }

  return result;
}
