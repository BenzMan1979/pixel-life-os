type Props = {
  current: number;
  max: number;
  cells?: number;
  /** label shown above the bar */
  label?: string;
  /** below the bar: something like "+234 above baseline" */
  caption?: string;
  tone?: "green" | "amber" | "red";
};

export function PixelHpBar({
  current,
  max,
  cells = 24,
  label,
  caption,
  tone = "green",
}: Props) {
  const ratio = Math.max(0, Math.min(1, current / max));
  const filled = Math.round(ratio * cells);
  const danger = tone === "red";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.9rem",
            color: "var(--fg-dim)",
          }}
        >
          <span>{label}</span>
          <span style={{ color: "var(--fg-bright)" }}>
            {current.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      <div
        className="hp-bar"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemax={max}
        aria-label={label ?? "progress"}
        style={{ ["--cells" as string]: cells }}
      >
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            className={`hp-cell ${i < filled ? "on" : ""} ${
              danger && i < filled ? "danger" : ""
            }`}
          />
        ))}
      </div>
      {caption && (
        <div style={{ fontSize: "0.85rem", color: "var(--fg-dim)" }}>
          {caption}
        </div>
      )}
    </div>
  );
}
