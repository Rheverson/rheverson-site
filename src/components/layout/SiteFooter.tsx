import Link from "next/link";
import { copy } from "@/content/copy";
import { nav, site } from "@/content/site";
import type { Locale } from "@/content/types";
import { Icon } from "@/components/Icon";
import { Monogram } from "./Monogram";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="relative mt-32 border-t border-steel bg-carbon">
      <div className="shell pb-10 pt-16 md:pt-24">
        <Link
          href={`/${locale}/contact`}
          className="group display display-l flex items-end justify-between gap-6 text-frost transition-colors hover:text-signal"
        >
          {copy.contact.lead[locale]}
          <Icon
            name="arrow-up-right"
            size={64}
            className="mb-[0.08em] h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2"
          />
        </Link>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href={`mailto:${site.email}`} className="link text-lg text-frost md:text-xl">
              {site.email}
            </a>
            <p className="meta mt-3">{site.location[locale]}</p>
            <ul className="mt-6 flex gap-3">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-mist ring-1 ring-iron transition-colors hover:text-signal hover:ring-signal"
                  aria-label={`LinkedIn (${copy.common.external[locale]})`}
                >
                  <Icon name="linkedin" />
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-mist ring-1 ring-iron transition-colors hover:text-signal hover:ring-signal"
                  aria-label={`GitHub (${copy.common.external[locale]})`}
                >
                  <Icon name="github" />
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label={locale === "pt" ? "Rodapé" : "Footer"} className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link href={`/${locale}${item.href}`} className="link text-mist hover:text-frost">
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-steel pt-6 text-sm text-metal sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Monogram size={12} className="text-signal" />
            <span>© 2026 {site.fullName}</span>
          </p>
          <p>
            {copy.common.footerLine[locale]}{" "}
            <a href={site.repo} target="_blank" rel="noopener noreferrer" className="link-under">
              {copy.common.viewSource[locale]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
