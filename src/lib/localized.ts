/** Shared shape for content that is authored per-locale directly in `src/data/*.ts`
 * (titles, taglines, tri-mode descriptions, company blurbs) rather than routed
 * through `messages/*.json` — keeps structured project/company data self-contained
 * per the project's "data files hold structure + prose" convention. */
export type Locale = "en" | "de" | "ru";
export type LocalizedText = Record<Locale, string>;

export function localize(text: LocalizedText, locale: string): string {
  return text[locale as Locale] ?? text.en;
}

/** Impact-metric values (e.g. "₽7,000") are authored once, prefix-symbol style
 * (matching EN/DE convention), and shared across locales. Russian typographic
 * convention puts the ₽ symbol after the number, so flip it at render time for
 * the ru locale instead of duplicating every impact value per locale. */
export function formatImpactValue(value: string, locale: string): string {
  if (locale !== "ru") return value;
  return value.replace(/₽\s*([\d][\d.,]*[KM]?)/gi, (_, num: string) => `${num}₽`);
}
