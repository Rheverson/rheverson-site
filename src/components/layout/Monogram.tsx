/**
 * Monograma "RU" desenhado como matriz de LEDs 7×5 por letra.
 * O mesmo desenho é usado no favicon.
 */
const R = ["11110", "10001", "10001", "11110", "10100", "10010", "10001"];
const U = ["10001", "10001", "10001", "10001", "10001", "10001", "01110"];

export function Monogram({ size = 28, className }: { size?: number; className?: string }) {
  const dots: { x: number; y: number }[] = [];
  [R, U].forEach((glyph, gi) =>
    glyph.forEach((row, y) =>
      [...row].forEach((bit, x) => {
        if (bit === "1") dots.push({ x: x + gi * 6, y });
      }),
    ),
  );
  return (
    <svg
      viewBox="-0.5 -0.5 11 7"
      width={size * (11 / 7)}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={0.36} fill="currentColor" />
      ))}
    </svg>
  );
}
