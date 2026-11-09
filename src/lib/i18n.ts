import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/content/types";

/** Caminho localizado: localePath("pt", "/work") → "/pt/work". */
export const localePath = (locale: Locale, path = "/") =>
  `/${locale}${path === "/" ? "" : path}`;

export const otherLocale = (locale: Locale): Locale => (locale === "pt" ? "en" : "pt");

/** Valida o parâmetro de rota e devolve o locale tipado. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
