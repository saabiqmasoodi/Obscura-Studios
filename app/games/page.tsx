import type { Metadata } from "next";

import { GameCard } from "@/components/games/game-card";
import { ActionLink } from "@/components/ui/action-link";
import { site } from "@/content/site";
import { getGames } from "@/lib/itch";
import { pageOpenGraph } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Games",
  description:
    "The Obscura Studios catalogue: atmospheric, first-person games about the things waiting in ordinary places.",
  alternates: { canonical: "/games" },
  openGraph: pageOpenGraph({
    title: `Games — ${site.name}`,
    description:
      "The Obscura Studios catalogue: atmospheric, first-person games about the things waiting in ordinary places.",
    url: "/games",
  }),
};

export default async function GamesPage() {
  const games = await getGames();
  const count = games.length;

  return (
    <>
      <section className="pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="container-editorial">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
                Index
              </span>
              <span className="eyebrow">The catalogue</span>
            </div>
            <span className="eyebrow">
              {count} {count === 1 ? "release" : "releases"}
            </span>
          </div>

          <h1 className="mt-8 text-balance font-display text-[clamp(4rem,12vw,9rem)] font-medium leading-[0.84] tracking-[-0.055em] text-paper">
            Games
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Atmospheric, first-person experiences about the things waiting in
            ordinary places. Every release is available through itch.io.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-editorial">
          {games.length > 0 ? (
            games.map((game, index) => (
              <GameCard key={game.slug} game={game} index={index} />
            ))
          ) : (
            <div className="border-t border-line pt-8">
              <p className="max-w-lg text-base leading-relaxed text-muted">
                The catalogue is being prepared. Follow the studio on YouTube
                for the first look at what comes next.
              </p>
            </div>
          )}

          <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted">
              New releases are published on itch.io first and appear here
              automatically.
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionLink href={site.itch.profileUrl} external variant="secondary">
                Obscura on itch.io
              </ActionLink>
              <ActionLink href={site.youtube.main.url} external variant="secondary">
                YouTube
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
