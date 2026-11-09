import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://localhost:3200";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL, trace: "off" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
  // Sem BASE_URL, sobe o build de produção local.
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run start -- --port 3200", url: baseURL, reuseExistingServer: true, timeout: 120_000 },
});
