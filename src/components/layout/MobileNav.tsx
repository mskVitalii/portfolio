"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "home", href: "/" as const },
  { key: "about", href: "/about" as const },
  { key: "projects", href: "/projects" as const },
  { key: "skills", href: "/skills" as const },
  { key: "education", href: "/education" as const },
  { key: "recommendations", href: "/recommendations" as const },
  { key: "contact", href: "/contact" as const },
  { key: "card", href: "/card" as const },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Nav");
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="nav:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-3 min-w-11 min-h-11")}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-40 border-t"
          style={{ background: "var(--background)" }}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg py-3 px-2 rounded-lg hover:bg-muted transition-colors",
                    isActive ? "font-bold text-foreground bg-muted" : "font-medium text-muted-foreground"
                  )}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>
        </div>,
        document.body
      )}
    </div>
  );
}
