import { Big_Shoulders, Schibsted_Grotesk } from "next/font/google";

/** Display: condensada e arquitetônica, ecoa letreiros e painéis de LED. */
export const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

/** Texto: grotesca editorial, com tom de jornal técnico. */
export const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});
