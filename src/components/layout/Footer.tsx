import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LinkedinIcon, GithubIcon } from "@/components/icons/SocialIcons";
import { getSocialLink } from "@/data/social";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/about", label: tNav("about") },
    { href: "/projects", label: tNav("projects") },
    { href: "/skills", label: tNav("skills") },
    { href: "/contact", label: tNav("contact") },
  ];

  const moreLinks = [
    { href: "/recommendations", label: tNav("recommendations") },
  ];

  const [taglineLine1, taglineLine2] = t("tagline").split("\n");

  return (
    <footer className="border-t bg-muted/20 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold mb-2">Vitalii Popov</p>
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
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={getSocialLink("github").href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={getSocialLink("email").href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {getSocialLink("email").value}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
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
          </div>

          <div>
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
          </div>

          {/* More */}
          <div>
            <p className="font-semibold text-sm mb-3">{t("moreHeading")}</p>
            <ul className="space-y-2">
              {moreLinks.map(({ href, label }) => (
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
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year} Vitalii Popov</p>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-foreground transition-colors">{t("sitemap")}</a>
            <a href="/cv/vitalii-popov-cv.pdf" download="Vitalii_Popov_CV.pdf" className="hover:text-foreground transition-colors">{t("downloadCv")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
