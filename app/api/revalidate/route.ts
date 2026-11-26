import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation.
 *
 * POST /api/revalidate?tag=itch-games
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * Useful after publishing a game on itch.io or uploading a new video, so the
 * site updates immediately instead of waiting for the hourly cache window.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Revalidation is not configured." },
      { status: 501 },
    );
  }

  const provided =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret." },
      { status: 401 },
    );
  }

  const tag = new URL(request.url).searchParams.get("tag") ?? "itch-games";

  if (!["itch-games", "youtube"].includes(tag)) {
    return NextResponse.json(
      { ok: false, error: "Unknown tag." },
      { status: 400 },
    );
  }

  revalidateTag(tag, "max");

  return NextResponse.json({ ok: true, revalidated: tag, at: Date.now() });
}
