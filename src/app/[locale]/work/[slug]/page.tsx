import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { InView } from "@/components/motion/InView";
import { LedNumber } from "@/components/motion/LedNumber";
import { Pipeline } from "@/components/viz/Pipeline";
import { CaseNav } from "@/components/work/CaseNav";
import { Icon } from "@/components/Icon";
import { copy } from "@/content/copy";
import { getProject, kindLabel, projectName, projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales, type Locale } from "@/content/types";
import { resolveLocale } from "@/lib/i18n";
import { jsonLdScript, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ locale, path: `/work/${slug}`, title: { pt: p.name, en: projectName(p, "en") }, description: p.tagline });
}

/** Números no formato do idioma (vírgula ↔ ponto). */
const localizeValue = (value: string, locale: Locale) => {
  if (locale === "pt") return value;
  return value
    .replace(/(\d)\.(\d{3})/g, "$1,$2")
    .replace(/(\d),(\d{1,2})(?!\d)/g, "$1.$2")
    .replace("~43 mil", "~43k");
};

export default async function CasePage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const p = getProject(slug);
  if (!p) notFound();

  const s = copy.work.sections;
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const toc = [
    { id: "context", label: s.context[locale] },
    { id: "problem", label: s.problem[locale] },
    { id: "goal", label: s.goal[locale] },
    { id: "role", label: s.role[locale] },
    { id: "strategy", label: s.strategy[locale] },
    { id: "solution", label: s.solution[locale] },
    { id: "architecture", label: s.architecture[locale] },
    { id: "results", label: s.results[locale] },
    ...(p.lesson ? [{ id: "lesson", label: s.lesson[locale] }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectName(p, locale),
    description: p.tagline[locale],
    url: `${site.url}/${locale}/work/${p.slug}`,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    author: { "@id": `${site.url}/#person` },
    keywords: p.stack.join(", "),
    ...(p.links[0] ? { sameAs: p.links.map((l) => l.href) } : {}),
  };

  return (
    <PageTransition>
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

        {/* ---------- ABERTURA ---------- */}
        <header className="shell pt-28 md:pt-40">
          <nav aria-label="Breadcrumb" className="meta">
            <Link href={`/${locale}/work`} className="link hover:text-frost">
              {copy.work.title[locale]}
            </Link>
            <span aria-hidden="true" className="mx-2 text-iron">
              /
            </span>
            <span aria-current="page" className="text-mist">
              {projectName(p, locale)}
            </span>
          </nav>

          <ViewTransition name={`case-title-${p.slug}`} share="morph" default="none">
            <h1 className="display display-l mt-6 text-frost">{projectName(p, locale)}</h1>
          </ViewTransition>
          <p className="lede mt-8 max-w-[34ch] md:max-w-[42ch]">{p.tagline[locale]}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-sm bg-steel sm:grid-cols-2 lg:grid-cols-4">
            {[
              [copy.work.meta.type[locale], kindLabel[p.kind][locale]],
              [copy.work.meta.period[locale], p.period],
              [copy.work.meta.team[locale], p.team[locale]],
              [copy.work.meta.stack[locale], p.stack.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="bg-void p-5">
                <dt className="meta">{k}</dt>
                <dd className="mt-2 text-[0.98rem] leading-snug text-frost">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? "btn" : "btn btn-ghost"}
              >
                {l.label[locale]}
                <Icon name="arrow-up-right" size={16} />
                <span className="sr-only">({copy.common.external[locale]})</span>
              </a>
            ))}
            {p.links.length === 0 && <p className="max-w-[60ch] text-mist">{copy.work.privateNote[locale]}</p>}
          </div>
          {p.note && (
            <p className="meta mt-5 flex max-w-[70ch] items-start gap-3">
              <span className="led-dot mt-1.5 shrink-0" aria-hidden="true" />
              {p.note[locale]}
            </p>
          )}
        </header>

        {/* ---------- TELAS ---------- */}
        {p.images && (
          <InView as="figure" className="reveal shell mt-16 md:mt-24" aria-label={s.gallery[locale]}>
            <div data-r className="relative">
              <div className="overflow-hidden rounded-md bg-graphite ring-1 ring-steel">
                <div className="flex h-8 items-center gap-1.5 border-b border-steel px-4" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-iron" />
                  <span className="h-2 w-2 rounded-full bg-iron" />
                  <span className="h-2 w-2 rounded-full bg-iron" />
                </div>
                <Image
                  src={p.images.desktop}
                  alt={p.images.alt[locale]}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1440px) 1340px, 94vw"
                  priority
                  className="w-full"
                />
              </div>
              <div
                data-r
                style={{ "--i": 2 } as React.CSSProperties}
                className="absolute -bottom-10 right-[4%] w-[26%] max-w-[260px] overflow-hidden rounded-[1.4rem] border-4 border-graphite shadow-[0_40px_80px_-30px_rgba(0,0,0,1)] ring-1 ring-iron md:-bottom-16"
              >
                <Image
                  src={p.images.mobile}
                  alt={locale === "pt" ? `${p.images.alt.pt} no celular` : `${p.images.alt.en} on mobile`}
                  width={780}
                  height={1688}
                  sizes="260px"
                  className="w-full"
                />
              </div>
            </div>
          </InView>
        )}

        {/* ---------- CORPO ---------- */}
        <div className="shell mt-24 grid gap-12 md:mt-36 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <CaseNav items={toc} label={copy.work.onThisPage[locale]} />
          </aside>

          <article className="min-w-0 space-y-20 lg:col-span-9 lg:col-start-4 md:space-y-28 xl:col-span-8 xl:col-start-5">
            {(
              [
                ["context", p.context],
                ["problem", p.problem],
                ["goal", p.goal],
                ["role", p.role],
              ] as const
            ).map(([id, text]) => (
              <section key={id} id={id} aria-labelledby={`${id}-h`}>
                <h2 id={`${id}-h`} className="display display-s text-metal">
                  {s[id][locale]}
                </h2>
                <p className={`mt-5 ${id === "problem" ? "lede" : "prose-body text-lg"}`}>{text[locale]}</p>
              </section>
            ))}

            {(
              [
                ["strategy", p.strategy],
                ["solution", p.solution],
              ] as const
            ).map(([id, list]) => (
              <section key={id} id={id} aria-labelledby={`${id}-h`}>
                <h2 id={`${id}-h`} className="display display-s text-metal">
                  {s[id][locale]}
                </h2>
                <ul className="mt-6 border-t border-steel">
                  {list.map((item, i) => (
                    <li key={i} className="flex gap-5 border-b border-steel py-5">
                      <span aria-hidden="true" className="mt-[0.7rem] h-px w-6 shrink-0 bg-signal" />
                      <span className="text-[1.05rem] text-mist">{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section id="architecture" aria-labelledby="architecture-h">
              <div className="rounded-sm border border-steel bg-carbon p-6 md:p-10">
                <h2 id="architecture-h" className="display display-s text-metal">
                  {p.pipeline.title[locale]}
                </h2>
                <div className="mt-10">
                  <Pipeline steps={p.pipeline.steps} locale={locale} label={p.pipeline.title[locale]} />
                </div>
              </div>
            </section>

            <InView as="section" id="results" aria-labelledby="results-h" className="reveal">
              <h2 id="results-h" className="display display-s text-metal">
                {s.results[locale]}
              </h2>
              <dl className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {p.results.map((r, i) => (
                  <div key={r.value + i} data-r style={{ "--i": i } as React.CSSProperties} className="border-t border-iron pt-5">
                    <dt className="sr-only">{r.label[locale]}</dt>
                    <dd>
                      <LedNumber value={localizeValue(r.value, locale)} className="num block text-[clamp(3rem,6vw,5.25rem)] text-signal" />
                      <p aria-hidden="true" className="mt-3 text-mist">
                        {r.label[locale]}
                      </p>
                      <p className="meta mt-2">
                        {copy.common.source[locale]}: {r.source === "Informado pelo autor" && locale === "en" ? "Reported by the author" : r.source}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </InView>

            {p.lesson && (
              <section id="lesson" aria-labelledby="lesson-h">
                <h2 id="lesson-h" className="display display-s text-metal">
                  {s.lesson[locale]}
                </h2>
                <blockquote className="mt-6 border-l-2 border-signal pl-6 md:pl-8">
                  <p className="lede">{p.lesson[locale]}</p>
                </blockquote>
              </section>
            )}
          </article>
        </div>

        {/* ---------- PRÓXIMO ---------- */}
        <nav aria-label={copy.work.next[locale]} className="shell mt-28 md:mt-40">
          <Link
            href={`/${locale}/work/${next.slug}`}
            transitionTypes={["to-case"]}
            className="group block border-t border-steel pt-8"
          >
            <span className="meta">{copy.work.next[locale]}</span>
            <span className="display display-l mt-3 flex items-end justify-between gap-6 text-frost transition-colors duration-500 group-hover:text-signal">
              {projectName(next, locale)}
              <Icon name="arrow-right" size={56} className="mb-2 hidden h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-500 group-hover:translate-x-3 sm:block" />
            </span>
          </Link>
        </nav>
      </main>
    </PageTransition>
  );
}
