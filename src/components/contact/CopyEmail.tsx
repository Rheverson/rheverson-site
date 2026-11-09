"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-mist ring-1 ring-iron transition-colors hover:text-frost hover:ring-mist"
    >
      <Icon name={copied ? "check" : "copy"} size={16} className={copied ? "text-signal" : undefined} />
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
