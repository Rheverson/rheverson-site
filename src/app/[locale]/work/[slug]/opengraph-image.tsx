import { ogImage, ogSize } from "@/lib/og";
import { getProject, kindLabel, projectName } from "@/content/projects";
import { isLocale } from "@/content/types";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Estudo de caso — Rheverson Urbiche";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "pt";
  const p = getProject(slug);
  return ogImage({
    eyebrow: p ? `${locale === "pt" ? "Estudo de caso" : "Case study"} — ${kindLabel[p.kind][locale]}` : "Rheverson Urbiche",
    title: p ? projectName(p, locale) : "Rheverson Urbiche",
    subtitle: p?.tagline[locale] ?? "",
  });
}
