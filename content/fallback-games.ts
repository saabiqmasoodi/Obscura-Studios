import type { Game } from "@/types";

/**
 * Verified snapshot of the studio's itch.io catalogue.
 *
 * This is only used when ITCH_API_KEY is not configured or the live API
 * cannot be reached. Every field here was read from the public itch.io page —
 * it is real content, not placeholder copy.
 */
export const fallbackGames: Game[] = [
  {
    id: "5044383",
    slug: "not-to-love",
    itchSlug: "the-basement",
    title: "NOT TO LOVE",
    tagline:
      "Something is waiting in the dark. A first-person basement horror story.",
    description: [
      "Something is watching you from the dark.",
      "You were just relaxing when a sudden, jarring noise echoed from below. Driven by curiosity, you step down into The Basement. The moment your feet touch the cold floor, the heavy door slams shut behind you. You are trapped.",
      "To escape, you must explore the shadows, solve puzzles, and complete your objectives. But be warned: you are not alone in the dark.",
    ],
    cover:
      "https://img.itch.zone/aW1nLzMyNzk5NDkxLnBuZw==/original/Crqwqq.png",
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwNTc1NS5qcGc=/original/s8EnU1.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzOC5qcGc=/original/YXhwqP.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzNy5qcGc=/original/3RIPtk.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzOS5qcGc=/original/L5WA%2FT.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzNS5qcGc=/original/PAGmxz.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzNC5qcGc=/original/mZQz18.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMzAzOS5qcGc=/original/a%2B%2B9C5.jpg",
    ],
    itchUrl: "https://obscurastudios.itch.io/the-basement",
    trailerId: "gD9-l5ZBbe0",
    genre: "Survival Horror",
    platforms: ["Windows", "macOS", "Linux"],
    tags: [
      "Atmospheric",
      "Dark",
      "Exploration",
      "First-Person",
      "Godot",
      "Horror",
      "Psychological Horror",
      "Singleplayer",
      "Story Rich",
      "Survival Horror",
    ],
    status: "released",
    statusLabel: "Out now",
    publishedAt: "2026-11-23T00:00:00Z",
    price: "$1",
    contentWarning:
      "Contains intense horror elements, jump scares, and psychological tension.",
    featured: true,
    source: "fallback",
  },
];
