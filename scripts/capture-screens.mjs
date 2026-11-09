// Captura screenshots dos projetos públicos no ar (desktop + celular)
// e grava versões otimizadas em public/work/<slug>/.
// Uso: node scripts/capture-screens.mjs [slug...]
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SITES = {
  planejapp: "https://planejapp.com.br/",
  tudoparaeventos: "https://www.tudoparaeventos.com.br/",
  kluska: "https://www.kluska.store/",
  "lucroradar-ai": "https://lucroradar-ai.vercel.app/",
  "editora-wordpress": "https://universovivodaspalavras.com.br/",
};

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
};

const only = process.argv.slice(2);
const browser = await chromium.launch();

for (const [slug, url] of Object.entries(SITES)) {
  if (only.length && !only.includes(slug)) continue;
  const dir = new URL(`../public/shots/${slug}/`, import.meta.url);
  mkdirSync(dir, { recursive: true });
  for (const [name, vp] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      locale: "pt-BR",
      colorScheme: "dark",
    });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    } catch {
      await page.goto(url, { waitUntil: "load", timeout: 60_000 });
    }
    // Deixa animações de entrada terminarem.
    await page.waitForTimeout(2500);
    // Banner de cookies: escolhe a opção mais restritiva para limpar a captura.
    const reject = page.getByRole("button", { name: /rejeitar não essenciais/i });
    if (await reject.isVisible().catch(() => false)) {
      await reject.click();
      await page.waitForTimeout(600);
    }
    const png = await page.screenshot({ type: "png" });
    const width = name === "desktop" ? 1440 : 780;
    await sharp(png).resize({ width }).webp({ quality: 82 }).toFile(new URL(`${name}.webp`, dir).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
    console.log(`✓ ${slug} ${name}`);
    await context.close();
  }
}

await browser.close();
