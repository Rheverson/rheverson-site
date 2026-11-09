"use client";

import { useId, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/content/types";
import { copy } from "@/content/copy";
import { Icon } from "@/components/Icon";

type Topic = "recruiter" | "company" | "other";

/**
 * Monta um e-mail pré-preenchido (mailto). Não envia nem armazena nada:
 * sem backend, sem chaves e sem coleta de dados pelo site.
 */
export function ContactComposer({ locale, email }: { locale: Locale; email: string }) {
  const c = copy.contact;
  const id = useId();
  const [chosen, setTopic] = useState<Topic | null>(null);
  // Permite chegar com ?topic=company a partir de Serviços.
  const fromUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("topic"),
    () => null,
  );
  const topic: Topic = chosen ?? (fromUrl === "company" || fromUrl === "other" ? fromUrl : "recruiter");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const topics: { value: Topic; label: string }[] = [
    { value: "recruiter", label: c.intentRecruiter[locale] },
    { value: "company", label: c.intentCompany[locale] },
    { value: "other", label: c.intentOther[locale] },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const label = topics.find((t) => t.value === topic)?.label ?? "";
    const subject = `${label} — ${name.trim()}${org.trim() ? ` (${org.trim()})` : ""}`;
    const body = `${message.trim()}\n\n— ${name.trim()}${org.trim() ? `, ${org.trim()}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "mt-2 w-full rounded-md bg-void px-4 py-3 text-frost ring-1 ring-iron transition-shadow placeholder:text-metal focus:outline-none focus:ring-2 focus:ring-signal";

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold text-mist">{c.intent[locale]}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label
              key={t.value}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal ${
                topic === t.value ? "bg-frost text-void ring-frost" : "text-mist ring-iron hover:text-frost"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-mist">
          {c.name[locale]}
          <input
            className={field}
            name="name"
            autoComplete="name"
            required
            aria-invalid={error && !name.trim() ? true : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm font-semibold text-mist">
          {c.org[locale]}
          <input className={field} name="organization" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
        </label>
      </div>

      <label className="block text-sm font-semibold text-mist">
        {c.message[locale]}
        <textarea
          className={`${field} min-h-40 resize-y`}
          name="message"
          required
          aria-invalid={error && !message.trim() ? true : undefined}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <div aria-live="polite" className="min-h-6 text-sm text-signal">
        {error ? c.required[locale] : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn">
          <Icon name="mail" size={16} />
          {c.send[locale]}
        </button>
        <p id={`${id}-note`} className="meta max-w-[42ch]">
          {c.formNote[locale]}
        </p>
      </div>
    </form>
  );
}
