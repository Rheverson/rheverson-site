import { PageTransition } from "@/components/layout/PageTransition";
import { Lines } from "@/components/motion/Lines";
import { ContactComposer } from "@/components/contact/ContactComposer";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Icon } from "@/components/Icon";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/contact", title: copy.contact.title, description: copy.contact.intro });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params);
  const c = copy.contact;

  const channels = [
    { label: "LinkedIn", href: site.linkedin, icon: "linkedin" as const, handle: "rheverson-antunes-urbiche" },
    { label: "GitHub", href: site.github, icon: "github" as const, handle: "Rheverson" },
  ];

  return (
    <PageTransition>
      <main id="main" className="shell pt-32 md:pt-44">
        <header>
          <p className="meta">{c.title[locale]}</p>
          <Lines lines={[c.lead[locale]]} className="display display-title mt-4 text-frost" />
          <p className="lede mt-8 max-w-[40ch] text-mist">{c.intro[locale]}</p>
        </header>

        <section aria-label="E-mail" className="mt-14 border-y border-steel py-8 md:mt-20 md:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={`mailto:${site.email}`}
              className="display break-all normal-case text-[clamp(2.1rem,7.4vw,6.5rem)] text-frost transition-colors hover:text-signal"
            >
              {site.email}
            </a>
            <CopyEmail email={site.email} label={c.copy[locale]} done={c.copied[locale]} />
          </div>
        </section>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
          <section aria-labelledby="form-h" className="lg:col-span-7">
            <h2 id="form-h" className="display display-m text-frost">
              {c.formTitle[locale]}
            </h2>
            <div className="mt-8">
              <ContactComposer locale={locale} email={site.email} />
            </div>
          </section>

          <aside className="space-y-14 lg:col-span-4 lg:col-start-9">
            <section aria-labelledby="cv-h">
              <h2 id="cv-h" className="display display-s text-metal">
                {c.cvTitle[locale]}
              </h2>
              <ul className="mt-5 border-t border-steel">
                {(["pt", "en"] as const).map((l) => (
                  <li key={l} className="border-b border-steel">
                    <a
                      href={`/cv/rheverson-urbiche-cv-${l}.pdf`}
                      download
                      hrefLang={l === "pt" ? "pt-BR" : "en"}
                      className="group flex items-center justify-between py-4 text-frost"
                    >
                      {l === "pt" ? c.cvPt[locale] : c.cvEn[locale]}
                      <Icon name="download" className="text-mist transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-signal" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="channels-h">
              <h2 id="channels-h" className="display display-s text-metal">
                {c.elsewhere[locale]}
              </h2>
              <ul className="mt-5 border-t border-steel">
                {channels.map((ch) => (
                  <li key={ch.label} className="border-b border-steel">
                    <a href={ch.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4">
                      <Icon name={ch.icon} className="text-mist group-hover:text-signal" />
                      <span className="flex-1">
                        <span className="block font-semibold text-frost">{ch.label}</span>
                        <span className="meta">{ch.handle}</span>
                      </span>
                      <Icon name="arrow-up-right" size={16} className="text-metal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="sr-only">({copy.common.external[locale]})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <p className="meta">{site.location[locale]}</p>
          </aside>
        </div>
      </main>
    </PageTransition>
  );
}
