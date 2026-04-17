import { getTranslations } from "next-intl/server";

type Status = "done" | "active" | "todo";

type Milestone = {
  key:
    | "kickoff"
    | "poc"
    | "art"
    | "core"
    | "battle"
    | "gear"
    | "twin"
    | "polish"
    | "ship";
  status: Status;
  eta: string;
};

const ROADMAP: Milestone[] = [
  { key: "kickoff", status: "done",   eta: "M0  2026-04" },
  { key: "poc",     status: "active", eta: "M1  2026-05" },
  { key: "art",     status: "todo",   eta: "M1  2026-05" },
  { key: "core",    status: "todo",   eta: "M2  2026-06" },
  { key: "battle",  status: "todo",   eta: "M3  2026-07" },
  { key: "gear",    status: "todo",   eta: "M4  2026-08" },
  { key: "twin",    status: "todo",   eta: "M5  2026-09" },
  { key: "polish",  status: "todo",   eta: "M7-8 2026-11" },
  { key: "ship",    status: "todo",   eta: "M9  2026-12" },
];

const MARK: Record<Status, string> = {
  done:   "[x]",
  active: "[>]",
  todo:   "[ ]",
};

export async function MilestoneProgress() {
  const t = await getTranslations("milestone");
  const done = ROADMAP.filter((m) => m.status === "done").length;
  const total = ROADMAP.length;
  const pct = Math.round((done / total) * 100);

  return (
    <section
      className="term-frame"
      data-label="roadmap.mvp"
      data-ext={`${done}/${total} ${pct}%`}
      style={{ marginTop: "2rem" }}
    >
      <h2 style={{ marginTop: 0 }}>{t("title")}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0" }}>
        {ROADMAP.map((m) => {
          const colour =
            m.status === "done"
              ? "var(--fg-bright)"
              : m.status === "active"
              ? "var(--accent)"
              : "var(--fg-dim)";
          return (
            <li
              key={m.key}
              style={{
                display: "grid",
                gridTemplateColumns: "3.5em 1fr 11em",
                gap: "1rem",
                padding: "0.25rem 0",
                color: colour,
                fontSize: "1rem",
              }}
            >
              <span>{MARK[m.status]}</span>
              <span>{t(m.key)}</span>
              <span style={{ color: "var(--fg-dim)", textAlign: "right" }}>
                {m.eta}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
