import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CrtOverlay } from "@/components/CrtOverlay";
import { BootSequence } from "@/components/BootSequence";
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { MatrixRain } from "@/components/MatrixRain";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  return (
    <NextIntlClientProvider>
      <div
        lang={locale}
        className={locale.startsWith("zh") ? "cjk" : ""}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <MatrixRain />
        <BootSequence />
        <div
          className="shell-content"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Header locale={locale} t={{ home: t("home"), devlog: t("devlog") }} />
          <main
            style={{
              flex: 1,
              width: "100%",
              maxWidth: "72ch",
              margin: "0 auto",
              padding: "1.5rem 1.25rem 4rem",
            }}
          >
            {children}
          </main>
          <Footer built={tf("built")} slogan={tf("slogan")} />
        </div>
        <CrtOverlay />
        <KonamiEasterEgg />
      </div>
    </NextIntlClientProvider>
  );
}

function Header({
  locale,
  t,
}: {
  locale: string;
  t: { home: string; devlog: string };
}) {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--fg-dim)",
        padding: "0.85rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--font-term)",
        fontSize: "1rem",
      }}
    >
      <Link
        href={`/${locale}`}
        style={{
          borderBottom: "none",
          color: "var(--fg-bright)",
          fontFamily: "var(--font-pixel)",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
        }}
      >
        pixel-life.os
      </Link>
      <nav style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
        <Link href={`/${locale}`} style={{ borderBottom: "none", color: "var(--fg-dim)" }}>
          {t.home}
        </Link>
        <Link href={`/${locale}/devlog`} style={{ borderBottom: "none", color: "var(--fg-dim)" }}>
          {t.devlog}
        </Link>
        <LocaleSwitcher current={locale} />
      </nav>
    </header>
  );
}

function Footer({ built, slogan }: { built: string; slogan: string }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--fg-dim)",
        padding: "1.25rem",
        fontSize: "0.85rem",
        color: "var(--fg-dim)",
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        textAlign: "center",
      }}
    >
      <span>{built}</span>
      <span style={{ color: "var(--accent)", letterSpacing: "0.02em" }}>
        {slogan}
      </span>
    </footer>
  );
}
