"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function KonamiEasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[idx];
      if (e.key === expected) {
        idx += 1;
        if (idx === SEQUENCE.length) {
          idx = 0;
          setActive(true);
          window.setTimeout(() => setActive(false), 6000);
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-pixel)",
        fontSize: "1.5rem",
        color: "var(--accent)",
        textShadow: "0 0 12px var(--accent)",
      }}
    >
      <pre style={{ textAlign: "center" }}>
{`+99 HP
★ secret gained ★
you found a cheat.
`}
      </pre>
    </div>
  );
}
