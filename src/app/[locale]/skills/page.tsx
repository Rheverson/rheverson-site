import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { InView } from "@/components/motion/InView";
import { copy } from "@/content/copy";
import { skillGroups } from "@/content/profile";
import { getProject } from "@/content/projects";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/skills">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/skills", title: copy.skills.title, description: copy.skills.intro });
}

export default async function SkillsPage({ params }: PageProps<"/[locale]/skills">) {
  const locale = await resolveLocale(params);

  return (
    <PageTransition>
      <main id="main" className="shell pt-32 md:pt-44">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <Lines lines={[copy.skills.title[locale]]} className="display display-title text-frost md:col-span-12" />
          <p className="lede text-mist md:col-span-6 md:col-start-7">{copy.skills.intro[locale]}</p>
        </header>

        <nav aria-label={copy.skills.title[locale]} className="mt-14 flex flex-wrap gap-2">
          {skillGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-mist ring-1 ring-iron transition-colors hover:text-frost hover:ring-mist">
              {g.title[locale]}
            </a>
          ))}
        </nav>

        <div className="mt-16 md:mt-24">
          {skillGroups.map((g) => (
            <InView as="section" key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="reveal grid gap-8 border-t border-steel py-14 md:grid-cols-12 md:py-20">
              <div className="md:col-span-4">
                <h2 id={`${g.id}-h`} data-r className="display display-m text-frost md:sticky md:top-28">
                  {g.title[locale]}
                </h2>
                <p data-r style={{ "--i": 1 } as React.CSSProperties} className="mt-4 text-mist">
                  {g.intro[locale]}
                </p>
              </div>
              <ul className="md:col-span-8">
                {g.skills.map((s, i) => {
                  const name = typeof s.name === "string" ? s.name : s.name[locale];
                  return (
                    <li
                      key={name}
                      data-r
                      style={{ "--i": i + 1 } as React.CSSProperties}
                      className="grid gap-2 border-b border-steel py-5 first:pt-0 sm:grid-cols-12 sm:gap-6"
                    >
                      <span className="text-lg font-semibold text-frost sm:col-span-4">{name}</span>
                      <span className="text-mist sm:col-span-5">{s.use[locale]}</span>
                      <span className="text-[0.92rem] sm:col-span-3 sm:text-right">
                        {s.projects?.length ? (
                          <>
                            <span className="sr-only">{copy.skills.usedIn[locale]}: </span>
                            {s.projects.map((slug, j) => (
                              <span key={slug}>
                                {j > 0 && <span className="text-iron">, </span>}
                                <Link href={`/${locale}/work/${slug}`} className="link-under text-metal">
                                  {getProject(slug)?.name}
                                </Link>
                              </span>
                            ))}
                          </>
                        ) : (
                          <span className="text-metal">{locale === "pt" ? "Experiência profissional" : "Professional experience"}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </InView>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
