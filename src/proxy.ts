import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["pt", "en"] as const;

/** Escolhe o idioma pelo Accept-Language; português é o padrão. */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    if (tag.startsWith("pt")) return "pt";
    if (tag.startsWith("en")) return "en";
  }
  return "pt";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Ignora internos do Next, arquivos estáticos e rotas de metadados.
  matcher: [
    "/((?!_next|api|apple-icon|favicon|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|pdf|txt|xml|webmanifest|js|css|map)$).*)",
  ],
};
