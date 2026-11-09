import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "./routes";

for (const route of routes) {
  test(`${route} renderiza sem erros, sem overflow e sem violações sérias de acessibilidade`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(route, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, "rolagem horizontal").toBeLessThanOrEqual(0);

    // Revela o conteúdo animado antes da auditoria de contraste.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(1500);

    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);

    expect(errors).toEqual([]);
  });
}

test("raiz redireciona para um idioma", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(pt|en)$/);
});

test("rota inexistente devolve 404", async ({ page }) => {
  const res = await page.goto("/pt/nao-existe");
  expect(res?.status()).toBe(404);
});

test("troca de idioma mantém a página", async ({ page, isMobile }) => {
  await page.goto("/pt/impact");
  await page.getByRole("link", { name: "Read in English" }).click();
  await expect(page).toHaveURL(/\/en\/impact$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  test.info().annotations.push({ type: "viewport", description: isMobile ? "mobile" : "desktop" });
});

test("menu do celular abre, navega e fecha", async ({ page, isMobile }) => {
  test.skip(!isMobile, "apenas celular");
  await page.goto("/pt");
  await page.getByRole("button", { name: "Menu" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Serviços" }).click();
  await expect(page).toHaveURL(/\/pt\/services$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("formulário de contato valida e monta o e-mail", async ({ page }) => {
  await page.goto("/pt/contact");
  await page.getByRole("button", { name: "Abrir no meu e-mail" }).click();
  await expect(page.getByText("Preencha seu nome e a mensagem.")).toBeVisible();

  await page.getByRole("textbox", { name: "Seu nome" }).fill("Teste");
  await page.getByRole("textbox", { name: "Mensagem" }).fill("Olá!");
  await page.getByRole("button", { name: "Abrir no meu e-mail" }).click();
  await expect(page.getByText("Preencha seu nome e a mensagem.")).toHaveCount(0);
});

test("PDFs do currículo existem", async ({ request }) => {
  for (const l of ["pt", "en"]) {
    const res = await request.get(`/cv/rheverson-urbiche-cv-${l}.pdf`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  }
});

test("SEO: sitemap, robots, OG e JSON-LD", async ({ page, request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  await page.goto("/pt/work/planejapp");
  const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
  expect(og).toBeTruthy();
  const ogRes = await request.get(new URL(og!).pathname);
  expect(ogRes.status()).toBe(200);
  expect(await page.locator('link[rel="alternate"][hreflang="en"]').count()).toBe(1);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.join(" ")).toContain('"Person"');
});
