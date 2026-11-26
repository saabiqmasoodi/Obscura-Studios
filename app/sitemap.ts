import type { MetadataRoute } from "next";

import { news } from "@/content/news";
import { site } from "@/content/site";
import { getGames } from "@/lib/itch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await getGames();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/games`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${site.url}/games/${game.slug}`,
    lastModified: game.updatedAt ?? game.publishedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: game.cover ? [game.cover] : undefined,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((entry) => ({
    url: `${site.url}/news/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...gameRoutes, ...newsRoutes];
}
