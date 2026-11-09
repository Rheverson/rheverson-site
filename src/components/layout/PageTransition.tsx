import { ViewTransition } from "react";

/**
 * Transição de página: a anterior afunda e some, a nova sobe.
 * Fica no page (não no layout), como recomenda o guia de view transitions.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
