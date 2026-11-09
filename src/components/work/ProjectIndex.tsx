"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useRef, useState, useSyncExternalStore, ViewTransition } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Locale } from "@/content/types";
import { kindLabel, projectName, type Project, type ProjectKind } from "@/content/projects";
import { copy } from "@/content/copy";

const FINE = "(hover: hover) and (pointer: fine)";
const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getFinePointer = () => window.matchMedia(FINE).matches;

type Item = Pick<Project, "slug" | "name" | "nameEn" | "kind" | "period" | "tagline" | "domain" | "images">;

export function ProjectIndex({ items, locale, filter = false }: { items: Item[]; locale: Locale; filter?: boolean }) {
  const [kind, setKind] = useState<ProjectKind | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const finePointer = useSyncExternalStore(subscribePointer, getFinePointer, () => false);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 });

  const kinds = Array.from(new Set(items.map((i) => i.kind)));
  const visible = kind === "all" ? items : items.filter((i) => i.kind === kind);
  const current = items.find((i) => i.slug === hovered);

  const onMove = (e: React.PointerEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div>
      {filter && (
        <div role="group" aria-label={copy.work.filterLabel[locale]} className="mb-10 flex flex-wrap gap-2">
          {(["all", ...kinds] as const).map((k) => {
            const active = kind === k;
            const count = k === "all" ? items.length : items.filter((i) => i.kind === k).length;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={active}
                onClick={() => startTransition(() => setKind(k))}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
                  active ? "bg-frost text-void" : "text-mist ring-1 ring-iron hover:text-frost hover:ring-mist"
                }`}
              >
                {k === "all" ? copy.work.all[locale] : kindLabel[k][locale]}
                <span className={`tabular-nums ${active ? "text-void/60" : "text-metal"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <ul ref={listRef} className="relative border-t border-steel" onPointerMove={finePointer ? onMove : undefined}>
        {visible.map((p) => (
          <ViewTransition key={p.slug}>
            <li
              className="group relative border-b border-steel"
              onPointerEnter={() => finePointer && setHovered(p.slug)}
              onPointerLeave={() => finePointer && setHovered(null)}
            >
              <Link
                href={`/${locale}/work/${p.slug}`}
                transitionTypes={["to-case"]}
                className="grid grid-cols-12 items-end gap-x-4 gap-y-3 py-7 md:py-9"
              >
                <span className="col-span-12 md:col-span-7">
                  <ViewTransition name={`case-title-${p.slug}`} share="morph" default="none">
                    <span className="display display-m block text-frost transition-[color,transform] duration-500 ease-out group-hover:translate-x-3 group-hover:text-signal">
                      {projectName(p, locale)}
                    </span>
                  </ViewTransition>
                </span>
                <span className="col-span-12 text-[0.98rem] leading-snug text-mist md:col-span-3">{p.tagline[locale]}</span>
                <span className="col-span-12 flex justify-between gap-4 text-sm text-metal md:col-span-2 md:flex-col md:items-end md:text-right">
                  <span>{kindLabel[p.kind][locale]}</span>
                  <span className="tabular-nums">{p.period}</span>
                </span>
              </Link>
              {/* Prévia inline em telas sem hover. */}
              {!finePointer && p.images && (
                <div className="-mt-2 mb-7 overflow-hidden rounded-md ring-1 ring-steel md:hidden">
                  <Image
                    src={p.images.desktop}
                    alt=""
                    width={1440}
                    height={900}
                    sizes="100vw"
                    className="aspect-[16/9] w-full object-cover object-top opacity-80"
                  />
                </div>
              )}
            </li>
          </ViewTransition>
        ))}

        {finePointer && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[min(30vw,420px)] md:block"
            style={{ x: reduce ? x : sx, y: reduce ? y : sy, translateX: "-50%", translateY: "-115%" }}
            initial={false}
            animate={{ opacity: current ? 1 : 0, scale: current ? 1 : 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {items.map((p) => (
              <div
                key={p.slug}
                className={`absolute inset-x-0 bottom-0 overflow-hidden rounded-md bg-graphite shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-iron transition-opacity duration-300 ${
                  hovered === p.slug ? "opacity-100" : "opacity-0"
                }`}
              >
                {p.images ? (
                  <Image src={p.images.desktop} alt="" width={840} height={525} sizes="420px" className="aspect-[16/10] w-full object-cover object-top" />
                ) : (
                  <div className="dot-grid flex aspect-[16/10] w-full flex-col justify-end p-5">
                    <span className="led-dot mb-3" />
                    <span className="display display-s text-frost">{p.domain[locale]}</span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </ul>
    </div>
  );
}
