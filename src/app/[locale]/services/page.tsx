import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { InView } from "@/components/motion/InView";
import { copy } from "@/content/copy";
import { services } from "@/content/profile";
import { getProject } from "@/content/projects";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/services", title: copy.services.title, description: copy.services.intro });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = await resolveLocale(params);
  const t = copy.services;

  return (
    <PageTransition>
      <main id="main" className="shell pt-32 md:pt-44">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <Lines lines={[t.title[locale]]} className="display display-title text-frost md:col-span-12" />
          <p className="lede text-mist md:col-span-6 md:col-start-7">{t.intro[locale]}</p>
        </header>

        <div className="mt-20 md:mt-28">
          {services.map((s) => (
            <InView as="article" key={s.id} aria-labelledby={`svc-${s.id}`} className="reveal grid gap-6 border-t border-steel py-12 md:grid-cols-12 md:gap-8 md:py-16">
              <p data-r className="display display-s text-mist md:col-span-5">
                <span aria-hidden="true" className="text-signal">“</span>
                {s.problem[locale]}
                <span aria-hidden="true" className="text-signal">”</span>
              </p>
              <div className="md:col-span-6 md:col-start-7">
                <h2 id={`svc-${s.id}`} data-r style={{ "--i": 1 } as React.CSSProperties} className="text-2xl font-semibold leading-tight text-frost md:text-[1.75rem]">
                  {s.title[locale]}
                </h2>
                <p data-r style={{ "--i": 2 } as React.CSSProperties} className="prose-body mt-4 text-lg">
                  {s.body[locale]}
                </p>
                <p data-r style={{ "--i": 3 } as React.CSSProperties} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]">
                  <span className="text-metal">{t.proof[locale]}:</span>
                  {s.proof.map((slug) => (
                    <Link key={slug} href={`/${locale}/work/${slug}`} className="link-under text-mist">
                      {getProject(slug)?.name}
                    </Link>
                  ))}
                </p>
              </div>
            </InView>
          ))}
        </div>

        <section aria-labelledby="svc-cta" className="mt-12 rounded-sm border border-steel bg-graphite p-8 md:p-14">
          <h2 id="svc-cta" className="display display-l max-w-[14ch] text-frost">
            {t.ctaTitle[locale]}
          </h2>
          <p className="prose-body mt-6 text-lg">{t.ctaBody[locale]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact?topic=company`} className="btn">
              {copy.home.paths.companies.secondary[locale]}
            </Link>
            <Link href={`/${locale}/work`} className="btn btn-ghost">
              {copy.common.allWork[locale]}
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
