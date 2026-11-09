import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const R = ["11110", "10001", "10001", "11110", "10100", "10010", "10001"];
const U = ["10001", "10001", "10001", "10001", "10001", "10001", "01110"];

/** Ícone da tela inicial: o monograma "RU" em LEDs. */
export default function AppleIcon() {
  const dots: { x: number; y: number }[] = [];
  [R, U].forEach((glyph, gi) =>
    glyph.forEach((row, y) => [...row].forEach((bit, x) => bit === "1" && dots.push({ x: x + gi * 6, y }))),
  );
  const cell = 13;
  const ox = (180 - 10 * cell) / 2;
  const oy = (180 - 6 * cell) / 2;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", position: "relative" }}>
        {dots.map((d) => (
          <div
            key={`${d.x}-${d.y}`}
            style={{
              position: "absolute",
              left: ox + d.x * cell - 5,
              top: oy + d.y * cell - 5,
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#2bff88",
            }}
          />
        ))}
      </div>
    ),
    size,
  );
}
