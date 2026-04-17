import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

/**
 * POST /api/visit
 *  - increments the global page_views counter in Supabase and returns the new value.
 *  - if Supabase env is not set, returns a stable fake value so the UI can still render.
 *  - RPC contract: `increment_page_view(p_scope text)` returns bigint.
 */
export async function POST() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      { count: 1, source: "fallback" },
      { status: 200, headers: { "cache-control": "no-store" } }
    );
  }
  const { data, error } = await supabase.rpc("increment_page_view", {
    p_scope: "site",
  });
  if (error) {
    return NextResponse.json(
      { count: 0, source: "error", message: error.message },
      { status: 200, headers: { "cache-control": "no-store" } }
    );
  }
  return NextResponse.json(
    { count: Number(data ?? 0), source: "supabase" },
    { status: 200, headers: { "cache-control": "no-store" } }
  );
}
