/** Shared shape for content that is authored per-locale directly in `src/data/*.ts`
 * (titles, taglines, tri-mode descriptions, company blurbs) rather than routed
 * through `messages/*.json` — keeps structured project/company data self-contained
 * per the project's "data files hold structure + prose" convention. */
export type Locale = "en" | "de" | "ru";
export type LocalizedText = Record<Locale, string>;

export function localize(text: LocalizedText, locale: string): string {
  return text[locale as Locale] ?? text.en;
}
