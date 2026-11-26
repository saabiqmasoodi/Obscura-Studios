import type { Metadata } from "next";

import { FeaturedGame } from "@/components/home/featured-game";
import { GamesShowcase } from "@/components/home/games-showcase";
import { Hero } from "@/components/home/hero";
import { LatestNews } from "@/components/home/latest-news";
import { StudioIntro } from "@/components/home/studio-intro";
import { YouTubeSection } from "@/components/home/youtube-section";
import { getLatestNews } from "@/content/news";
import { getFeaturedGame, getGames } from "@/lib/itch";
import { getYouTubeData } from "@/lib/youtube";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [games, featured, youtube] = await Promise.all([
    getGames(),
    getFeaturedGame(),
    getYouTubeData(),
  ]);

  const latestNews = getLatestNews(3);

  return (
    <>
      <Hero />
      {featured ? <FeaturedGame game={featured} /> : null}
      <GamesShowcase games={games} />
      <StudioIntro />
      <YouTubeSection data={youtube} />
      <LatestNews entries={latestNews} />
    </>
  );
}
