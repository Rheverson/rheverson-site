import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { PixelField } from "@/components/viz/PixelField";
import { Lines } from "@/components/motion/Lines";
import { InView } from "@/components/motion/InView";
import { LedNumber } from "@/components/motion/LedNumber";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { Icon } from "@/components/Icon";
import { copy } from "@/content/copy";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/profile";
import { site } from "@/content/site";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { totalCommits, weeklyTotals } from "@/lib/commits";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/", title: copy.meta.home.title, description: site.description, absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const h = copy.home;
  const featured = projects.filter((p) => p.featured);
  const cv = `/cv/rheverson-urbiche-cv-${locale}.pdf`;

  const numbers = [
    { value: locale === "pt" ? "R$ 20.160" : "R$ 20,160", label: { pt: "por ano em licenças SAP, com 4 contas usando só o portal", en: "a year in SAP licenses, with 4 accounts using only the portal" } },
    { value: locale === "pt" ? "4,2×" : "4.2×", label: { pt: "de lift na fila de propensão de compra", en: "lift on the purchase-propensity queue" } },
    { value: String(totalCommits()), label: { pt: "commits em 2026 nos projetos apresentados", en: "commits in 2026 across featured projects" } },
    { value: "18", label: { pt: "módulos no portal integrado ao SAP B1", en: "apps in the SAP B1-integrated portal" } },
  ];

  return (
    <PageTransition>
      <main id="main">
        {/* ---------- HERO ---------- */}
        <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <PixelField series={weeklyTotals()} className="absolute inset-0 -z-10 h-full w-full" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(0,0,0,0.92)_30%,rgba(0,0,0,0.35)_70%,transparent_100%)]"
          />

          <div className="shell flex flex-1 flex-col justify-end pb-10 pt-28 md:pb-14">
            <p className="max-w-[38ch] text-[1.02rem] leading-relaxed text-mist md:text-lg">{h.kicker[locale]}</p>

            <Lines id="hero-title" lines={["Rheverson", "Urbiche"]} className="display display-xl mt-6 text-frost" delay={80} />

            <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
              <p className="lede md:col-span-6">
                <span className="text-frost">{h.statement[locale]}</span>{" "}
                <span className="text-mist">
                  {locale === "pt"
                    ? "Dados, SAP Business One, sistemas e IA aplicada, conectados para resolver problemas reais de operação."
                    : "Data, SAP Business One, systems and applied AI, connected to solve real operational problems."}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
                <Link href={`/${locale}/work`} className="btn">
                  {h.ctaWork[locale]}
                </Link>
                <Link href={`/${locale}/contact`} className="btn btn-ghost">
                  {h.ctaContact[locale]}
                </Link>
              </div>
            </div>

            <p className="meta mt-10 hidden max-w-[52ch] md:block">
              <span className="led-dot mr-2 align-middle" aria-hidden="true" />
              {h.signalCaption[locale]}
            </p>
          </div>
        </section>

        {/* ---------- TRÊS FRENTES ---------- */}
        <InView as="section" aria-labelledby="proofs-title" className="reveal shell pt-28 md:pt-40">
          <h2 id="proofs-title" className="display display-l max-w-[12ch] text-frost">
            {h.proofsTitle[locale]}
          </h2>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-steel md:grid-cols-3">
            {h.proofs.map((p, i) => (
              <li key={p.href} data-r style={{ "--i": i } as React.CSSProperties} className="flex flex-col bg-void p-6 md:p-8">
                <h3 className="display display-m text-frost">{p.title[locale]}</h3>
                <p className="mt-5 flex-1 text-mist">{p.body[locale]}</p>
                <Link href={`/${locale}${p.href}`} className="group mt-8 flex items-center justify-between gap-4 border-t border-steel pt-5">
                  <span className="font-semibold text-signal">{p.fact[locale]}</span>
                  <Icon name="arrow-right" className="shrink-0 text-mist transition-transform duration-300 group-hover:translate-x-1 group-hover:text-frost" />
                </Link>
              </li>
            ))}
          </ol>
        </InView>

        {/* ---------- PROJETOS ---------- */}
        <section aria-labelledby="work-title" className="shell pt-28 md:pt-40">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="work-title" className="display display-l text-frost">
              {h.workTitle[locale]}
            </h2>
            <Link href={`/${locale}/work`} className="link pb-2 text-mist hover:text-frost">
              {copy.common.allWork[locale]} ({projects.length})
            </Link>
          </div>
          <ProjectIndex items={featured} locale={locale} />
        </section>

        {/* ---------- NÚMEROS ---------- */}
        <InView as="section" aria-labelledby="numbers-title" className="reveal mt-28 border-y border-steel bg-carbon py-20 md:mt-40 md:py-28">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="numbers-title" className="display display-m max-w-[14ch] text-frost">
                {h.numbersTitle[locale]}
              </h2>
              <Link href={`/${locale}/impact`} className="link pb-1 text-mist hover:text-frost">
                {h.numbersLink[locale]}
              </Link>
            </div>
            <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {numbers.map((n, i) => (
                <div key={n.value} data-r style={{ "--i": i } as React.CSSProperties} className="border-t border-iron pt-5">
                  <dt className="sr-only">{n.label[locale]}</dt>
                  <dd>
                    <LedNumber value={n.value} className="num block whitespace-nowrap text-[clamp(3.2rem,5.4vw,5.25rem)] text-signal" />
                    <p aria-hidden="true" className="mt-3 max-w-[24ch] text-mist">
                      {n.label[locale]}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </InView>

        {/* ---------- ONDE ATUO ---------- */}
        <InView as="section" aria-labelledby="skills-title" className="reveal shell pt-28 md:pt-40">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 id="skills-title" className="display display-m text-frost">
                {h.skillsTitle[locale]}
              </h2>
              <Link href={`/${locale}/skills`} className="link mt-6 inline-block text-mist hover:text-frost">
                {h.skillsLink[locale]}
              </Link>
            </div>
            <ul className="md:col-span-8">
              {skillGroups.map((g, i) => (
                <li key={g.id} data-r style={{ "--i": i } as React.CSSProperties} className="grid gap-2 border-t border-steel py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-6">
                  <Link href={`/${locale}/skills#${g.id}`} className="font-semibold text-frost transition-colors hover:text-signal">
                    {g.title[locale]}
                  </Link>
                  <span className="text-metal">
                    {g.skills
                      .slice(0, 4)
                      .map((s) => (typeof s.name === "string" ? s.name : s.name[locale]))
                      .join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </InView>

        {/* ---------- DOIS CAMINHOS ---------- */}
        <section aria-label={locale === "pt" ? "Próximos passos" : "Next steps"} className="shell pt-28 md:pt-40">
          <div className="grid gap-px overflow-hidden rounded-sm bg-steel md:grid-cols-2">
            {(
              [
                ["recruiters", cv, `/${locale}/experience`, true],
                ["companies", `/${locale}/services`, `/${locale}/contact`, false],
              ] as const
            ).map(([key, primary, secondary, download]) => {
              const p = h.paths[key];
              return (
                <div key={key} className="group relative flex min-h-[26rem] flex-col justify-between bg-graphite p-7 md:p-12">
                  <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative">
                    <h2 className="display display-m text-frost">{p.title[locale]}</h2>
                    <p className="mt-6 max-w-[40ch] text-mist">{p.body[locale]}</p>
                  </div>
                  <div className="relative mt-10 flex flex-wrap gap-3">
                    {download ? (
                      <a href={primary} download className="btn">
                        <Icon name="download" size={16} />
                        {p.primary[locale]}
                      </a>
                    ) : (
                      <Link href={primary} className="btn">
                        {p.primary[locale]}
                      </Link>
                    )}
                    <Link href={secondary} className="btn btn-ghost">
                      {p.secondary[locale]}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
