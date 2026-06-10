import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const enMessages = (await import(`../../messages/en.json`)).default;
  const messages =
    locale === "en"
      ? enMessages
      : (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    getMessageFallback({ namespace, key }) {
      const path = [namespace, key].filter(Boolean).join(".");
      try {
        const parts = path.split(".");
        let value: Record<string, unknown> = enMessages;
        for (const part of parts) {
          value = value[part] as Record<string, unknown>;
        }
        return typeof value === "string" ? value : path;
      } catch {
        return path;
      }
    },
    onError(error) {
      if (error.code === "MISSING_MESSAGE") {
        console.warn("[next-intl]", error.message);
      }
    },
  };
});
