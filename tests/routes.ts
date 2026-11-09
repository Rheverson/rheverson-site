import { projects } from "../src/content/projects";

export const pages = ["", "/work", "/impact", "/services", "/about", "/experience", "/skills", "/contact"];
export const routes = ["pt", "en"].flatMap((l) => [...pages, ...projects.map((p) => `/work/${p.slug}`)].map((p) => `/${l}${p}`));
