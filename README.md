# Obscura Studios

The official website for Obscura Studios — an independent game studio making
atmospheric, first-person games about the things waiting in ordinary places.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4,
Motion and Lucide.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional, but needed for live itch.io sync
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run verify:itch` | Validate a real `ITCH_API_KEY` against the itch.io API |
| `npm run mock:itch` | Local itch.io API mock for integration testing |

## Content

Most edits are plain data, not code:

| File | What it controls |
| --- | --- |
| `content/site.ts` | Studio name, tagline, URL, itch.io profile, YouTube channels |
| `content/games.ts` | Editorial overrides for each game, keyed by itch.io slug |
| `content/fallback-games.ts` | Verified catalogue snapshot used if the API is unavailable |
| `content/news.ts` | News entries. Add an object at the top of the array to publish |
| `types/index.ts` | Shared content types |

### Adding a game

Publish it on itch.io. If the itch.io API is configured, it appears
automatically — no code change needed. If the store page, screenshots, trailer
or site slug need special handling, add an entry to `content/games.ts`:

```ts
export const gameOverrides: Record<string, GameOverride> = {
  "itch-url-slug": {
    slug: "site-url-slug",
    trailerId: "youtube-video-id",
    genre: "Survival Horror",
    screenshots: ["https://img.itch.zone/..."],
  },
};
```

## itch.io integration

Games are read from the official itch.io API on the server:

```
GET https://api.itch.io/profile/games
Authorization: Bearer $ITCH_API_KEY
```

1. Create a key at <https://itch.io/user/settings/api-keys>.
2. Put it in `.env.local` as `ITCH_API_KEY=...`. It is server-only and never
   reaches the browser.
3. Verify it: `npm run verify:itch`.

The API does not expose screenshots, tags or trailers, so the server also reads
the studio's public game pages to enrich each entry. Set `ITCH_ENRICH=false` to
disable that.

If the key is missing or the API fails, the site serves the verified snapshot in
`content/fallback-games.ts`. It never shows an empty or broken catalogue.

### Testing without a key

```bash
npm run mock:itch
# in a second shell:
ITCH_API_KEY=test ITCH_API_BASE=http://localhost:4001 npm run dev
```

This exercises the live-API code path with the same real game record.

### Caching and revalidation

Both the catalogue and YouTube data use `'use cache'` with `cacheLife("hours")`
and tagged invalidation (`itch-games`, `youtube`). To refresh immediately after
publishing:

```bash
curl -X POST "https://your-site.com/api/revalidate?tag=itch-games" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET"
```

`GET` is not allowed; the endpoint returns 501 when `REVALIDATE_SECRET` is unset.

## YouTube

The studio channel is resolved from its RSS feed:

```
https://www.youtube.com/feeds/videos.xml?channel_id=UC1sda0FWfPXZOSKmnD5hI4A
```

The feed supplies titles, dates, thumbnails and descriptions. Videos are
embedded through `youtube-nocookie.com` only after a click, so no third-party
cookies or heavy players load on page view.

A second channel button is supported in `content/site.ts` under
`youtube.secondary`. It is hidden while its `url` is empty, so the site never
renders a dead link.

## Branding

All marks live in `public/branding/`:

- `obscura-mark-black.svg` — black on transparent
- `obscura-mark-white.svg` — white on transparent
- `obscura-mark-black-on-white.svg` — black on white
- `obscura-mark-white-on-black.svg` — white on black
- `obscura-favicon.svg`, `obscura-favicon-white.svg` — 32 px simplified
- `preview.html` — open directly in a browser to review every variant

The in-app icon (`app/icon.svg`) and Apple touch icon are generated from the same
geometry. The mark is monochrome only: no text, gradients or colour.

## Deployment

Set these environment variables on the host:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ITCH_API_KEY=...
REVALIDATE_SECRET=...
```

Then `npm run build && npm start`, or deploy to Vercel. The site is fully static
where possible; only the API route and on-demand revalidation need a server.

## Structure

```
app/
  page.tsx                 Home
  games/page.tsx           Catalogue
  games/[slug]/page.tsx    Game detail
  about/page.tsx           Studio
  news/page.tsx            Updates
  news/[slug]/page.tsx     Update detail
  api/revalidate/route.ts  On-demand cache invalidation
  icon.svg                 Favicon
components/
  brand/                   Eclipse mark, lockup
  home/                    Homepage sections
  games/                   Cards, gallery
  layout/                  Header, footer
  ui/                      Actions, headings, reveal, cover
  youtube/                 Video facade and rows
content/                   Editable site data
lib/                       itch.io, YouTube, formatting
public/branding/           Logo variants and preview
scripts/                   itch.io verification and mock
```
