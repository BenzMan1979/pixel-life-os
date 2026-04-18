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
    <header className="nav-header">
      <Link href={`/${locale}`} className="nav-logo">
        pixel-life.os
      </Link>
      <nav className="nav-links">
        <Link href={`/${locale}`} className="nav-link">
          {t.home}
        </Link>
        <Link href={`/${locale}/devlog`} className="nav-link">
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
      <span style={{ color: "var(--fg-bright)", letterSpacing: "0.02em" }}>
        {slogan}
      </span>
    </footer>
  );
}
