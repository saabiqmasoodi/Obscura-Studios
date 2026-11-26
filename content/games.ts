import type { GameOverride } from "@/types";

/**
 * Editorial overrides, keyed by the game's itch.io URL slug.
 *
 * The itch.io API is the source of truth for title, cover, URL and release
 * date. This file only supplies what the API does not expose (or where the
 * studio wants a specific presentation).
 *
 * NOT TO LOVE lives at /the-basement on itch.io, but its site route is
 * /games/not-to-love.
 */
export const gameOverrides: Record<string, GameOverride> = {
  "the-basement": {
    slug: "not-to-love",
    genre: "Survival Horror",
    trailerId: "gD9-l5ZBbe0",
    cover:
      "https://img.itch.zone/aW1nLzMyNzk5NDkxLnBuZw==/original/Crqwqq.png",
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
    description: [
      "Something is watching you from the dark.",
      "You were just relaxing when a sudden, jarring noise echoed from below. Driven by curiosity, you step down into The Basement. The moment your feet touch the cold floor, the heavy door slams shut behind you. You are trapped.",
      "To escape, you must explore the shadows, solve puzzles, and complete your objectives. But be warned: you are not alone in the dark.",
    ],
    contentWarning:
      "Contains intense horror elements, jump scares, and psychological tension.",
    statusLabel: "Out now",
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwNTc1NS5qcGc=/original/s8EnU1.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzOC5qcGc=/original/YXhwqP.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzNy5qcGc=/original/3RIPtk.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzOS5qcGc=/original/L5WA%2FT.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzNS5qcGc=/original/PAGmxz.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMjkzNC5qcGc=/original/mZQz18.jpg",
      "https://img.itch.zone/aW1hZ2UvNTA0NDM4My8zMjIwMzAzOS5qcGc=/original/a%2B%2B9C5.jpg",
    ],
  },
};
