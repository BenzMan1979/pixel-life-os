import { getTranslations } from "next-intl/server";
import { PixelSprite, type SpriteName } from "./PixelSprite";

type Slot = { sprite: SpriteName; key: SlotKey };
type SlotKey =
  | "weapon"
  | "offhand"
  | "head"
  | "body"
  | "legs"
  | "boots"
  | "amulet";

const SLOTS: Slot[] = [
  { sprite: "sword",  key: "weapon" },
  { sprite: "shield", key: "offhand" },
  { sprite: "helm",   key: "head" },
  { sprite: "armor",  key: "body" },
  { sprite: "legs",   key: "legs" },
  { sprite: "boots",  key: "boots" },
  { sprite: "amulet", key: "amulet" },
];

type AttrKey = "str" | "agi" | "int";
const ATTRS: { key: AttrKey; value: number; max: number }[] = [
  { key: "str", value: 12, max: 100 },
  { key: "agi", value: 18, max: 100 },
  { key: "int", value: 22, max: 100 },
];

function AttrBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const cells = 16;
  const filled = Math.round((value / max) * cells);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3.5em 1fr 3em",
        gap: "0.75rem",
        alignItems: "center",
        fontSize: "0.9rem",
      }}
    >
      <span style={{ color: "var(--fg-dim)", letterSpacing: "0.1em" }}>
        {label}
      </span>
      <div
        className="hp-bar"
        style={{ ["--cells" as string]: cells, height: 12 }}
      >
        {Array.from({ length: cells }).map((_, i) => (
          <div key={i} className={`hp-cell ${i < filled ? "on" : ""}`} />
        ))}
      </div>
      <span style={{ color: "var(--fg-bright)", textAlign: "right" }}>
        {value}/{max}
      </span>
    </div>
  );
}

export async function CharacterPanel() {
  const t = await getTranslations("character");

  return (
    <section
      className="term-frame"
      data-label="hero.pixel-life-os"
      data-ext="site.self"
    >
      <h2 style={{ marginTop: 0 }}>{t("title")}</h2>
      <p style={{ color: "var(--fg-dim)", margin: "0.25rem 0 1rem", fontSize: "0.85rem" }}>
        {t("caption")}
      </p>

      {/* attributes */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {ATTRS.map((a) => (
          <AttrBar
            key={a.key}
            label={a.key.toUpperCase()}
            value={a.value}
            max={a.max}
          />
        ))}
      </div>

      {/* ascii divider */}
      <div
        className="ascii-hr"
        style={{ margin: "1rem 0 0.75rem", fontSize: "0.75rem" }}
        aria-hidden
      >
        {"▪ ".repeat(24)}
      </div>

      {/* slots */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: "0.5rem",
          color: "var(--fg-dim)",
        }}
        aria-label={t("slots")}
      >
        {SLOTS.map((slot) => (
          <div
            key={slot.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
              border: "1px solid var(--fg-dim)",
              padding: "0.4rem 0.2rem",
              background: "var(--bg)",
            }}
            title={t(`slot.${slot.key}`)}
          >
            <PixelSprite name={slot.sprite} size={28} color="var(--fg-dim)" />
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.05em" }}>
              {t(`slot.${slot.key}`)}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          color: "var(--fg-dim)",
          fontSize: "0.75rem",
          marginTop: "0.75rem",
          textAlign: "right",
          fontStyle: "italic",
        }}
      >
        {t("locked")}
      </p>
    </section>
  );
}
