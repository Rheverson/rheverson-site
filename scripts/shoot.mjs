// Screenshots de inspeção visual (QA local).
// Uso: node scripts/shoot.mjs <baseUrl> <outDir> <width[,width...]> <path> [path...]
//   --full   captura a página inteira
//   --reduce emula prefers-reduced-motion
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const full = args.includes("--full");
const reduce = args.includes("--reduce");
const [base, out, widthsArg, ...paths] = args.filter((a) => !a.startsWith("--"));
const widths = widthsArg.split(",").map(Number);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const errors = [];
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: reduce ? "reduce" : "no-preference",
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await context.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push(`[${width}] ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`[${width}] pageerror ${e.message}`));
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    if (full) {
      // Rola para disparar as revelações por IntersectionObserver.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) errors.push(`[${width}] ${p} horizontal overflow ${overflow}px`);
    const name = `${p.replace(/\//g, "_") || "_root"}-${width}${full ? "-full" : ""}.png`;
    await page.screenshot({ path: join(out, name), fullPage: full });
    console.log("✓", name);
  }
  await context.close();
}
await browser.close();
if (errors.length) console.log("ISSUES:\n" + errors.join("\n"));
