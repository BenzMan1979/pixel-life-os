import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { listDevLogs } from "@/lib/devlog";
import { TerminalPrompt } from "@/components/TerminalPrompt";

export default async function DevLogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "devlog" });
  const logs = await listDevLogs(locale);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <TerminalPrompt cwd="~" command="ls ./devlog" />
        <h1 style={{ marginTop: "1rem" }}>{t("title")}</h1>
        <p style={{ color: "var(--fg-dim)" }}>{t("subtitle")}</p>
      </header>

      {logs.length === 0 && <p>{t("empty")}</p>}

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
        {logs.map((log) => (
          <li
            key={log.id}
            className="term-frame"
            data-label={`devlog-${log.id}.log`}
            data-ext={log.date}
          >
            <Link
              href={`/${locale}/devlog/${log.slug}`}
              style={{
                borderBottom: "none",
                display: "block",
                color: "var(--fg)",
              }}
            >
              <h2 style={{ margin: 0 }}>{log.title}</h2>
              <p style={{ color: "var(--fg-dim)", margin: "0.5rem 0 0" }}>
                {log.summary}
              </p>
              {typeof log.hpDelta === "number" && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.75rem",
                    color: log.hpDelta >= 0 ? "var(--fg-bright)" : "var(--danger)",
                    fontSize: "0.85rem",
                  }}
                >
                  {t("hpDelta")}: {log.hpDelta >= 0 ? "+" : ""}
                  {log.hpDelta}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
