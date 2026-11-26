import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, TriangleAlert } from "lucide-react";
import { Suspense } from "react";

import { GameCard } from "@/components/games/game-card";
import { ScreenshotGallery } from "@/components/games/screenshot-gallery";
import { ActionLink } from "@/components/ui/action-link";
import { GameCover } from "@/components/ui/game-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { VideoFacade } from "@/components/youtube/video-facade";
import { site } from "@/content/site";
import { formatMonthYear } from "@/lib/format";
import { getGameBySlug, getGames } from "@/lib/itch";
import { pageOpenGraph } from "@/lib/metadata";
import type { Game } from "@/types";

interface GamePageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: GamePageParams): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return { title: "Game not found" };
  }

  const description =
    game.tagline || game.description[0] || site.description;

  return {
    title: game.title,
    description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: pageOpenGraph({
      title: `${game.title} — ${site.name}`,
      description,
      url: `/games/${game.slug}`,
      images: game.cover
        ? [{ url: game.cover, alt: `${game.title} cover art` }]
        : undefined,
    }),
    twitter: {
      card: "summary_large_image",
      title: `${game.title} — ${site.name}`,
      description,
      images: game.cover ? [game.cover] : undefined,
    },
  };
}

export default function GamePage({ params }: GamePageParams) {
  return (
    <Suspense fallback={<GamePageSkeleton />}>
      <GamePageContent params={params} />
    </Suspense>
  );
}

async function GamePageContent({ params }: GamePageParams) {
  const { slug } = await params;
  const games = await getGames();
  const game = games.find((entry) => entry.slug === slug);

  if (!game) notFound();

  const otherGames = games.filter((entry) => entry.slug !== game.slug);

  return (
    <>
      <GameHero game={game} />
      <GameDescription game={game} />

      {game.screenshots.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="container-editorial">
            <SectionHeading
              index="02"
              eyebrow="Screenshots"
              title="Inside the world."
              description="Frames from the game. Select any image to view it full size."
            />
            <div className="mt-12">
              <ScreenshotGallery
                images={game.screenshots}
                title={game.title}
              />
            </div>
          </div>
        </section>
      ) : null}

      {game.trailerId ? (
        <section className="py-20 md:py-28">
          <div className="container-editorial">
            <SectionHeading
              index="03"
              eyebrow="Trailer"
              title="See it in motion."
              action={
                <ActionLink
                  href={`https://www.youtube.com/watch?v=${game.trailerId}`}
                  variant="ghost"
                  external
                  className="px-0 py-0"
                >
                  Watch on YouTube
                </ActionLink>
              }
            />
            <div className="mt-12">
              <VideoFacade
                video={{
                  id: game.trailerId,
                  title: `${game.title} — official trailer`,
                  url: `https://www.youtube.com/watch?v=${game.trailerId}`,
                  thumbnail: `https://i.ytimg.com/vi/${game.trailerId}/hqdefault.jpg`,
                  published: game.publishedAt ?? "",
                  isShort: false,
                  description: game.tagline,
                }}
              />
            </div>
          </div>
        </section>
      ) : null}

      {otherGames.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="container-editorial">
            <SectionHeading
              index="04"
              eyebrow="More from the studio"
              title="Keep exploring."
              action={
                <ActionLink
                  href="/games"
                  variant="ghost"
                  className="px-0 py-0"
                >
                  All games
                </ActionLink>
              }
            />
            <div className="mt-12">
              {otherGames.map((entry, index) => (
                <GameCard key={entry.slug} game={entry} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GameStructuredData game={game} />
    </>
  );
}

function GameHero({ game }: { game: Game }) {
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
    <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32">
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
            className="scale-110 object-cover opacity-20 blur-3xl"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" />

      <div className="container-editorial relative z-10">
        <nav
          aria-label="Breadcrumb"
          className="border-t border-line pt-5 font-display text-[9px] uppercase tracking-[0.2em] text-muted"
        >
          <Link href="/games" className="transition-colors hover:text-paper">
            Games
          </Link>
          <span className="mx-2 text-muted/50" aria-hidden="true">
            /
          </span>
          <span className="text-paper/70">{game.title}</span>
        </nav>

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
            </div>
          </div>

          <div className="lg:col-span-5">
            <StatusPill status={game.status} label={game.statusLabel} />
            <h1 className="mt-5 text-balance font-display text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.88] tracking-[-0.055em] text-paper">
              {game.title}
            </h1>
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
              <ActionLink href={game.itchUrl} external>
                Play on itch.io
              </ActionLink>
              {game.trailerId ? (
                <ActionLink
                  href={`https://www.youtube.com/watch?v=${game.trailerId}`}
                  variant="secondary"
                  external
                  showArrow={false}
                  icon={
                    <Play
                      className="h-3.5 w-3.5 fill-current"
                      aria-hidden="true"
                    />
                  }
                >
                  Watch trailer
                </ActionLink>
              ) : null}
            </div>

            {game.contentWarning ? (
              <p className="mt-7 flex max-w-md items-start gap-3 border-l border-crimson/60 pl-4 text-xs leading-relaxed text-muted">
                <TriangleAlert
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson-soft"
                  aria-hidden="true"
                />
                {game.contentWarning}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function GameDescription({ game }: { game: Game }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-editorial">
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
                01
              </span>
              <span className="eyebrow">About the game</span>
            </div>
          </div>

          <Reveal className="md:col-span-7 md:col-start-5">
            {game.description.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-balance font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper md:text-2xl"
                    : "mt-6 text-base leading-relaxed text-muted"
                }
              >
                {paragraph}
              </p>
            ))}

            {game.tags.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {game.tags.slice(0, 10).map((tag) => (
                  <li
                    key={tag}
                    className="border border-line px-2.5 py-1.5 font-display text-[9px] uppercase tracking-[0.16em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GamePageSkeleton() {
  return (
    <section className="pb-20 pt-32">
      <div className="container-editorial">
        <div className="h-3 w-40 animate-pulse bg-elevated" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="aspect-[630/500] animate-pulse bg-elevated lg:col-span-7" />
          <div className="lg:col-span-5">
            <div className="h-5 w-24 animate-pulse bg-elevated" />
            <div className="mt-6 h-16 w-full animate-pulse bg-elevated" />
            <div className="mt-4 h-4 w-4/5 animate-pulse bg-elevated" />
            <div className="mt-8 h-24 w-full animate-pulse bg-elevated" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GameStructuredData({ game }: { game: Game }) {
  const price =
    game.price === "Free"
      ? "0"
      : game.price?.startsWith("$")
        ? game.price.slice(1)
        : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description.join(" "),
    image: [game.cover, ...game.screenshots].filter(Boolean).slice(0, 6),
    url: `${site.url}/games/${game.slug}`,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    datePublished: game.publishedAt,
    applicationCategory: "Game",
    operatingSystem: game.platforms.join(", "),
    genre: game.genre,
    offers: price
      ? {
          "@type": "Offer",
          price,
          priceCurrency: "USD",
          url: game.itchUrl,
          availability: "https://schema.org/InStock",
        }
      : undefined,
    trailer: game.trailerId
      ? {
          "@type": "VideoObject",
          name: `${game.title} — official trailer`,
          embedUrl: `https://www.youtube.com/embed/${game.trailerId}`,
          thumbnailUrl: `https://i.ytimg.com/vi/${game.trailerId}/hqdefault.jpg`,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
