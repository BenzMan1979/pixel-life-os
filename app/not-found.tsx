import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#0a0f08",
          color: "#f87171",
          fontFamily: "ui-monospace, Menlo, Consolas, monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "2rem",
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <pre style={{ margin: 0 }}>{`[ HP 0 ]  GAME OVER`}</pre>
        <Link href="/en" style={{ color: "#4ade80" }}>
          ← revive
        </Link>
      </body>
    </html>
  );
}
