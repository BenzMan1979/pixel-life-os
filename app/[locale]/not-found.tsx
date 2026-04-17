import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <pre
        style={{
          color: "var(--danger)",
          margin: 0,
          fontSize: "0.8rem",
          lineHeight: 1.1,
          textShadow: "0 0 6px var(--danger)",
        }}
        aria-hidden
      >
{`        .-""""""-.
       /  _    _  \\
      |  (o)  (o)  |
      |     >      |
      |   '---'    |
       \\         /
        '-.___.-'
         [ HP 0 ]`}
      </pre>
      <h1 style={{ color: "var(--danger)", fontSize: "1.5rem", letterSpacing: "0.1em" }}>
        {t("subtitle")}
      </h1>
      <p style={{ color: "var(--fg-dim)" }}>{t("hint")}</p>
      <Link href="/">{t("revive")}</Link>
    </div>
  );
}
