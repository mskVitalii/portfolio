"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_KEYS = ["home", "about", "projects", "skills", "education", "contact", "card"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  about: "/about",
  projects: "/projects",
  skills: "/skills",
  education: "/education",
  contact: "/contact",
  card: "/card",
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2")}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-40 border-t"
          style={{ background: "var(--background)" }}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                href={NAV_HREFS[key]}
                onClick={() => setOpen(false)}
                className="text-lg font-medium py-3 px-2 rounded-lg hover:bg-muted transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </div>
  );
}
