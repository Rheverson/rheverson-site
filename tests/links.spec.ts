import { expect, test } from "@playwright/test";
import { routes } from "./routes";

// LinkedIn bloqueia robôs (HTTP 999); o link é verificado manualmente.
const SKIP = [/linkedin\.com/];

test("todos os links internos e externos respondem", async ({ page, request }, info) => {
  test.skip(info.project.name !== "desktop", "roda uma vez");
  test.setTimeout(240_000);

  const found = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).href));
    hrefs.forEach((h) => found.add(h.split("#")[0]));
  }

  const failures: string[] = [];
  for (const url of found) {
    if (url.startsWith("mailto:") || SKIP.some((r) => r.test(url))) continue;
    const res = await request.get(url, { maxRedirects: 5, timeout: 30_000 }).catch((e) => ({ status: () => `ERR ${e.message}` }));
    const status = res.status();
    if (typeof status !== "number" || status >= 400) failures.push(`${status} ${url}`);
  }
  console.log(`${found.size} links verificados`);
  expect(failures).toEqual([]);
});
