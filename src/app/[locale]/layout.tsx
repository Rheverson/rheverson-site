import type { Metadata, Viewport } from "next";
import "../globals.css";
import { display, sans } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/content/site";
import { locales } from "@/content/types";
import { resolveLocale } from "@/lib/i18n";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s — ${site.name}` },
    description: site.description[locale],
    applicationName: site.name,
    authors: [{ name: site.fullName, url: site.url }],
    creator: site.fullName,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(locale),
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} className={`${display.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
