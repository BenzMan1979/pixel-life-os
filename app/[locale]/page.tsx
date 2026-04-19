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
      {/* banner — double css frame, no ascii art (immune to font drift) */}
      <section>
        <div className="banner-frame">
          <div className="banner-frame-inner">
            <span>pixel-life.os</span>
            <span className="dot">·</span>
            <span>v0.0.1</span>
            <span className="dot">·</span>
            <span>devlog</span>
          </div>
        </div>
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
          current={380}
          max={4516}
          cells={28}
          label="pixel-life.os  site build"
          caption={`+40 module-split workflow · +30 AI tri-tier spec lock · +60 RWD pass · +30 matrix rain · +40 character panel · +20 banner refactor · +40 devlog 001/002 · +120 day-0 scaffold`}
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
