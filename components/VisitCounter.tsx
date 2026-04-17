"use client";

import { useEffect, useState } from "react";

type Props = { label: string; initial?: number | null };

/**
 * 7-segment-style pixel counter. falls back to "----" while loading or on error.
 * hits /api/visit once per session to increment then display.
 */
export function VisitCounter({ label, initial = null }: Props) {
  const [count, setCount] = useState<number | null>(initial);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let aborted = false;
    const hit = async () => {
      try {
        const res = await fetch("/api/visit", { method: "POST", cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { count: number };
        if (!aborted) setCount(data.count);
      } catch {
        if (!aborted) setErrored(true);
      }
    };
    hit();
    return () => {
      aborted = true;
    };
  }, []);

  const digits = (() => {
    if (errored) return "------";
    if (count == null) return "......";
    return count.toString().padStart(6, "0");
  })();

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.35rem" }}>
      <span style={{ fontSize: "0.8rem", color: "var(--fg-dim)", letterSpacing: "0.1em" }}>
        {label}
      </span>
      <span className="seven-seg" aria-live="polite">
        {digits.split("").join(" ")}
      </span>
    </div>
  );
}
