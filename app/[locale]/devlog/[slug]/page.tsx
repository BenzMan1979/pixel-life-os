import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "@/i18n/routing";
import { readDevLog, devLogSlugs } from "@/lib/devlog";
import { TerminalPrompt } from "@/components/TerminalPrompt";

export async function generateStaticParams() {
  const pairs: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const slugs = await devLogSlugs(locale);
    for (const slug of slugs) pairs.push({ locale, slug });
  }
  return pairs;
}

export default async function DevLogPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const log = await readDevLog(locale, slug);
  if (!log) notFound();
  const t = await getTranslations({ locale, namespace: "devlog" });

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <TerminalPrompt
        cwd={`~/devlog`}
        command={`cat devlog-${log.id}.log`}
      />

      <header
        className="term-frame"
        data-label={`devlog-${log.id}.log`}
        data-ext={log.date}
      >
        <h1 style={{ marginTop: 0 }}>{log.title}</h1>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            gap: "0.25rem 1rem",
            margin: "0.75rem 0 0",
            color: "var(--fg-dim)",
            fontSize: "0.9rem",
          }}
        >
          <dt>id</dt><dd>#{log.id}</dd>
          <dt>date</dt><dd>{log.date}</dd>
          {log.milestone && (<><dt>milestone</dt><dd>{log.milestone}</dd></>)}
          {typeof log.hpDelta === "number" && (
            <>
              <dt>{t("hpDelta")}</dt>
              <dd style={{ color: log.hpDelta >= 0 ? "var(--fg-bright)" : "var(--danger)" }}>
                {log.hpDelta >= 0 ? "+" : ""}{log.hpDelta}
              </dd>
            </>
          )}
          {log.tags && log.tags.length > 0 && (
            <><dt>tags</dt><dd>{log.tags.map((tag) => `#${tag}`).join(" ")}</dd></>
          )}
        </dl>
      </header>

      <div className="prose-term">
        <MDXRemote source={log.body} />
      </div>

      <div className="ascii-hr" aria-hidden>
        {"─".repeat(60)}
      </div>
      <Link href={`/${locale}/devlog`}>{t("back")}</Link>
    </article>
  );
}
