import { notFound } from "next/navigation";

/** Qualquer caminho desconhecido dentro de /pt ou /en cai no 404 do site. */
export default function CatchAll() {
  notFound();
}
