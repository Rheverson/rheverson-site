import { ogImage, ogSize } from "@/lib/og";
import { isLocale } from "@/content/types";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Rheverson Urbiche — Dados, SAP Business One e IA aplicada";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "pt";
  return ogImage({
    eyebrow: locale === "pt" ? "Portfólio" : "Portfolio",
    title: locale === "pt" ? "Do ERP à decisão" : "From ERP to decision",
    subtitle:
      locale === "pt"
        ? "Analista de TI: pipelines de dados, sistemas integrados ao SAP Business One e produtos com IA."
        : "IT analyst: data pipelines, systems integrated with SAP Business One and AI-powered products.",
  });
}
