"use client";

import {
  Home,
  UserRound,
  FolderKanban,
  Sparkles,
  GraduationCap,
  Quote,
  Mail,
  CreditCard,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { getRecommendedHref } from "@/lib/funnel";
import { cn } from "@/lib/utils";

const PAGES: { key: string; href: "/" | "/about" | "/projects" | "/skills" | "/education" | "/recommendations" | "/hire-me" | "/card" | "/achievements"; icon: LucideIcon }[] = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: UserRound },
  { key: "projects", href: "/projects", icon: FolderKanban },
  { key: "skills", href: "/skills", icon: Sparkles },
  { key: "education", href: "/education", icon: GraduationCap },
  { key: "recommendations", href: "/recommendations", icon: Quote },
  { key: "hireMe", href: "/hire-me", icon: Mail },
  { key: "card", href: "/card", icon: CreditCard },
  { key: "achievements", href: "/achievements", icon: Trophy },
];

/** "Where else can you go" block shown near the bottom of every page — distinct
 * from the Footer's plain link list, this surfaces the other sections as
 * inviting pills and excludes whichever section the visitor is already on. */
export function ExploreMore() {
  const t = useTranslations();
  const pathname = usePathname();
  const recommendedHref = getRecommendedHref(pathname);

  const others = PAGES.filter(({ href }) =>
    href === "/" ? pathname !== "/" : !pathname.startsWith(href)
  );

  if (others.length === 0) return null;

  return (
    <section className="border-t bg-muted/10">
      <div className="container mx-auto px-4 py-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("ExploreMore.title")}
        </p>
        <div className="flex flex-wrap gap-2">
          {others.map(({ key, href, icon: Icon }) => {
            const isRecommended = href === recommendedHref;
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  isRecommended
                    ? "border-primary/60 bg-primary/10 text-primary hover:border-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(`Nav.${key}`)}
                {isRecommended && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    · {t("ExploreMore.recommended")}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
