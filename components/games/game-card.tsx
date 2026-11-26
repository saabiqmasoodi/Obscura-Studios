import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GameCover } from "@/components/ui/game-cover";
import { formatMonthYear } from "@/lib/format";
import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group border-t border-line py-8 first:border-t-0 first:pt-0 md:py-10">
      <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
        <Link
          href={`/games/${game.slug}`}
          aria-label={`View ${game.title}`}
          className="relative block aspect-[630/500] overflow-hidden bg-elevated md:col-span-5"
        >
          <GameCover
            src={game.cover}
            alt={`${game.title} cover art`}
            sizes="(max-width: 768px) 100vw, 42vw"
            imageClassName="transition-transform duration-700 ease-cinema group-hover:scale-[1.035]"
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
            aria-hidden="true"
          />
        </Link>

        <div className="md:col-span-6 md:col-start-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[9px] uppercase tracking-[0.2em] text-muted">
            <span className="text-crimson-soft">{number}</span>
            <span>{game.statusLabel}</span>
            {game.genre ? <span>{game.genre}</span> : null}
            {game.publishedAt ? (
              <span>{formatMonthYear(game.publishedAt)}</span>
            ) : null}
          </div>

          <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-[-0.03em] text-paper md:text-4xl">
            <Link
              href={`/games/${game.slug}`}
              className="inline-block transition-transform duration-500 ease-cinema group-hover:translate-x-1"
            >
              {game.title}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-3 max-w-lg text-sm leading-relaxed text-muted">
            {game.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={`/games/${game.slug}`}
              className="group/link inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-paper"
            >
              View game
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href={game.itchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
            >
              itch.io
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
