import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { InView } from "@/components/motion/InView";
import { copy } from "@/content/copy";
import { education, languages } from "@/content/profile";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/about", title: copy.about.title, description: copy.about.lead });
}

const years = ["2019", "2023", "2024"];

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const a = copy.about;

  return (
    <PageTransition>
      <main id="main" className="pt-32 md:pt-44">
        <header className="shell">
          <Lines lines={[a.title[locale]]} className="display display-title text-frost" />
          <p className="display display-m mt-10 max-w-[18ch] text-mist md:mt-14">{a.lead[locale]}</p>
        </header>

        {/* Narrativa em capítulos: o ano em escala grande, o texto ao lado. */}
        <section aria-label={locale === "pt" ? "Trajetória" : "Path"} className="shell mt-24 md:mt-36">
          {a.chapters.map((c, i) => (
            <InView key={i} as="article" className="reveal grid gap-6 border-t border-steel py-12 md:grid-cols-12 md:py-16">
              <p data-r aria-hidden="true" className="num text-[clamp(4.5rem,11vw,9rem)] text-metal md:col-span-4">
                {years[i]}
              </p>
              <div className="md:col-span-7 md:col-start-6">
                <h2 data-r style={{ "--i": 1 } as React.CSSProperties} className="display display-s text-frost">
                  {c.title[locale]}
                </h2>
                <p data-r style={{ "--i": 2 } as React.CSSProperties} className="prose-body mt-5 text-lg">
                  {c.body[locale]}
                </p>
              </div>
            </InView>
          ))}
        </section>

        {/* Filosofia */}
        <section aria-labelledby="philosophy" className="mt-20 border-y border-steel bg-carbon py-20 md:mt-28 md:py-28">
          <div className="shell">
            <h2 id="philosophy" className="display display-l text-frost">
              {a.philosophyTitle[locale]}
            </h2>
            <InView as="ul" className="reveal mt-14 grid gap-px overflow-hidden rounded-sm bg-steel md:grid-cols-2">
              {a.philosophy.map((p, i) => (
                <li key={i} data-r style={{ "--i": i } as React.CSSProperties} className="bg-carbon p-7 md:p-10">
                  <h3 className="display display-s text-frost">{p.title[locale]}</h3>
                  <p className="mt-4 text-mist">{p.body[locale]}</p>
                </li>
              ))}
            </InView>
          </div>
        </section>

        <div className="shell mt-24 grid gap-16 md:mt-32 md:grid-cols-12">
          <section aria-labelledby="problems" className="md:col-span-6">
            <h2 id="problems" className="display display-m text-frost">
              {a.problemsTitle[locale]}
            </h2>
            <ul className="mt-8 border-t border-steel">
              {a.problems.map((p, i) => (
                <li key={i} className="flex gap-4 border-b border-steel py-4 text-lg text-mist">
                  <span aria-hidden="true" className="mt-[0.85rem] h-px w-5 shrink-0 bg-signal" />
                  {p[locale]}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="goals" className="md:col-span-5 md:col-start-8">
            <h2 id="goals" className="display display-m text-frost">
              {a.goalsTitle[locale]}
            </h2>
            <p className="prose-body mt-8 text-lg">{a.goals[locale]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/experience`} className="btn btn-ghost">
                {copy.experience.title[locale]}
              </Link>
              <Link href={`/${locale}/contact`} className="btn">
                {copy.common.contact[locale]}
              </Link>
            </div>
          </section>
        </div>

        <div className="shell mt-24 grid gap-16 md:mt-32 md:grid-cols-12">
          <section aria-labelledby="education" className="md:col-span-7">
            <h2 id="education" className="display display-s text-metal">
              {a.educationTitle[locale]}
            </h2>
            <ul className="mt-6 border-t border-steel">
              {education.map((e) => (
                <li key={e.school} className="grid gap-1 border-b border-steel py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <span>
                    <span className="font-semibold text-frost">{e.course[locale]}</span>
                    <span className="text-mist"> — {e.school}</span>
                  </span>
                  <span className="meta tabular-nums">{e.period[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="languages" className="md:col-span-4 md:col-start-9">
            <h2 id="languages" className="display display-s text-metal">
              {a.languagesTitle[locale]}
            </h2>
            <ul className="mt-6 border-t border-steel">
              {languages.map((l) => (
                <li key={l.name.pt} className="flex justify-between border-b border-steel py-4">
                  <span className="font-semibold text-frost">{l.name[locale]}</span>
                  <span className="text-mist">{l.level[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
