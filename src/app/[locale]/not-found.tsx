import Link from "next/link";

export default function NotFound() {
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
