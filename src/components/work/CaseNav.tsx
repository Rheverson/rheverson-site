"use client";

import { useEffect, useState } from "react";

/** Índice lateral do estudo de caso com a seção atual destacada. */
export function CaseNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28 hidden lg:block">
      <p className="meta mb-4">{label}</p>
      <ul className="space-y-1 border-l border-steel">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-[0.95rem] transition-colors duration-300 ${
                  on ? "border-signal text-frost" : "border-transparent text-metal hover:text-mist"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
