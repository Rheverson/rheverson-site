import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/assets/fonts");
const display = readFile(join(fontDir, "BigShoulders-ExtraBold.ttf"));
const text = readFile(join(fontDir, "SchibstedGrotesk-Medium.ttf"));

/** Imagem de compartilhamento no estilo do site: preto, matriz de LED e verde-sinal. */
export async function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const [displayData, textData] = await Promise.all([display, text]);
  const titleSize = title.length > 22 ? 104 : title.length > 14 ? 128 : 156;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#000",
          backgroundImage: "radial-gradient(circle at center, #1b2023 2px, transparent 2.6px)",
          backgroundSize: "22px 22px",
          color: "#e9edf2",
          fontFamily: "Schibsted",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#b9bfc7" }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#2bff88", boxShadow: "0 0 18px #2bff88" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "BigShoulders",
              fontSize: titleSize,
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#e9edf2",
              maxWidth: 1050,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 32, lineHeight: 1.3, color: "#b9bfc7", maxWidth: 980 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, color: "#8d939c" }}>
          <span style={{ fontFamily: "BigShoulders", fontSize: 40, color: "#2bff88", textTransform: "uppercase" }}>Rheverson Urbiche</span>
          <span>Dados · SAP Business One · IA</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "BigShoulders", data: displayData, weight: 800, style: "normal" },
        { name: "Schibsted", data: textData, weight: 500, style: "normal" },
      ],
    },
  );
}
