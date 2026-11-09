import { copy } from "@/content/copy";
import { education, experience, languages, skillGroups } from "@/content/profile";
import { projectName, projects } from "@/content/projects";
import { site } from "@/content/site";
import { resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/cv">) {
  const locale = await resolveLocale(params);
  return pageMetadata({
    locale,
    path: "/cv",
    title: { pt: "Currículo", en: "Résumé" },
    description: site.description,
    noindex: true,
  });
}

/**
 * Versão imprimível do currículo. Gera os PDFs em public/cv via
 * `npm run cv`. Sem telefone, sem foto, sem endereço.
 */
export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const locale = await resolveLocale(params);
  const pt = locale === "pt";
  const highlighted = ["propensao-compra", "portal-operacoes-sap", "planejapp", "tudoparaeventos", "kluska", "lucroradar-ai"];
  const roles = experience.filter((r) => r.company !== "IJCSUD — Bahia");
  const period = (p: string) => (pt ? p : p.replace("atual", "present"));

  return (
    <main id="main" className="cv-page px-4 pb-16 pt-24 print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] justify-end gap-3 print:hidden">
        <a href={`/cv/rheverson-urbiche-cv-${locale}.pdf`} download className="btn">
          {copy.common.downloadCv[locale]}
        </a>
      </div>

      <article className="cv-sheet mx-auto max-w-[210mm] bg-white px-[14mm] py-[12mm] text-[9pt] leading-[1.38] text-neutral-800 shadow-2xl print:max-w-none print:shadow-none">
        <header className="flex items-end justify-between gap-6 border-b-2 border-neutral-900 pb-4">
          <div>
            <h1 className="display text-[34pt] leading-none text-neutral-950">{site.name}</h1>
            <p className="mt-2 text-[10.5pt] font-semibold text-neutral-700">
              {pt ? "Analista de TI — Dados, SAP Business One e IA aplicada" : "IT Analyst — Data, SAP Business One and applied AI"}
            </p>
          </div>
          <ul className="shrink-0 whitespace-nowrap text-right text-[8.6pt] leading-[1.55] text-neutral-700">
            <li>{site.location[locale]}</li>
            <li>{site.email}</li>
            <li>linkedin.com/in/rheverson-antunes-urbiche-a1868716b</li>
            <li>github.com/Rheverson</li>
            <li>{site.url.replace(/^https?:\/\//, "")}</li>
          </ul>
        </header>

        <section className="mt-3">
          <h2 className="cv-h">{pt ? "Resumo" : "Summary"}</h2>
          <p>
            {pt
              ? "Analista de TI numa indústria de painéis de LED, promovido do comercial pela atuação em integração e BI. Administro o SAP Business One, construo dashboards em Power BI, um portal de operações integrado ao SAP e um pipeline SAP HANA → Databricks com modelo de propensão de compra auditado. Em paralelo, desenvolvo produtos digitais próprios com pagamentos, apps e IA. Cursando Ciência de Dados."
              : "IT analyst at an LED panel manufacturer, promoted from sales for my work on integration and BI. I administer SAP Business One and build Power BI dashboards, an SAP-integrated operations portal and an SAP HANA → Databricks pipeline with an audited purchase-propensity model. In parallel, I build my own digital products with payments, apps and AI. Data Science student."}
          </p>
        </section>

        <section className="mt-3">
          <h2 className="cv-h">{pt ? "Experiência" : "Experience"}</h2>
          <ul className="space-y-2">
            {roles.map((r) => (
              <li key={`${r.company}-${r.period}`} className="break-inside-avoid">
                <p className="flex justify-between gap-4">
                  <span>
                    <strong className="text-neutral-950">{r.title[locale]}</strong>
                    <span className="text-neutral-600">
                      {" — "}
                      {r.company === "Projetos próprios e para clientes" && !pt ? "Own and client projects" : r.company}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums text-neutral-600">{period(r.period)}</span>
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-neutral-400">
                  {r.items.map((it, i) => (
                    <li key={i}>{it[locale]}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-3">
          <h2 className="cv-h">{pt ? "Projetos selecionados" : "Selected projects"}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {highlighted.map((slug) => {
              const p = projects.find((x) => x.slug === slug)!;
              return (
                <li key={slug} className="break-inside-avoid">
                  <strong className="text-neutral-950">{projectName(p, locale)}</strong>
                  <span className="text-neutral-600"> — {p.tagline[locale]}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-3">
          <h2 className="cv-h">{pt ? "Competências" : "Skills"}</h2>
          <dl className="grid grid-cols-[34mm_1fr] gap-x-4 gap-y-1">
            {skillGroups.map((g) => (
              <div key={g.id} className="contents">
                <dt className="font-semibold text-neutral-950">{g.title[locale]}</dt>
                <dd>{g.skills.map((s) => (typeof s.name === "string" ? s.name : s.name[locale])).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-8">
          <section>
            <h2 className="cv-h">{pt ? "Formação" : "Education"}</h2>
            <ul className="space-y-0.5">
              {education.map((e) => (
                <li key={e.school} className="flex justify-between gap-4">
                  <span>
                    <strong className="text-neutral-950">{e.course[locale]}</strong> — {e.school}
                  </span>
                  <span className="shrink-0 text-neutral-600">{e.period[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="cv-h">{pt ? "Idiomas" : "Languages"}</h2>
            <ul className="space-y-0.5">
              {languages.map((l) => (
                <li key={l.name.pt}>
                  <strong className="text-neutral-950">{l.name[locale]}</strong> — {l.level[locale]}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
