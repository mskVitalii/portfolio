"use client";

import { useEffect } from "react";

/**
 * The true root layout (`app/layout.tsx`) can't know the locale without a
 * Dynamic API (`headers()`), which would opt the entire app out of static
 * rendering. It renders a static default `lang` instead, and this corrects
 * `<html lang>` from the statically-known route param once mounted.
 */
export function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
