import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { copy } from "@/content/copy";
import { projects } from "@/content/projects";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/work", title: copy.work.title, description: copy.work.intro });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const locale = await resolveLocale(params);
  const items = projects.map(({ slug, name, kind, period, tagline, domain, images }) => ({ slug, name, kind, period, tagline, domain, images }));

  return (
    <PageTransition>
      <main id="main" className="shell pt-32 md:pt-44">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <Lines lines={[copy.work.title[locale]]} className="display display-title text-frost md:col-span-12" />
          <p className="lede text-mist md:col-span-6 md:col-start-7">{copy.work.intro[locale]}</p>
        </header>
        <div className="mt-16 md:mt-24">
          <ProjectIndex items={items} locale={locale} filter />
        </div>
      </main>
    </PageTransition>
  );
}
