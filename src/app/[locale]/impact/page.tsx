import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { InView } from "@/components/motion/InView";
import { LedNumber } from "@/components/motion/LedNumber";
import { AucSlope, CommitMatrix, LiftChart } from "@/components/viz/ImpactCharts";
import { Icon } from "@/components/Icon";
import { copy } from "@/content/copy";
import { projectName, projects } from "@/content/projects";
import type { L } from "@/content/types";
import { commitMatrix, commitsCollectedAt, totalCommits } from "@/lib/commits";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/impact">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/impact", title: copy.impact.title, description: copy.impact.intro });
}

const delivered: { what: L; detail: L; slug: string; href?: string }[] = [
  {
    what: { pt: "Portal de operações sobre o SAP B1", en: "Operations portal on SAP B1" },
    detail: { pt: "18 módulos em uso interno, PCP e logística, leitura no HANA e escrita pelo Service Layer", en: "18 apps in internal use, production planning and logistics, reads from HANA and writes via the Service Layer" },
    slug: "portal-operacoes-sap",
  },
  {
    what: { pt: "Pipeline SAP HANA → lakehouse", en: "SAP HANA → lakehouse pipeline" },
    detail: { pt: "15 tabelas de origem, camadas Bronze/Silver/Gold, jobs versionados e modelo auditado", en: "15 source tables, Bronze/Silver/Gold layers, versioned jobs and an audited model" },
    slug: "propensao-compra",
  },
  {
    what: { pt: "PlanejeApp", en: "PlanejeApp" },
    detail: { pt: "No ar em planejapp.com.br, com app web e assinatura", en: "Live at planejapp.com.br, with web app and subscription" },
    slug: "planejapp",
    href: "https://planejapp.com.br/",
  },
  {
    what: { pt: "TudoParaEventos", en: "TudoParaEventos" },
    detail: { pt: "No ar em tudoparaeventos.com.br", en: "Live at tudoparaeventos.com.br" },
    slug: "tudoparaeventos",
    href: "https://www.tudoparaeventos.com.br/",
  },
  {
    what: { pt: "Kluska", en: "Kluska" },
    detail: { pt: "Loja no ar em kluska.store", en: "Store live at kluska.store" },
    slug: "kluska",
    href: "https://www.kluska.store/",
  },
  {
    what: { pt: "LucroRadar AI", en: "LucroRadar AI" },
    detail: { pt: "Demonstração pública e código aberto", en: "Public demo and open source code" },
    slug: "lucroradar-ai",
    href: "https://lucroradar-ai.vercel.app/",
  },
  {
    what: { pt: "Site da editora", en: "Publisher website" },
    detail: { pt: "No ar, com publicação testada e rollback automático", en: "Live, with tested releases and automatic rollback" },
    slug: "editora-wordpress",
    href: "https://universovivodaspalavras.com.br/",
  },
];

export default async function ImpactPage({ params }: PageProps<"/[locale]/impact">) {
  const locale = await resolveLocale(params);
  const t = copy.impact;
  const matrix = commitMatrix();
  const names = Object.fromEntries(projects.map((p) => [p.slug, projectName(p, locale)]));
  const collected = new Date(`${commitsCollectedAt}T12:00:00Z`).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageTransition>
      <main id="main" className="pt-32 md:pt-44">
        <header className="shell grid gap-8 md:grid-cols-12 md:items-end">
          <Lines lines={[t.title[locale]]} className="display display-title text-frost md:col-span-12" />
          <p className="lede text-mist md:col-span-6 md:col-start-7">{t.intro[locale]}</p>
        </header>

        {/* ---------- LICENÇAS ---------- */}
        <InView as="section" aria-labelledby="license-h" className="reveal shell mt-24 md:mt-36">
          <div className="grid gap-10 border-t border-steel pt-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <LedNumber value={locale === "pt" ? "R$ 20.160" : "R$ 20,160"} className="num block text-[clamp(4.5rem,13vw,11.5rem)] text-signal" />
              <p className="display display-s mt-3 text-mist">{locale === "pt" ? "por ano, 4 licenças SAP" : "per year, 4 SAP licenses"}</p>
            </div>
            <div className="md:col-span-5">
              <h2 id="license-h" data-r className="display display-s text-frost">
                {t.licenseTitle[locale]}
              </h2>
              <p data-r style={{ "--i": 1 } as React.CSSProperties} className="prose-body mt-4 text-lg">
                {t.licenseBody[locale]}
              </p>
              <p className="meta mt-4">
                {copy.common.source[locale]}: {locale === "pt" ? "informado pelo autor" : "reported by the author"}
              </p>
              <Link href={`/${locale}/work/portal-operacoes-sap`} className="link mt-6 inline-flex items-center gap-2 text-frost">
                {copy.common.openCase[locale]}
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </InView>

        {/* ---------- MODELO ---------- */}
        <section aria-labelledby="model-h" className="mt-24 border-y border-steel bg-carbon py-20 md:mt-36 md:py-28">
          <div className="shell">
            <h2 id="model-h" className="display display-l max-w-[16ch] text-frost">
              {t.modelTitle[locale]}
            </h2>
            <div className="mt-14 grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="prose-body text-lg">{t.modelBody[locale]}</p>
                <div className="mt-10">
                  <LiftChart locale={locale} />
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <h3 className="display display-s text-frost">{t.leakTitle[locale]}</h3>
                <p className="mt-4 text-mist">{t.leakBody[locale]}</p>
                <div className="mt-8">
                  <AucSlope locale={locale} before={t.before[locale]} after={t.after[locale]} />
                </div>
              </div>
            </div>
            <p className="meta mt-12">
              {copy.common.source[locale]}: {locale === "pt" ? "auditoria do modelo, backtest walk-forward de 6 meses" : "model audit, 6-month walk-forward backtest"}
              {" — "}
              <Link href={`/${locale}/work/propensao-compra`} className="link-under">
                {copy.common.openCase[locale]}
              </Link>
            </p>
          </div>
        </section>

        {/* ---------- COMMITS ---------- */}
        <section aria-labelledby="timeline-h" className="shell mt-24 md:mt-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 id="timeline-h" className="display display-l text-frost md:col-span-7">
              {t.timelineTitle[locale]}
            </h2>
            <div className="md:col-span-5">
              <p className="num text-[clamp(3rem,6vw,5rem)] text-signal">
                {totalCommits()} <span className="text-[0.5em] text-mist">{t.commits[locale]}</span>
              </p>
              <p className="mt-3 text-mist">{t.timelineBody[locale]}</p>
            </div>
          </div>
          <div className="mt-12">
            <CommitMatrix locale={locale} weeks={matrix.weeks} rows={matrix.rows} names={names} commitsLabel={t.commits[locale]} />
          </div>
          <p className="meta mt-4">
            {copy.common.source[locale]}: GitHub API. {t.collected[locale]} {collected}.
          </p>
        </section>

        {/* ---------- ENTREGAS ---------- */}
        <section aria-labelledby="delivered-h" className="shell mt-24 md:mt-36">
          <h2 id="delivered-h" className="display display-l text-frost">
            {t.deliveredTitle[locale]}
          </h2>
          <ul className="mt-12 border-t border-steel">
            {delivered.map((d) => (
              <li key={d.slug} className="grid gap-2 border-b border-steel py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                <Link href={`/${locale}/work/${d.slug}`} className="display display-s text-frost transition-colors hover:text-signal md:col-span-5">
                  {d.what[locale]}
                </Link>
                <span className="text-mist md:col-span-5">{d.detail[locale]}</span>
                <span className="md:col-span-2 md:text-right">
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="link-under inline-flex items-center gap-1 text-metal">
                      {locale === "pt" ? "Abrir" : "Open"}
                      <Icon name="arrow-up-right" size={14} />
                      <span className="sr-only">
                        {d.what[locale]} ({copy.common.external[locale]})
                      </span>
                    </a>
                  ) : (
                    <span className="meta">{locale === "pt" ? "Uso interno" : "Internal use"}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </PageTransition>
  );
}
