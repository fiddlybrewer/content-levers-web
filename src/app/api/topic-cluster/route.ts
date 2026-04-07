import { NextResponse } from "next/server";
import { analyzeSitemap } from "@/lib/topic-cluster";

export const runtime = "nodejs";
export const maxDuration = 120;

// Simple in-memory IP rate limit: 5 req / hour per IP
// (acceptable for a low-traffic free tool; resets on cold start)
const hits = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function checkLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: LIMIT - 1 };
  }
  if (entry.count >= LIMIT) return { ok: false, remaining: 0 };
  entry.count++;
  return { ok: true, remaining: LIMIT - entry.count };
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limit = checkLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Rate limit reached. Try again in an hour." },
      { status: 429 }
    );
  }

  let body: { url?: string; maxPages?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const url = (body.url ?? "").trim();
  if (!url || url.length > 500) {
    return NextResponse.json({ error: "Please provide a valid URL." }, { status: 400 });
  }

  // Clamp maxPages to a sane range on the server
  const allowedDepths = [1000, 2500, 5000, 10000];
  const maxPages = allowedDepths.includes(body.maxPages ?? 0) ? body.maxPages! : 1000;

  try {
    const result = await analyzeSitemap(url, { maxPages });
    if (result.analyzedPages === 0) {
      return NextResponse.json(
        {
          error:
            "Couldn't analyze any pages. Check that your sitemap URL is correct and publicly accessible.",
        },
        { status: 422 }
      );
    }
    return NextResponse.json(result, {
      headers: { "X-RateLimit-Remaining": String(limit.remaining) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to analyze sitemap: ${msg}` },
      { status: 500 }
    );
  }
}
