"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { Icon } from "@/components/Icon";
import { Monogram } from "./Monogram";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const rest = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
  const other: Locale = locale === "pt" ? "en" : "pt";
  const isActive = (href: string) => rest === href || rest.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-frost focus:px-4 focus:py-2 focus:text-void"
      >
        {copy.common.skip[locale]}
      </a>

      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open ? "border-b border-steel/70 bg-void/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-signal"
          style={{ scaleX: reduce ? scrollYProgress : progress }}
        />
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            className="group flex min-w-0 items-center gap-2.5 text-frost"
            aria-label={`Rheverson Urbiche — ${copy.common.home[locale]}`}
          >
            <Monogram size={18} className="text-signal transition-transform duration-500 group-hover:scale-110" />
            <span className="whitespace-nowrap text-[0.9rem] font-semibold tracking-tight sm:text-[0.95rem]">Rheverson Urbiche</span>
          </Link>

          <nav aria-label={locale === "pt" ? "Principal" : "Main"} className="hidden lg:block">
            <ul className="flex items-center gap-7 text-[0.93rem]">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`link py-1 transition-colors ${isActive(item.href) ? "text-signal" : "text-mist hover:text-frost"}`}
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${other}${rest}`}
              hrefLang={other === "pt" ? "pt-BR" : "en"}
              lang={other === "pt" ? "pt-BR" : "en"}
              className="inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-mist ring-1 ring-iron transition-colors hover:text-frost hover:ring-mist"
            >
              {other.toUpperCase()}
              <span className="sr-only"> — {copy.common.switchTo[locale]}</span>
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-frost ring-1 ring-iron lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={16} />
              {open ? copy.common.close[locale] : copy.common.menu[locale]}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={copy.common.menu[locale]}
            className="fixed inset-0 z-40 flex flex-col bg-void pt-20 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label={locale === "pt" ? "Principal" : "Main"} className="shell flex-1 overflow-y-auto">
              <ul className="border-t border-steel">
                {[{ key: "home", href: "", label: copy.common.home }, ...nav].map((item, i) => {
                  const active = item.href === "" ? rest === "" : isActive(item.href);
                  return (
                    <motion.li
                      key={item.key}
                      className="border-b border-steel"
                      initial={reduce ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.15 + i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`display flex items-baseline justify-between py-3 text-[clamp(2.4rem,11vw,4rem)] ${
                          active ? "text-signal" : "text-frost"
                        }`}
                      >
                        {item.label[locale]}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
