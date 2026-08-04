"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LinkedinIcon, GithubIcon } from "@/components/icons/SocialIcons";
import { getSocialLink } from "@/data/social";
import { trackContactClick, trackCvDownload } from "@/lib/analytics";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/about", label: tNav("about") },
    { href: "/projects", label: tNav("projects") },
    { href: "/skills", label: tNav("skills") },
    { href: "/card", label: tNav("card") },
    { href: "/recommendations", label: tNav("recommendations") },
    { href: "/hire-me", label: tNav("hireMe") },
    { href: "/achievements", label: tNav("achievements") },
  ];

  const [taglineLine1, taglineLine2] = t("tagline").split("\n");

  return (
    <footer className="border-t bg-muted/20 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold mb-2">{tCommon("siteName")}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {taglineLine1}
              <br />
              {taglineLine2}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={getSocialLink("linkedin").href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("linkedin", "footer")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={getSocialLink("github").href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("github", "footer")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={getSocialLink("email").href}
                onClick={() => trackContactClick("email", "footer")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {getSocialLink("email").value}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label={t("navHeading")}>
            <p className="font-semibold text-sm mb-3">{t("navHeading")}</p>
            <ul className="space-y-2">
              {navLinks.slice(0, 3).map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("navHeading")}>
            <p className="font-semibold text-sm mb-3">&nbsp;</p>
            <ul className="space-y-2">
              {navLinks.slice(3).map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year} {tCommon("siteName")}</p>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-foreground transition-colors">{t("sitemap")}</a>
            <a href="/cv/vitalii-popov-cv.pdf" download="Vitalii_Popov_CV.pdf" onClick={() => trackCvDownload("footer")} className="hover:text-foreground transition-colors">{t("downloadCv")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
