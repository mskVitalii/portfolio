import Link from "next/link";

// Root-level fallback: fires when a path doesn't match any known route at all
// (e.g. a garbage/typo'd URL), before next-intl's [locale] segment ever renders —
// so it can't use translations. src/app/[locale]/not-found.tsx handles the
// locale-aware case (unknown project/company slugs).
export const metadata = {
  title: "Page not found",
};

export default function RootNotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-xl">Page not found</p>
      <Link href="/" className="mt-6 text-primary underline underline-offset-4">
        Go home
      </Link>
    </div>
  );
}
