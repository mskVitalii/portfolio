const BASE_URL = "https://vitaliipopov.dev";
const LOCALES = ["en", "de", "ru"] as const;

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
    ) as Record<string, string>,
  };
}
