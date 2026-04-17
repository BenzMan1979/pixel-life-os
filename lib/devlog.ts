import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type DevLogMeta = {
  id: string;          // zero-padded, e.g. "000"
  slug: string;        // url slug, e.g. "day-zero"
  date: string;        // ISO date
  title: string;
  summary: string;
  milestone?: string;  // key into messages.milestone
  hpDelta?: number;    // +/- "hp" points earned this log
  tags?: string[];
};

export type DevLog = DevLogMeta & {
  body: string;        // raw markdown/mdx body
  locale: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "devlog");

export async function listDevLogs(locale: string): Promise<DevLogMeta[]> {
  const dir = path.join(CONTENT_ROOT, locale);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const logs = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(async (f) => (await readDevLog(locale, f.replace(/\.(md|mdx)$/, ""))) )
  );
  return logs
    .filter((x): x is DevLog => x !== null)
    .sort((a, b) => b.id.localeCompare(a.id))
    .map(({ body, locale: _l, ...meta }) => meta);
}

export async function readDevLog(
  locale: string,
  idOrSlug: string
): Promise<DevLog | null> {
  const dir = path.join(CONTENT_ROOT, locale);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return null;
  }
  // allow "000" or "000-day-zero" or "day-zero" to resolve
  const match = files.find((f) => {
    const base = f.replace(/\.(md|mdx)$/, "");
    return (
      base === idOrSlug ||
      base.startsWith(idOrSlug + "-") ||
      base.endsWith("-" + idOrSlug)
    );
  });
  if (!match) return null;

  const raw = await fs.readFile(path.join(dir, match), "utf8");
  const { data, content } = matter(raw);
  const baseName = match.replace(/\.(md|mdx)$/, "");
  const id = (data.id as string | undefined) ?? baseName.split("-")[0];
  const slug =
    (data.slug as string | undefined) ??
    baseName.replace(/^\d+-/, "");

  // gray-matter parses unquoted YAML dates into Date objects. force ISO yyyy-mm-dd.
  const rawDate = data.date;
  const date =
    rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : String(rawDate ?? "");

  return {
    id: String(id).padStart(3, "0"),
    slug,
    date,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    milestone: data.milestone as string | undefined,
    hpDelta: typeof data.hpDelta === "number" ? data.hpDelta : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    body: content,
    locale,
  };
}

export async function devLogSlugs(locale: string): Promise<string[]> {
  const metas = await listDevLogs(locale);
  return metas.map((m) => m.slug);
}
