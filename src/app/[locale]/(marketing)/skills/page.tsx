import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { SKILLS, CATEGORY_LABELS, CATEGORY_COLORS, LEVEL_LABELS } from "@/data/skills";
import { SkillsExplorer } from "@/components/skills/SkillsExplorer";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SkillsPage" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/skills"),
  };
}

const CATEGORIES = ["backend", "frontend", "infrastructure", "ai"] as const;

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SkillsPage");

  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      <SkillsExplorer />

      {/* List view below graph */}
      <div className="mt-16 grid sm:grid-cols-2 gap-8">
        {CATEGORIES.map((cat) => {
          const catSkills = SKILLS.filter((s) => s.category === cat || (cat === "backend" && s.category === "languages"));
          if (catSkills.length === 0) return null;
          return (
            <div key={cat}>
              <h3
                className="font-semibold mb-4 text-sm uppercase tracking-wider"
                style={{ color: CATEGORY_COLORS[cat] }}
              >
                {CATEGORY_LABELS[cat]}
              </h3>
              <div className="space-y-2">
                {catSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.years}y</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {LEVEL_LABELS[skill.level]}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
