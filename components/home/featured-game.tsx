import Image from "next/image";

import { ActionLink } from "@/components/ui/action-link";
import { GameCover } from "@/components/ui/game-cover";
import { StatusPill } from "@/components/ui/status-pill";
import { formatMonthYear } from "@/lib/format";
import type { Game } from "@/types";

interface FeaturedGameProps {
  game: Game;
}

export function FeaturedGame({ game }: FeaturedGameProps) {
  const meta: Array<{ label: string; value: string }> = [];

  if (game.genre) meta.push({ label: "Genre", value: game.genre });
  if (game.publishedAt) {
    meta.push({ label: "Release", value: formatMonthYear(game.publishedAt) });
  }
  if (game.platforms.length > 0) {
    meta.push({ label: "Platforms", value: game.platforms.join(" · ") });
  }
  if (game.price) meta.push({ label: "Price", value: game.price });

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {game.cover ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Image
            src={game.cover}
            alt=""
            fill
            sizes="100vw"
            quality={75}
            loading="eager"
            fetchPriority="low"
            className="scale-110 object-cover opacity-25 blur-3xl"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink" />

      <div className="container-editorial relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
              01
            </span>
            <span className="eyebrow">Featured release</span>
          </div>
          <StatusPill status={game.status} label={game.statusLabel} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <div className="relative aspect-[630/500] overflow-hidden bg-elevated">
              <GameCover
                src={game.cover}
                alt={`${game.title} cover art`}
                preload
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow text-crimson-soft">Debut release</p>
            <h2 className="mt-4 text-balance font-display text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.05em] text-paper">
              {game.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/75 md:text-lg">
              {game.tagline}
            </p>

            {meta.length > 0 ? (
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="eyebrow">{item.label}</dt>
                    <dd className="mt-2 text-sm text-paper/85">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={`/games/${game.slug}`}>View game</ActionLink>
              <ActionLink href={game.itchUrl} variant="secondary" external>
                Play on itch.io
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
