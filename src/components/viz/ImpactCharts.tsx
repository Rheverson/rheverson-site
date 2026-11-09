import { InView } from "@/components/motion/InView";
import type { Locale } from "@/content/types";

const fmt = (n: number, locale: Locale, digits = 2) =>
  n.toLocaleString(locale === "pt" ? "pt-BR" : "en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** Barras horizontais: lift@10% do modelo contra baselines (backtest de 6 meses). */
export function LiftChart({ locale }: { locale: Locale }) {
  const rows = [
    { label: { pt: "Gradient boosting (modelo)", en: "Gradient boosting (model)" }, value: 4.19, hi: true },
    { label: { pt: "Regressão logística", en: "Logistic regression" }, value: 4.26 },
    { label: { pt: "RFM, sem machine learning", en: "RFM, no machine learning" }, value: 4.14 },
    { label: { pt: "Aleatório", en: "Random" }, value: 1.14 },
  ];
  const max = 5;
  return (
    <InView as="figure" className="reveal">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {locale === "pt" ? "Lift nos 10% melhor ranqueados, por abordagem" : "Lift in the top-ranked 10%, by approach"}
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{locale === "pt" ? "Abordagem" : "Approach"}</th>
            <th scope="col">Lift@10%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label.pt} className="block border-b border-steel py-4 first:border-t">
              <th scope="row" className={`block text-[0.98rem] font-medium ${r.hi ? "text-frost" : "text-mist"}`}>
                {r.label[locale]}
              </th>
              <td className="mt-3 flex items-center gap-4">
                <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-graphite">
                  <span
                    data-grow
                    style={{ width: `${(r.value / max) * 100}%`, "--i": i } as React.CSSProperties}
                    className={`absolute inset-y-0 left-0 rounded-full ${r.hi ? "bg-signal" : r.value < 2 ? "bg-iron" : "bg-mist"}`}
                  />
                </span>
                <span className={`num w-20 text-right text-[2rem] ${r.hi ? "text-signal" : "text-frost"}`}>
                  {fmt(r.value, locale)}×
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </InView>
  );
}

/** Inclinação antes/depois: ROC-AUC com vazamento × corrigido. */
export function AucSlope({ locale, before, after }: { locale: Locale; before: string; after: string }) {
  // Escala vertical de 0,5 (aleatório) a 1,0.
  const y = (v: number) => 20 + (1 - (v - 0.5) / 0.5) * 220;
  return (
    <InView as="figure" className="reveal">
      <svg viewBox="0 0 420 270" className="h-auto w-full" role="img" aria-label={locale === "pt" ? "ROC-AUC caiu de 0,905 para cerca de 0,76 após a correção de vazamento" : "ROC-AUC dropped from 0.905 to about 0.76 after fixing leakage"}>
        {[0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1="40" x2="400" y1={y(v)} y2={y(v)} stroke="var(--steel)" strokeDasharray="2 6" />
            <text x="0" y={y(v) + 4} fill="var(--metal)" fontSize="12">
              {fmt(v, locale)}
            </text>
          </g>
        ))}
        <line data-draw pathLength={1} x1="110" y1={y(0.905)} x2="330" y2={y(0.76)} stroke="var(--signal)" strokeWidth="2" />
        <circle cx="110" cy={y(0.905)} r="7" fill="var(--void)" stroke="var(--mist)" strokeWidth="2" />
        <circle cx="330" cy={y(0.76)} r="7" fill="var(--signal)" />
        <text x="110" y={y(0.905) - 18} textAnchor="middle" fill="var(--mist)" fontSize="26" fontFamily="var(--font-display)" fontWeight="700">
          {fmt(0.905, locale, 3)}
        </text>
        <text x="330" y={y(0.76) - 18} textAnchor="middle" fill="var(--signal)" fontSize="26" fontFamily="var(--font-display)" fontWeight="700">
          ~{fmt(0.76, locale)}
        </text>
        <text x="110" y="262" textAnchor="middle" fill="var(--metal)" fontSize="13">
          {before}
        </text>
        <text x="330" y="262" textAnchor="middle" fill="var(--metal)" fontSize="13">
          {after}
        </text>
      </svg>
    </InView>
  );
}

/**
 * Matriz de LEDs: uma linha por projeto, uma coluna por semana de 2026.
 * O brilho do ponto é proporcional aos commits da semana.
 */
export function CommitMatrix({
  locale,
  weeks,
  rows,
  names,
  commitsLabel,
}: {
  locale: Locale;
  weeks: string[];
  rows: { slug: string; total: number; values: number[] }[];
  names: Record<string, string>;
  commitsLabel: string;
}) {
  const max = Math.max(1, ...rows.flatMap((r) => r.values));
  const months = locale === "pt" ? ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthStarts = weeks
    .map((w, i) => ({ i, m: Number(w.slice(5, 7)) - 1, d: Number(w.slice(8, 10)) }))
    .filter((x, idx, arr) => idx === 0 || x.m !== arr[idx - 1].m)
    .filter((x, idx, arr) => !arr[idx + 1] || arr[idx + 1].i - x.i >= 3);

  return (
    <InView as="figure" className="reveal">
      <div className="overflow-x-auto pb-2" tabIndex={0} role="region" aria-label={locale === "pt" ? "Matriz de commits por semana (role para o lado)" : "Weekly commit matrix (scroll sideways)"}>
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[9.5rem_1fr_4rem] items-end gap-4 pb-3">
            <span />
            <div className="relative h-5" aria-hidden="true">
              {monthStarts.map((m) => (
                <span key={m.i} className="meta absolute text-[0.75rem]" style={{ left: `${(m.i / weeks.length) * 100}%` }}>
                  {months[m.m]}
                </span>
              ))}
            </div>
            <span />
          </div>
          {rows.map((r, ri) => (
            <div key={r.slug} data-r style={{ "--i": ri } as React.CSSProperties} className="grid grid-cols-[9.5rem_1fr_4rem] items-center gap-4 border-t border-steel py-3">
              <span className="truncate text-[0.95rem] text-mist">{names[r.slug]}</span>
              <span className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
                {r.values.map((v, i) => {
                  const a = v === 0 ? 0 : 0.25 + 0.75 * Math.sqrt(v / max);
                  return (
                    <span
                      key={i}
                      title={`${weeks[i]}: ${v} ${commitsLabel}`}
                      className="aspect-square rounded-full"
                      style={{
                        background: v === 0 ? "var(--led-off)" : `color-mix(in oklab, var(--signal) ${Math.round(a * 100)}%, var(--led-off))`,
                        boxShadow: v > max * 0.4 ? "0 0 8px color-mix(in oklab, var(--signal) 55%, transparent)" : undefined,
                      }}
                    />
                  );
                })}
              </span>
              <span className="num text-right text-[1.5rem] text-frost">{r.total}</span>
            </div>
          ))}
        </div>
      </div>
      <table className="sr-only">
        <caption>{locale === "pt" ? "Total de commits por projeto em 2026" : "Total commits per project in 2026"}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.slug}>
              <th scope="row">{names[r.slug]}</th>
              <td>{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InView>
  );
}
