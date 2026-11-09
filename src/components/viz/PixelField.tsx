"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Série real: commits por semana em 2026 (todos os projetos). */
  series: number[];
  className?: string;
};

const GAP_DESKTOP = 14;
const GAP_MOBILE = 11;
const LENS = 170;

/**
 * Painel de LED do hero. Ruído cintilante por toda a matriz e, por baixo,
 * o sinal: colunas proporcionais aos commits de cada semana de 2026.
 * Uma varredura inicial acende o sinal; depois o cursor (ou o toque)
 * funciona como lente que separa o sinal do ruído.
 */
export function PixelField({ series, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const style = getComputedStyle(document.documentElement);
    const signal = style.getPropertyValue("--signal").trim() || "#2bff88";
    const frost = style.getPropertyValue("--frost").trim() || "#e9edf2";

    let width = 0;
    let height = 0;
    let gap = GAP_DESKTOP;
    let cols = 0;
    let rows = 0;
    let heights: number[] = [];
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let last = 0;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const max = Math.max(1, ...series);

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = width < 640 ? GAP_MOBILE : GAP_DESKTOP;
      cols = Math.floor(width / gap);
      rows = Math.floor(height / gap);
      const maxRows = Math.floor(rows * 0.62);
      heights = Array.from({ length: cols }, (_, c) => {
        const w = Math.min(series.length - 1, Math.floor((c / cols) * series.length));
        // Separa as semanas com uma coluna apagada quando há espaço.
        const startCol = Math.floor((w / series.length) * cols);
        if (cols / series.length >= 2 && c === startCol) return 0;
        const v = series[w] ?? 0;
        return v === 0 ? 0 : Math.max(1, Math.round(Math.sqrt(v / max) * maxRows));
      });
    };

    // Hash determinístico barato para o ruído.
    const noise = (c: number, r: number, frame: number) => {
      let h = (c * 374761393 + r * 668265263 + frame * 2246822519) | 0;
      h = (h ^ (h >>> 13)) * 1274126177;
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };

    const draw = (now: number) => {
      const t = now - start;
      const frame = Math.floor(t / 140);
      // Varredura: 0 → 1 em 1,8 s.
      const sweep = reduce ? 1 : Math.min(1, t / 1800);
      const sweepX = sweep * (cols + 6);

      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;

      ctx.clearRect(0, 0, width, height);
      const ox = (width - (cols - 1) * gap) / 2;
      const oy = (height - (rows - 1) * gap) / 2;
      const size = gap * 0.2;

      for (let c = 0; c < cols; c++) {
        const x = ox + c * gap;
        const bar = heights[c];
        const revealed = c < sweepX;
        const edge = Math.max(0, 1 - Math.abs(c - sweepX) / 3);
        for (let r = 0; r < rows; r++) {
          const y = oy + r * gap;
          const fromBottom = rows - 1 - r;
          const isBar = fromBottom < bar;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          let lens = pointer.active ? Math.max(0, 1 - d / LENS) : 0;
          lens = lens * lens * (3 - 2 * lens);

          let alpha: number;
          let color = frost;
          if (isBar && revealed) {
            color = signal;
            alpha = 0.26 + lens * 0.74 + edge * 0.6;
          } else {
            const n = noise(c, r, reduce ? 0 : frame);
            const flicker = n > 0.965 ? 0.32 : n > 0.85 ? 0.12 : 0.055;
            // Dentro da lente o ruído some: só o sinal fica.
            alpha = flicker * (1 - lens * 0.85) + edge * 0.35;
          }
          ctx.globalAlpha = Math.min(1, alpha);
          ctx.fillStyle = color;
          ctx.fillRect(x - size, y - size, size * 2, size * 2);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      // ~40 fps é suficiente para o ruído e economiza bateria.
      if (now - last < 24) return;
      last = now;
      draw(now);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.active = pointer.ty > -LENS && pointer.ty < rect.height + LENS;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    if (reduce) {
      draw(performance.now());
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [series]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
