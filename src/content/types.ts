export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Texto localizado. */
export type L = { pt: string; en: string };

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const tr = (text: L, locale: Locale) => text[locale];
