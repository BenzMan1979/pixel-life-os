"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const BOOT_FLAG = "pl_booted_v1";
const LINE_DELAY = 320;

export function BootSequence() {
  const t = useTranslations("boot");
  const [lines, setLines] = useState<string[]>([]);
  const [hidden, setHidden] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(BOOT_FLAG) === "1";
    if (seen) return;
    setHidden(false);
    document.body.classList.add("booting");

    const script = [
      t("line1"),
      t("line2"),
      t("line3"),
      t("line4"),
      t("line5"),
      t("line6"),
      t("line7"),
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];
    script.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
          if (i === script.length - 1) setDone(true);
        }, LINE_DELAY * (i + 1))
      );
    });

    const dismiss = (e?: KeyboardEvent | MouseEvent) => {
      if (e && "key" in e && e.key !== "Escape" && e.key !== "Enter" && e.key !== " ") return;
      window.sessionStorage.setItem(BOOT_FLAG, "1");
      setHidden(true);
      document.body.classList.remove("booting");
    };

    const autoDismiss = setTimeout(() => dismiss(), LINE_DELAY * (script.length + 4));
    const onKey = (e: KeyboardEvent) => dismiss(e);
    const onClick = () => dismiss();
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(autoDismiss);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
      document.body.classList.remove("booting");
    };
  }, [t]);

  if (hidden) return null;

  return (
    <div
      role="dialog"
      aria-label="boot sequence"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "var(--bg)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "3rem 1.5rem",
        fontFamily: "var(--font-term)",
        color: "var(--fg)",
      }}
    >
      <pre
        style={{
          whiteSpace: "pre-wrap",
          margin: 0,
          fontSize: "1rem",
          lineHeight: 1.5,
          maxWidth: "80ch",
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>{`> ${line}`}</div>
        ))}
        {done && (
          <div style={{ marginTop: "1rem", color: "var(--fg-dim)" }}>
            {t("skip")}
          </div>
        )}
        {!done && <span className="cursor" />}
      </pre>
    </div>
  );
}
