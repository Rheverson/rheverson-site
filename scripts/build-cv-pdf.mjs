// Gera os PDFs do currículo a partir da rota /[locale]/cv.
// Uso: com o site rodando (npm run build && npm start), execute
//   node scripts/build-cv-pdf.mjs [baseUrl]   (padrão: http://localhost:3000)
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = new URL("../public/cv/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
for (const locale of ["pt", "en"]) {
  await page.goto(`${base}/${locale}/cv`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = new URL(`rheverson-urbiche-cv-${locale}.pdf`, outDir);
  await page.pdf({
    path: decodeURIComponent(file.pathname).replace(/^\/([A-Za-z]:)/, "$1"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`✓ cv ${locale}`);
}
await browser.close();
