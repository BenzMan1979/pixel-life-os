type Props = {
  cwd?: string;
  command: string;
  user?: string;
  host?: string;
};

export function TerminalPrompt({
  cwd = "~",
  command,
  user = "root",
  host = "pixel-life.os",
}: Props) {
  return (
    <div
      style={{
        fontFamily: "var(--font-term)",
        fontSize: "1rem",
        color: "var(--fg-dim)",
        letterSpacing: "0.02em",
        padding: "0.25rem 0",
      }}
    >
      <span style={{ color: "var(--fg-bright)" }}>{user}</span>
      <span>@</span>
      <span style={{ color: "var(--accent)" }}>{host}</span>
      <span>:</span>
      <span>{cwd}</span>
      <span style={{ color: "var(--fg)" }}>$ </span>
      <span style={{ color: "var(--fg)" }}>{command}</span>
    </div>
  );
}
