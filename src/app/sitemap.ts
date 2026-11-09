import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/content/types";

const pages = ["", "/work", "/impact", "/services", "/about", "/experience", "/skills", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...projects.map((p) => `/work/${p.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/work/") ? 0.8 : 0.7,
      alternates: {
        languages: {
          "pt-BR": `${site.url}/pt${path}`,
          en: `${site.url}/en${path}`,
        },
      },
    })),
  );
}
