import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BreadcrumbItem } from "@/lib/seo";

/** Visible counterpart to buildBreadcrumbJsonLd's structured data — the JSON-LD
 * alone gives Google rich-result eligibility but nothing a visitor can see or
 * click. Pass the same items array to both. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path || "/"} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
