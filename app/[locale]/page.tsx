import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { listDevLogs } from "@/lib/devlog";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { PixelHpBar } from "@/components/PixelHpBar";
import { MilestoneProgress } from "@/components/MilestoneProgress";
import { VisitCounter } from "@/components/VisitCounter";
import { CharacterPanel } from "@/components/CharacterPanel";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const [latest] = await listDevLogs(locale);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* banner */}
      <section>
        <pre
          style={{
            color: "var(--fg-dim)",
            fontSize: "0.8rem",
            margin: 0,
            lineHeight: 1.2,
            whiteSpace: "pre",
            overflow: "hidden",
            // force a single mono family so box-drawing chars and Latin
            // come from the SAME font. VT323 lacks U+2500-U+257F so mixing
            // families caused sub-pixel width drift across 37 cells.
            fontFamily:
              'ui-monospace, "SF Mono", Menlo, Consolas, "Courier New", monospace',
            letterSpacing: 0,
          }}
          aria-hidden
        >
{`╔═══════════════════════════════════════╗
║  pixel-life.os  ·  v0.0.1  ·  devlog  ║
╚═══════════════════════════════════════╝`}
        </pre>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.1rem",
            color: "var(--fg-bright)",
          }}
        >
          {t("tagline")}
        </p>
      </section>

      {/* website HP — a meta joke: the site itself has HP that grows as more is built */}
      <section className="term-frame" data-label="site.hp" data-ext="self-demo">
        <PixelHpBar
          current={120}
          max={4516}
          cells={28}
          label="pixel-life.os  site build"
          caption={`current: scaffold only. every shipped feature raises this bar.`}
        />
      </section>

      {/* character panel — the site itself as a hero */}
      <CharacterPanel />

      {/* milestones */}
      <MilestoneProgress />

      {/* latest log */}
      <section>
        <TerminalPrompt cwd="~/devlog" command="ls -t | head -1" />
        {latest ? (
          <article
            className="term-frame"
            data-label={`devlog-${latest.id}.log`}
            data-ext={latest.date}
            style={{ marginTop: "0.75rem" }}
          >
            <h2 style={{ marginTop: 0 }}>{latest.title}</h2>
            <p style={{ color: "var(--fg-dim)" }}>{latest.summary}</p>
            <Link
              href={`/${locale}/devlog/${latest.slug}`}
              style={{ display: "inline-block", marginTop: "0.75rem" }}
            >
              → cat devlog-{latest.id}.log
            </Link>
          </article>
        ) : (
          <p style={{ color: "var(--fg-dim)" }}>...no logs yet.</p>
        )}
        <div style={{ marginTop: "0.75rem" }}>
          <Link href={`/${locale}/devlog`}>{t("readAll")}</Link>
        </div>
      </section>

      {/* visit counter */}
      <section style={{ marginTop: "1rem", textAlign: "center" }}>
        <VisitCounter label={t("visits")} />
      </section>
    </div>
  );
}
