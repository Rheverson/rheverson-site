import type { L } from "./types";

export const site = {
  name: "Rheverson Urbiche",
  fullName: "Rheverson Antunes Urbiche",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rheverson.vercel.app").replace(/\/$/, ""),
  email: "revlino53@gmail.com",
  linkedin: "https://www.linkedin.com/in/rheverson-antunes-urbiche-a1868716b/",
  github: "https://github.com/Rheverson",
  repo: "https://github.com/Rheverson/rheverson-site",
  location: { pt: "Curitiba, PR — Brasil", en: "Curitiba, Brazil" } satisfies L,
  role: { pt: "Analista de TI · Dados, SAP Business One e IA aplicada", en: "IT Analyst · Data, SAP Business One and applied AI" } satisfies L,
  description: {
    pt: "Analista de TI que conecta SAP Business One, engenharia de dados, BI, machine learning e desenvolvimento de software para transformar operação em decisão.",
    en: "IT analyst connecting SAP Business One, data engineering, BI, machine learning and software development to turn operations into decisions.",
  } satisfies L,
};

export type NavKey = "work" | "impact" | "services" | "about" | "experience" | "skills" | "contact";

export const nav: { key: NavKey; href: string; label: L }[] = [
  { key: "work", href: "/work", label: { pt: "Projetos", en: "Work" } },
  { key: "impact", href: "/impact", label: { pt: "Resultados", en: "Impact" } },
  { key: "services", href: "/services", label: { pt: "Serviços", en: "Services" } },
  { key: "about", href: "/about", label: { pt: "Sobre", en: "About" } },
  { key: "experience", href: "/experience", label: { pt: "Experiência", en: "Experience" } },
  { key: "skills", href: "/skills", label: { pt: "Competências", en: "Skills" } },
  { key: "contact", href: "/contact", label: { pt: "Contato", en: "Contact" } },
];
