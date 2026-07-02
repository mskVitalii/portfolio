import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { FileDown, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ChessStats } from "@/components/about/ChessStats";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

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

const INTERESTS = ["Cycling", "Hiking", "Skiing", "Lindy Hop", "HEMA", "Writing about tech"];
const PROGRAMMING_INTEREST = "Programming";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Bio */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <p>{t("bio1")}</p>
            <p>
              {t("bio2")}
            </p>
            <p>
              {t("bio3").split("Habr / Dev / Medium")[0]}
              <a
                href="https://habr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 inline-flex items-center gap-1"
              >
                Habr / Dev / Medium
                <ExternalLink className="h-3 w-3" />
              </a>
              {t("bio3").split("Habr / Dev / Medium")[1]}
            </p>
            <p>{t("bio4")}</p>
          </div>

          <aside className="space-y-6">
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

            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                {t("interestsTitle")}
              </h3>
              <div className="flex flex-wrap gap-1">
                {INTERESTS.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                <Link href="/projects?category=personal">
                  <Badge
                    variant="outline"
                    className="text-xs hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {PROGRAMMING_INTEREST}
                  </Badge>
                </Link>
              </div>
              <ChessStats />
            </div>

            <a
              href="/cv/vitalii-popov-cv.pdf"
              download="Vitalii_Popov_CV.pdf"
              className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}
            >
              <FileDown className="h-4 w-4 mr-2" />
              {t("downloadCv")}
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
