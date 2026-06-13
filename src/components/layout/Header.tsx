"use client";

import { useTranslations } from "next-intl";
import { FileDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { ViewModeSwitcher } from "@/components/tri-mode/ViewModeSwitcher";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-sm">
            {t("Common.siteName")}
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {t("Nav.home")}
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              {t("Nav.about")}
            </Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              {t("Nav.projects")}
            </Link>
            <Link href="/skills" className="hover:text-foreground transition-colors">
              {t("Nav.skills")}
            </Link>
            <Link href="/education" className="hover:text-foreground transition-colors">
              {t("Nav.education")}
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              {t("Nav.contact")}
            </Link>
            <Link href="/card" className="hover:text-foreground transition-colors">
              {t("Nav.card")}
            </Link>
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
