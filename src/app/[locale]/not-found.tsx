import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Next.js also prerenders a locale-less fallback for this segment at build time
// (for the on-demand ISR miss case), calling this without resolvable params —
// falling back to the default locale keeps that prerender from crashing the build.
async function resolveLocale(params: Promise<{ locale: string }> | undefined) {
  const resolved = await params;
  return resolved?.locale ?? routing.defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "NotFound" });
  return { title: t("title") };
}

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-xl">{t("description")}</p>
      <Link href="/" className="mt-6 text-primary underline underline-offset-4">
        {t("cta")}
      </Link>
    </div>
  );
}
