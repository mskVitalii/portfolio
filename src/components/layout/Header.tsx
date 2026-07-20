"use client";

import { useTranslations } from "next-intl";
import { FileDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { ViewModeSwitcher } from "@/components/tri-mode/ViewModeSwitcher";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { getRecommendedHref } from "@/lib/funnel";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "home", href: "/" as const },
  { key: "about", href: "/about" as const },
  { key: "projects", href: "/projects" as const },
  { key: "skills", href: "/skills" as const },
  { key: "education", href: "/education" as const },
  { key: "recommendations", href: "/recommendations" as const },
  { key: "hireMe", href: "/hire-me" as const },
  { key: "card", href: "/card" as const },
] as const;

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const recommendedHref = getRecommendedHref(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-sm">
            <span className="hidden sm:inline">{t("Common.siteName")}</span>
            <span className="sm:hidden">VP</span>
          </Link>
          <nav className="hidden nav:flex items-center gap-4 text-sm text-muted-foreground">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              const isRecommended = !isActive && href === recommendedHref;
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "hover:text-foreground transition-colors",
                    isActive && "text-foreground font-medium",
                    isRecommended && "text-primary font-medium"
                  )}
                >
                  {t(`Nav.${key}`)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/cv/vitalii-popov-cv.pdf"
            download="Vitalii_Popov_CV.pdf"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:flex")}
          >
            <FileDown className="h-4 w-4 mr-1.5" />
            CV
          </a>
          <LocaleSwitcher />
          <ViewModeSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
