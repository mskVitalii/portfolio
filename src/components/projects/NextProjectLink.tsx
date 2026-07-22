import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { localize } from "@/lib/localized";
import { getNextProject, getProject } from "@/data/projects";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** End-of-project nudge so a reader who scrolls to the bottom of one case
 * study lands on the next one instead of the page just ending. */
export async function NextProjectLink({ slug, locale }: { slug: string; locale: string }) {
  const t = await getTranslations({ locale, namespace: "Projects" });
  const next = getNextProject(slug);
  const project = getProject(slug);

  if (!next) {
    const isEducation = project?.category === "education";
    return (
      <div className="mt-10 border-t pt-8 text-center">
        <Link
          href={isEducation ? "/education" : "/projects"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          {isEducation ? t("backToEducation") : t("backToAllProjects")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 border-t pt-8">
      <Link
        href={next.href}
        className="group flex items-center justify-between rounded-xl border bg-card p-5 transition-colors hover:border-primary/50"
      >
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("nextProjectLabel")}
          </div>
          <div className="text-lg font-semibold">{localize(next.title, locale)}</div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
