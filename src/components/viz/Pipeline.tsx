import { InView } from "@/components/motion/InView";
import type { PipelineStep } from "@/content/projects";
import type { Locale } from "@/content/types";

/**
 * Fluxo técnico desenhado como etapas conectadas. Um pulso verde percorre
 * a linha, do dado de origem até a entrega.
 */
export function Pipeline({ steps, locale, label }: { steps: PipelineStep[]; locale: Locale; label: string }) {
  return (
    <InView as="figure" className="reveal" aria-label={label}>
      <ol className="relative grid gap-0 xl:grid-flow-col xl:auto-cols-fr">
        {/* Linha-guia: horizontal no desktop, vertical no celular. */}
        <span aria-hidden="true" className="absolute left-[0.55rem] top-3 bottom-3 w-px bg-iron xl:left-0 xl:right-0 xl:top-[0.55rem] xl:bottom-auto xl:h-px xl:w-auto">
          <span data-grow className="absolute inset-0 hidden bg-signal/50 xl:block" />
          <span className="pulse-x absolute top-1/2 hidden h-1.5 w-10 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_14px_var(--signal)] xl:block" />
          <span className="pulse-y absolute left-1/2 h-10 w-1.5 -translate-x-1/2 rounded-full bg-signal shadow-[0_0_14px_var(--signal)] xl:hidden" />
        </span>
        {steps.map((s, i) => (
          <li key={i} data-r style={{ "--i": i } as React.CSSProperties} className="relative pb-8 pl-9 xl:pb-0 xl:pl-0 xl:pr-6 xl:pt-9">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 h-[1.1rem] w-[1.1rem] rounded-full border border-iron bg-void xl:top-0"
            >
              <span className={`absolute inset-[4px] rounded-full ${i === steps.length - 1 ? "bg-signal" : "bg-mist"}`} />
            </span>
            <p className="display text-[1.6rem] text-frost xl:text-[1.75rem]">{s.label[locale]}</p>
            <p className="mt-2 max-w-[24ch] text-[0.95rem] leading-snug text-metal">{s.detail[locale]}</p>
          </li>
        ))}
      </ol>
    </InView>
  );
}
