#!/usr/bin/env node
/**
 * Minimal itch.io API mock for local integration testing.
 *
 *   node scripts/mock-itch.mjs
 *   # in another shell:
 *   ITCH_API_KEY=test ITCH_API_BASE=http://localhost:4001 npm run dev
 *
 * It returns the same shape as GET /profile/games on api.itch.io, with the
 * studio's real published game. It is not used in production and it does not
 * invent unreleased titles.
 */

import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 4001);

const FIXTURE = {
  games: [
    {
      id: 5044383,
      title: "NOT TO LOVE",
      cover_url:
        "https://img.itch.zone/aW1nLzMyODAwNDU4LnBuZw==/original/fyh2t3.png",
      url: "https://obscurastudios.itch.io/the-basement",
      short_text:
        "Something is watching you from the dark. A first-person basement horror story.",
      published: true,
      published_at: "2026-11-23T00:00:00Z",
      updated_at: "2026-11-23T00:00:00Z",
      classification: "game",
      traits: ["p_windows", "p_osx", "p_linux"],
      min_price: 100,
    },
  ],
};

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://localhost:${PORT}`);

  if (request.method === "GET" && url.pathname === "/profile/games") {
    const auth = request.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      response.writeHead(401, { "content-type": "application/json" });
      response.end(JSON.stringify({ errors: ["API key required"] }));
      return;
    }

    response.writeHead(200, {
      "content-type": "application/json",
      "cache-control": "no-store",
    });
    response.end(JSON.stringify(FIXTURE));
    console.log(`[mock-itch] served ${FIXTURE.games.length} game(s)`);
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ errors: ["Not found"] }));
});

server.listen(PORT, () => {
  console.log(`[mock-itch] listening on http://localhost:${PORT}`);
  console.log(`[mock-itch] try: curl -H 'Authorization: Bearer test' \\`);
  console.log(`[mock-itch]   http://localhost:${PORT}/profile/games`);
});
