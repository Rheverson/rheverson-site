import type { Metadata } from "next";
import { site } from "@/content/site";
import { locales, type L, type Locale } from "@/content/types";
import { localePath } from "./i18n";

type PageMeta = {
  locale: Locale;
  /** Caminho sem o prefixo do idioma, ex.: "/work". */
  path: string;
  title: L;
  description: L;
  /** Título já completo (sem o sufixo do nome). */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMetadata({ locale, path, title, description, absoluteTitle, noindex }: PageMeta): Metadata {
  const url = `${site.url}${localePath(locale, path)}`;
  const t = title[locale];
  const fullTitle = absoluteTitle ? t : `${t} — ${site.name}`;
  const languages = Object.fromEntries(locales.map((l) => [l === "pt" ? "pt-BR" : "en", `${site.url}${localePath(l, path)}`]));

  return {
    title: absoluteTitle ? { absolute: t } : t,
    description: description[locale],
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${site.url}${localePath("pt", path)}` },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: description[locale],
      siteName: site.name,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description[locale],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** JSON-LD da pessoa, reutilizado em várias páginas. */
export function personJsonLd(locale: Locale) {
  return {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.fullName,
    jobTitle: locale === "pt" ? "Analista de TI" : "IT Analyst",
    description: site.description[locale],
    url: site.url,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
    address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" },
    worksFor: { "@type": "Organization", name: "Sigpel" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Brigham Young University" },
      { "@type": "CollegeOrUniversity", name: "Gran Faculdade" },
    ],
    knowsAbout: [
      "SAP Business One",
      "SAP HANA",
      "SQL",
      "Python",
      "Power BI",
      "Databricks",
      "Delta Lake",
      "Machine Learning",
      "Django",
      "Next.js",
      "Artificial Intelligence",
    ],
    knowsLanguage: ["pt-BR", "en"],
  };
}

/** Serializa JSON-LD com escape de "<" para evitar injeção de HTML. */
export const jsonLdScript = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
