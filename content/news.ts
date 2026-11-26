import type { NewsEntry } from "@/types";

/**
 * Studio updates. Add a new object at the top of the array to publish it.
 * Dates use ISO format; the UI formats them for humans.
 */
export const news: NewsEntry[] = [
  {
    slug: "not-to-love-is-out-now",
    title: "NOT TO LOVE is out now",
    excerpt:
      "Our debut first-person horror story is available on itch.io for Windows, macOS, and Linux.",
    date: "2026-11-23",
    category: "Release",
    gameSlug: "not-to-love",
    body: [
      {
        type: "paragraph",
        text: "Something is waiting in the dark. NOT TO LOVE is our first release: a short, atmospheric basement horror story about a noise from below and a door that closes behind you.",
      },
      {
        type: "paragraph",
        text: "Explore the shadows, solve puzzles, and complete your objectives. You are not alone in the dark.",
      },
      {
        type: "heading",
        text: "Available now",
      },
      {
        type: "paragraph",
        text: "The game is available on itch.io for Windows, macOS, and Linux for $1. Headphones recommended.",
      },
      {
        type: "link",
        label: "Play NOT TO LOVE on itch.io",
        href: "https://obscurastudios.itch.io/the-basement",
        external: true,
      },
    ],
  },
  {
    slug: "not-to-love-official-trailer",
    title: "The official NOT TO LOVE trailer is here",
    excerpt:
      "A first full look at the house, the dark, and the thing waiting at the bottom of the stairs.",
    date: "2026-11-22",
    category: "Trailer",
    gameSlug: "not-to-love",
    body: [
      {
        type: "paragraph",
        text: "The official trailer for NOT TO LOVE is live on the Obscura Studios YouTube channel.",
      },
      {
        type: "paragraph",
        text: "It is the clearest look yet at the basement — and at what the dark has been keeping from you.",
      },
      {
        type: "link",
        label: "Watch the trailer on YouTube",
        href: "https://www.youtube.com/watch?v=gD9-l5ZBbe0",
        external: true,
      },
      {
        type: "link",
        label: "View the game page",
        href: "/games/not-to-love",
      },
    ],
  },
  {
    slug: "obscura-studios-online",
    title: "Obscura Studios has a home online",
    excerpt:
      "A permanent place for our games, trailers, and the things we are building next.",
    date: "2026-11-25",
    category: "Studio",
    body: [
      {
        type: "paragraph",
        text: "The official Obscura Studios website is live. It is a single, quiet place for the studio's releases, updates, and future projects.",
      },
      {
        type: "paragraph",
        text: "The games section is connected to our itch.io profile, so new releases will appear here as they are published. Trailers and recent videos come from the studio's YouTube channel.",
      },
      {
        type: "link",
        label: "Explore the games",
        href: "/games",
      },
      {
        type: "link",
        label: "Subscribe on YouTube",
        href: "https://www.youtube.com/@obscuragamesh?sub_confirmation=1",
        external: true,
      },
    ],
  },
];

export function getNewsEntry(slug: string): NewsEntry | undefined {
  return news.find((entry) => entry.slug === slug);
}

export function getLatestNews(limit = 3): NewsEntry[] {
  return [...news]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
