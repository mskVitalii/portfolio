import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ChessStats } from "@/components/about/ChessStats";
import { LeetCodeStats } from "@/components/about/LeetCodeStats";
import { AboutGallery } from "@/components/about/AboutGallery";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildNavBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

const WRITING_LINKS = {
  ru: [{ label: "Habr", href: "https://habr.com/ru/users/mskVitalii/" }],
  en: [
    { label: "Medium", href: "https://medium.com/@msk.vitalii" },
    { label: "Dev.to", href: "https://dev.to/mskvitalii" },
  ],
  de: [
    { label: "Medium", href: "https://medium.com/@msk.vitalii" },
    { label: "Dev.to", href: "https://dev.to/mskvitalii" },
  ],
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const writingLinks =
    WRITING_LINKS[locale as keyof typeof WRITING_LINKS] ?? WRITING_LINKS.en;
  const [bio4Before, bio4After] = t("bio4").split("%%LINKS%%");
  const [bio2Before, bio2Between, bio2After] = t("bio2").split(/%%HOME%%|%%PROJECTS%%/);
  const breadcrumbJsonLd = await buildNavBreadcrumbJsonLd(locale, "about", "/about");
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    path: "/about",
    name: t("title"),
    description: t("metaDescription"),
  });

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      {/* Bio */}
      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
            <p>{t("bio1")}</p>
            <p>
              {bio2Before}
              <Link href="/" className="text-foreground underline underline-offset-4">
                {t("bio2HomeLabel")}
              </Link>
              {bio2Between}
              <Link href="/projects" className="text-foreground underline underline-offset-4">
                {t("bio2ProjectsLabel")}
              </Link>
              {bio2After}
            </p>
            <p>
              {bio4Before}
              {writingLinks.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && " / "}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              ))}
              {bio4After}
            </p>
          </div>

          <aside className="space-y-6">
            <div className="mx-auto aspect-4/5 w-full max-w-xs overflow-hidden rounded-2xl ring-2 ring-border md:mx-0 md:max-w-none">
              <Image
                src="/images/about/avatar/vitalii.jpg"
                alt={t("avatarAlt")}
                width={600}
                height={750}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                {t("languagesTitle")}
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{t("english")}</span>
                  <span className="text-muted-foreground">{t("fluent")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("german")}</span>
                  <span className="text-muted-foreground">{t("b2")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("russian")}</span>
                  <span className="text-muted-foreground">{t("native")}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ChessStats />
          <LeetCodeStats />
        </div>
      </section>

      <AboutGallery />
    </main>
  );
}
