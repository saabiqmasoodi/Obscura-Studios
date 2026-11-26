import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { fallbackGames } from "@/content/fallback-games";
import { gameOverrides } from "@/content/games";
import { site } from "@/content/site";
import { decodeEntities } from "@/lib/format";
import type { Game } from "@/types";

const ITCH_API_BASE = process.env.ITCH_API_BASE ?? "https://api.itch.io";
const ENRICHMENT_ENABLED = process.env.ITCH_ENRICH !== "false";
const REQUEST_TIMEOUT_MS = 12_000;

interface ItchApiGame {
  id: number;
  title: string;
  cover_url?: string;
  url: string;
  short_text?: string;
  published?: boolean;
  published_at?: string;
  updated_at?: string;
  classification?: string;
  traits?: string[];
  min_price?: number;
}

interface ItchApiResponse {
  games?: ItchApiGame[];
  errors?: string[];
}

interface Enrichment {
  cover?: string;
  screenshots: string[];
  trailerId?: string;
  tags: string[];
}

const PLATFORM_TRAITS: Record<string, string> = {
  p_windows: "Windows",
  p_osx: "macOS",
  p_linux: "Linux",
  p_android: "Android",
  p_web: "Web",
};

const PREFERRED_GENRES = [
  "Survival Horror",
  "Psychological Horror",
  "Horror",
  "Puzzle",
  "Exploration",
  "Narrative",
  "Adventure",
];

function ownHost(): string {
  return `${site.itch.username}.itch.io`;
}

function isOwnGameUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.hostname === ownHost() || url.hostname === "www." + ownHost();
  } catch {
    return false;
  }
}

function slugFromUrl(value: string): string {
  try {
    const segments = new URL(value).pathname.split("/").filter(Boolean);
    return segments[0] ?? "";
  } catch {
    return "";
  }
}

function normaliseUrl(value: string | undefined): string {
  if (!value) return "";
  return value.replace(/^http:\/\//i, "https://");
}

function priceLabel(minPrice: number | undefined): string | undefined {
  if (typeof minPrice !== "number") return undefined;
  if (minPrice === 0) return "Free";
  const amount = minPrice / 100;
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function platformsFromTraits(traits: string[] | undefined): string[] {
  if (!traits?.length) return [];
  return traits
    .map((trait) => PLATFORM_TRAITS[trait])
    .filter((value): value is string => Boolean(value));
}

function genreFromTags(tags: string[]): string | undefined {
  return PREFERRED_GENRES.find((genre) =>
    tags.some((tag) => tag.toLowerCase() === genre.toLowerCase()),
  );
}

function sortGames(a: Game, b: Game): number {
  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return bTime - aTime || a.title.localeCompare(b.title);
}

function withOverrides(games: Game[]): Game[] {
  return games.map((game) => {
    const override = gameOverrides[game.itchSlug];
    if (!override) return game;

    return {
      ...game,
      slug: override.slug ?? game.slug,
      title: override.title ?? game.title,
      tagline: override.tagline ?? game.tagline,
      description: override.description ?? game.description,
      cover: override.cover ?? game.cover,
      screenshots:
        game.screenshots.length > 0
          ? game.screenshots
          : (override.screenshots ?? []),
      trailerId: game.trailerId ?? override.trailerId,
      genre: override.genre ?? game.genre,
      platforms:
        game.platforms.length > 0
          ? game.platforms
          : (override.platforms ?? []),
      tags: game.tags.length > 0 ? game.tags : (override.tags ?? []),
      status: override.status ?? game.status,
      statusLabel: override.statusLabel ?? game.statusLabel,
      price: game.price ?? override.price,
      contentWarning: override.contentWarning ?? game.contentWarning,
    };
  });
}

function finalise(games: Game[]): Game[] {
  return withOverrides(games)
    .sort(sortGames)
    .map((game, index) => ({ ...game, featured: index === 0 }));
}

/**
 * Pulls extra public metadata from the game's itch.io page.
 *
 * The official API does not expose screenshots, tags or the trailer, so this
 * reads the public page for the studio's own games only. It is deliberately
 * defensive: any failure returns an empty enrichment and the API data remains.
 */
async function enrichGame(gameUrl: string): Promise<Enrichment> {
  if (!ENRICHMENT_ENABLED || !isOwnGameUrl(gameUrl)) {
    return { screenshots: [], tags: [] };
  }

  try {
    const response = await fetch(gameUrl, {
      headers: {
        "User-Agent": `ObscuraStudiosWebsite/1.0 (+${site.url})`,
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) return { screenshots: [], tags: [] };

    const html = await response.text();

    /**
     * The API's cover_url is the page banner (1600x480), not the 630x500 box
     * art. The public page exposes the real cover as og:image.
     *
     * itch.io writes the attributes as `content="..." property="og:image"`,
     * so read the tag first and pull `content` out independently of order.
     */
    const ogImageTag =
      html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i)?.[0] ?? "";
    const cover = normaliseUrl(
      decodeEntities(
        ogImageTag.match(/content=["']([^"']+)["']/i)?.[1] ?? "",
      ),
    );

    const screenshotBlock =
      html.match(/<div class="screenshot_list">([\s\S]*?)<\/div>/)?.[1] ?? "";

    const screenshots = Array.from(
      screenshotBlock.matchAll(/href="(https:\/\/img\.itch\.zone\/[^"]+)"/g),
    )
      .map((match) => decodeEntities(match[1]))
      .filter((value, index, all) => all.indexOf(value) === index)
      .slice(0, 12);

    const trailerMatch = html.match(
      /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    );

    const tags = Array.from(
      html.matchAll(
        /href="https:\/\/itch\.io\/games\/tag-[^"]+"[^>]*>([^<]+)<\/a>/g,
      ),
    )
      .map((match) => decodeEntities(match[1]))
      .filter((value, index, all) => value && all.indexOf(value) === index)
      .slice(0, 16);

    return {
      cover: cover || undefined,
      screenshots,
      trailerId: trailerMatch?.[1],
      tags,
    };
  } catch {
    return { screenshots: [], tags: [] };
  }
}

async function fetchLiveGames(): Promise<Game[]> {
  const apiKey = process.env.ITCH_API_KEY;
  if (!apiKey) return [];

  const response = await fetch(`${ITCH_API_BASE}/profile/games`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "User-Agent": `ObscuraStudiosWebsite/1.0 (+${site.url})`,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`itch.io API responded with ${response.status}`);
  }

  const payload = (await response.json()) as ItchApiResponse;

  if (payload.errors?.length) {
    throw new Error(payload.errors.join(", "));
  }

  const published = (payload.games ?? []).filter(
    (game) =>
      game.published === true &&
      (game.classification ?? "game") === "game" &&
      isOwnGameUrl(game.url),
  );

  const enriched = await Promise.all(
    published.map(async (game, index) => {
      const enrichment =
        index < 8
          ? await enrichGame(game.url)
          : { screenshots: [], tags: [] as string[] };

      const itchSlug = slugFromUrl(game.url);
      const tags = enrichment.tags;
      const platforms = platformsFromTraits(game.traits);
      const description = game.short_text
        ? [decodeEntities(game.short_text)]
        : [];

      return {
        id: String(game.id),
        slug: itchSlug,
        itchSlug,
        title: decodeEntities(game.title),
        tagline: decodeEntities(game.short_text ?? ""),
        description,
        cover: enrichment.cover ?? normaliseUrl(game.cover_url),
        screenshots: enrichment.screenshots,
        itchUrl: normaliseUrl(game.url),
        trailerId: enrichment.trailerId,
        genre: genreFromTags(tags),
        platforms,
        tags,
        status: "released" as const,
        statusLabel: "Out now",
        publishedAt: game.published_at,
        updatedAt: game.updated_at,
        price: priceLabel(game.min_price),
        featured: false,
        source: "itch-api" as const,
      } satisfies Game;
    }),
  );

  return enriched;
}

/**
 * The single source of games for the whole site.
 *
 * Order of precedence:
 *   1. Official itch.io API (authoritative list)
 *   2. Public-page enrichment (screenshots, trailer, tags)
 *   3. Editorial overrides in content/games.ts
 *   4. Verified fallback snapshot when the API is unavailable
 */
export async function getGames(): Promise<Game[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("itch-games");

  if (!process.env.ITCH_API_KEY) {
    return finalise(fallbackGames);
  }

  try {
    const live = await fetchLiveGames();
    return finalise(live);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[obscura] itch.io sync failed — serving the verified fallback catalogue.",
        error instanceof Error ? error.message : error,
      );
    }
    return finalise(fallbackGames);
  }
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("itch-games");

  const games = await getGames();
  return games.find((game) => game.slug === slug) ?? null;
}

export async function getFeaturedGame(): Promise<Game | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("itch-games");

  const games = await getGames();

  if (site.featuredGameSlug) {
    return (
      games.find((game) => game.slug === site.featuredGameSlug) ??
      games[0] ??
      null
    );
  }

  return games[0] ?? null;
}
