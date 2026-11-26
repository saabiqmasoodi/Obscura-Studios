import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { GameCard } from "@/components/games/game-card";
import { site } from "@/content/site";
import { formatMonthYear } from "@/lib/format";
import type { Game } from "@/types";

interface GamesShowcaseProps {
  games: Game[];
}

export function GamesShowcase({ games }: GamesShowcaseProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <SectionHeading
          index="02"
          eyebrow="Our games"
          title="Worlds you can step into."
          description="Every release begins with a place worth getting lost in. This is the current catalogue."
          action={
            <ActionLink
              href="/games"
              variant="ghost"
              className="px-0 py-0"
            >
              View all games
            </ActionLink>
          }
        />

        <div className="mt-12">
          {games.length === 1 ? (
            <div className="border-t border-line">
              <Link
                href={`/games/${games[0].slug}`}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-b border-line py-7 md:py-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
                    01
                  </span>
                  <span className="font-display text-2xl font-medium tracking-[-0.03em] text-paper transition-transform duration-500 ease-cinema group-hover:translate-x-1 md:text-3xl">
                    {games[0].title}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[9px] uppercase tracking-[0.2em] text-muted">
                  <span>{games[0].statusLabel}</span>
                  {games[0].genre ? (
                    <span className="hidden sm:inline">{games[0].genre}</span>
                  ) : null}
                  {games[0].publishedAt ? (
                    <span className="hidden sm:inline">
                      {formatMonthYear(games[0].publishedAt)}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-2 text-paper">
                    View game
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </div>
          ) : games.length > 1 ? (
            games.map((game, index) => (
              <GameCard key={game.slug} game={game} index={index} />
            ))
          ) : (
            <div className="border-t border-line pt-8">
              <p className="max-w-lg text-base leading-relaxed text-muted">
                The catalogue is being prepared. Follow the studio on YouTube
                for the first look at what comes next.
              </p>
              <ActionLink
                href={site.youtube.main.url}
                variant="secondary"
                external
                className="mt-6"
              >
                Watch on YouTube
              </ActionLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
