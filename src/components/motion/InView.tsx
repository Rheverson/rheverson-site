"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marca o elemento com data-inview="true" quando entra na tela.
 * A animação fica no CSS (.reveal), então o conteúdo continua
 * visível sem JavaScript.
 */
export function InView({
  as: Tag = "div",
  className,
  children,
  threshold = 0.2,
  ...rest
}: {
  as?: "div" | "section" | "ul" | "ol" | "li" | "figure" | "header" | "article";
  className?: string;
  children: React.ReactNode;
  threshold?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} data-inview={inView ? "true" : "false"} className={className} {...rest}>
      {children}
    </Component>
  );
}
