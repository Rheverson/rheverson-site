"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = "0123456789";

/**
 * Número que "acende" como um painel de LED: os dígitos embaralham
 * e assentam da esquerda para a direita quando entram na tela.
 * O valor final fica sempre acessível em texto.
 */
export function LedNumber({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;
    const chars = [...value];
    const digitIdx = chars.map((ch, i) => (DIGITS.includes(ch) ? i : -1)).filter((i) => i >= 0);
    if (!digitIdx.length) return;

    const run = () => {
      const t0 = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const settled = Math.floor(p * (digitIdx.length + 1));
        const next = chars.map((ch, i) => {
          const order = digitIdx.indexOf(i);
          if (order === -1 || order < settled) return ch;
          return DIGITS[Math.floor(Math.random() * 10)];
        });
        setDisplay(next.join(""));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
