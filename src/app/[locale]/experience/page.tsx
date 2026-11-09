import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { InView } from "@/components/motion/InView";
import { copy } from "@/content/copy";
import { experience } from "@/content/profile";
import { getProject } from "@/content/projects";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/experience">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/experience", title: copy.experience.title, description: copy.experience.intro });
}

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const locale = await resolveLocale(params);
  const period = (p: string) => (locale === "en" ? p.replace("atual", "present") : p);

  return (
    <PageTransition>
      <main id="main" className="shell pt-32 md:pt-44">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <Lines lines={[copy.experience.title[locale]]} className="display display-title text-frost md:col-span-12" />
          <p className="lede text-mist md:col-span-6 md:col-start-7">{copy.experience.intro[locale]}</p>
        </header>

        {/* Linha do tempo: período fixo à esquerda, papel à direita. */}
        <ol className="relative mt-20 md:mt-28">
          <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-steel md:left-[calc(25%+5px)]" />
          {experience.map((role, i) => (
            <InView as="li" key={`${role.company}-${role.period}`} className="reveal relative grid gap-4 pb-16 pl-8 md:grid-cols-12 md:gap-8 md:pb-24 md:pl-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full md:left-[25%] ${i === 0 ? "bg-signal shadow-[0_0_14px_var(--signal)]" : "border border-iron bg-void"}`}
              />
              <div className="md:col-span-3 md:pr-8">
                <p data-r className="num text-[1.9rem] text-frost md:sticky md:top-28">
                  {period(role.period)}
                </p>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <h2 data-r style={{ "--i": 1 } as React.CSSProperties} className="display display-m text-frost">
                  {role.title[locale]}
                </h2>
                <p data-r style={{ "--i": 1 } as React.CSSProperties} className="mt-2 text-lg font-semibold text-mist">
                  {role.company === "Projetos próprios e para clientes" && locale === "en" ? "Own and client projects" : role.company}
                </p>
                <p data-r style={{ "--i": 2 } as React.CSSProperties} className="prose-body mt-5 text-lg">
                  {role.summary[locale]}
                </p>
                <ul data-r style={{ "--i": 3 } as React.CSSProperties} className="mt-6 space-y-3">
                  {role.items.map((item, j) => (
                    <li key={j} className="flex gap-4 text-mist">
                      <span aria-hidden="true" className="mt-[0.8rem] h-px w-4 shrink-0 bg-iron" />
                      {item[locale]}
                    </li>
                  ))}
                </ul>
                {role.tech.length > 0 && <p className="meta mt-6">{role.tech.join(", ")}</p>}
                {role.projects && (
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]">
                    <span className="text-metal">{copy.experience.related[locale]}:</span>
                    {role.projects.map((slug) => (
                      <Link key={slug} href={`/${locale}/work/${slug}`} className="link-under text-mist">
                        {getProject(slug)?.name}
                      </Link>
                    ))}
                  </p>
                )}
              </div>
            </InView>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-steel pt-10">
          <a href={`/cv/rheverson-urbiche-cv-${locale}.pdf`} download className="btn">
            {copy.common.downloadCv[locale]}
          </a>
          <Link href={`/${locale}/skills`} className="btn btn-ghost">
            {copy.skills.title[locale]}
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
