#!/usr/bin/env node
/**
 * Verify the itch.io integration with a real API key.
 *
 * Usage:
 *   ITCH_API_KEY=... node scripts/verify-itch.mjs
 *   ITCH_API_KEY=... node scripts/verify-itch.mjs --json
 *
 * This talks to the official API, not the website, so it can be run before
 * `npm run dev`. It exits non-zero when the key is missing, the request fails,
 * or the response contains no published games.
 */

const API_BASE = process.env.ITCH_API_BASE ?? "https://api.itch.io";
const USERNAME = "obscurastudios";
const apiKey = process.env.ITCH_API_KEY;
const json = process.argv.includes("--json");

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

function slugFromUrl(value) {
  try {
    return new URL(value).pathname.split("/").filter(Boolean)[0] ?? "";
  } catch {
    return "";
  }
}

if (!apiKey) {
  fail(
    "ITCH_API_KEY is not set.\n  Create one at https://itch.io/user/settings/api-keys\n  then run: ITCH_API_KEY=... node scripts/verify-itch.mjs",
  );
}

console.log(`→ GET ${API_BASE}/profile/games`);

let response;
try {
  response = await fetch(`${API_BASE}/profile/games`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "User-Agent": "ObscuraStudiosWebsite/1.0 (verify script)",
    },
    signal: AbortSignal.timeout(15_000),
  });
} catch (error) {
  fail(`Request failed: ${error.message}`);
}

if (!response.ok) {
  fail(
    `API responded ${response.status} ${response.statusText}. ` +
      (response.status === 401
        ? "The key was rejected."
        : "Check the key and try again."),
  );
}

const payload = await response.json();

if (payload.errors?.length) {
  fail(`API returned errors: ${payload.errors.join(", ")}`);
}

const all = payload.games ?? [];
const published = all.filter(
  (game) =>
    game.published === true &&
    (game.classification ?? "game") === "game" &&
    new URL(game.url).hostname === `${USERNAME}.itch.io`,
);

const problems = [];

for (const game of published) {
  const slug = slugFromUrl(game.url);
  if (!game.id) problems.push(`${slug || "(no url)"}: missing id`);
  if (!game.title) problems.push(`${slug || "(no url)"}: missing title`);
  if (!game.cover_url) problems.push(`${slug || "(no url)"}: missing cover_url`);
  if (game.url && !game.url.startsWith("https://")) {
    problems.push(`${slug || "(no url)"}: url is not https`);
  }
}

const summary = {
  username: USERNAME,
  apiBase: API_BASE,
  totalGames: all.length,
  publishedGames: published.length,
  games: published.map((game) => ({
    id: String(game.id),
    slug: slugFromUrl(game.url),
    title: game.title,
    url: game.url,
    cover: game.cover_url ?? null,
    publishedAt: game.published_at ?? null,
    traits: game.traits ?? [],
    minPrice: game.min_price ?? null,
  })),
  problems,
};

if (json) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(
    `\n  ${published.length} published game(s) of ${all.length} total\n`,
  );

  if (published.length === 0) {
    console.log("  (nothing published — check the account and key scope)\n");
  }

  for (const game of summary.games) {
    console.log(`  • ${game.title}`);
    console.log(`    ${game.url}`);
    console.log(`    cover: ${game.cover ?? "MISSING"}`);
    console.log(`    slug:  ${game.slug}`);
    console.log(`    price: ${game.minPrice ?? "—"}  traits: ${game.traits.join(", ") || "—"}`);
    console.log("");
  }

  if (problems.length > 0) {
    console.log("  Issues:");
    for (const problem of problems) console.log(`    ! ${problem}`);
    console.log("");
  }
}

if (problems.length > 0) {
  process.exitCode = 1;
} else if (published.length === 0) {
  process.exitCode = 1;
} else {
  console.log("✓ itch.io sync data looks valid.\n");
}
