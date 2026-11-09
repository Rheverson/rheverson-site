/**
 * Título revelado linha a linha por máscara (CSS puro, roda já no
 * primeiro paint, sem esperar a hidratação).
 */
export function Lines({
  lines,
  as: Tag = "h1",
  className,
  delay = 0,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-in" style={{ "--d": `${delay + i * 90}ms` } as React.CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
