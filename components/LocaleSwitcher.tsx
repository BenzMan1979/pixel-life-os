"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALES = [
  { code: "en",    label: "EN" },
  { code: "zh-TW", label: "繁" },
];

export function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|zh-TW)/, "") || "/";

  return (
    <span style={{ display: "inline-flex", gap: "0.5rem", fontSize: "0.85rem" }}>
      {LOCALES.map((l, i) => {
        const active = l.code === current;
        return (
          <span key={l.code} style={{ display: "inline-flex", gap: "0.5rem" }}>
            {i > 0 && <span style={{ color: "var(--fg-dim)" }}>|</span>}
            {active ? (
              <span style={{ color: "var(--accent)" }}>[{l.label}]</span>
            ) : (
              <Link
                href={`/${l.code}${rest}`}
                style={{ borderBottom: "none", color: "var(--fg-dim)" }}
              >
                {l.label}
              </Link>
            )}
          </span>
        );
      })}
    </span>
  );
}
