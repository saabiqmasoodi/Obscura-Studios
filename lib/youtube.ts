import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { site } from "@/content/site";
import { decodeEntities } from "@/lib/format";
import type { YouTubeData, YouTubeVideo } from "@/types";

const REQUEST_TIMEOUT_MS = 12_000;

/**
 * Verified fallback data, read from the public channel feed.
 * Used only if YouTube's RSS endpoint is unavailable.
 */
const fallbackVideos: YouTubeVideo[] = [
  {
    id: "gD9-l5ZBbe0",
    title: "NotToLove official trailler",
    url: "https://www.youtube.com/watch?v=gD9-l5ZBbe0",
    thumbnail: "https://i.ytimg.com/vi/gD9-l5ZBbe0/hqdefault.jpg",
    published: "2026-11-22T16:00:08+00:00",
    isShort: false,
    description:
      "Offical trailler for Not To Love\nItch.io: https://obscurastudios.itch.io/the-basement",
  },
  {
    id: "vzN6dyA2gks",
    title: "NotToLove Teaser",
    url: "https://www.youtube.com/shorts/vzN6dyA2gks",
    thumbnail: "https://i.ytimg.com/vi/vzN6dyA2gks/hqdefault.jpg",
    published: "2026-11-23T09:30:02+00:00",
    isShort: true,
    description: "Trailler is OUT NOW",
  },
];

function parseFeed(xml: string): YouTubeVideo[] {
  const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));

  return entries
    .map(([, block]) => {
      const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
      if (!id) return null;

      const title = decodeEntities(
        block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "",
      );
      const published =
        block.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      const link =
        block.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
      const thumbnail =
        block.match(/<media:thumbnail url="([^"]+)"/)?.[1] ??
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      const description = decodeEntities(
        block.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ??
          "",
      );

      return {
        id,
        title: title || "Untitled video",
        url: link || `https://www.youtube.com/watch?v=${id}`,
        thumbnail,
        published,
        isShort: link.includes("/shorts/"),
        description,
      } satisfies YouTubeVideo;
    })
    .filter((video): video is YouTubeVideo => video !== null)
    .sort(
      (a, b) =>
        new Date(b.published).getTime() - new Date(a.published).getTime(),
    );
}

export async function getYouTubeData(): Promise<YouTubeData> {
  "use cache";
  cacheLife("hours");
  cacheTag("youtube");

  const channel = site.youtube.main;

  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channelId}`,
      {
        headers: {
          Accept: "application/atom+xml, application/xml, text/xml",
          "User-Agent": `ObscuraStudiosWebsite/1.0 (+${site.url})`,
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );

    if (!response.ok) throw new Error(`YouTube feed ${response.status}`);

    const videos = parseFeed(await response.text());
    if (videos.length === 0) throw new Error("YouTube feed is empty");

    return {
      channel,
      videos,
      featured: videos.find((video) => !video.isShort) ?? videos[0] ?? null,
      source: "rss",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[obscura] YouTube feed unavailable — using verified fallback videos.",
        error instanceof Error ? error.message : error,
      );
    }

    return {
      channel,
      videos: fallbackVideos,
      featured: fallbackVideos[0],
      source: "fallback",
    };
  }
}
