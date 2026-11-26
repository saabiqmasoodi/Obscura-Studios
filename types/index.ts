export type GameStatus =
  | "released"
  | "early-access"
  | "in-development"
  | "coming-soon";

export interface Game {
  id: string;
  slug: string;
  itchSlug: string;
  title: string;
  tagline: string;
  description: string[];
  cover: string;
  screenshots: string[];
  itchUrl: string;
  trailerId?: string;
  genre?: string;
  platforms: string[];
  tags: string[];
  status: GameStatus;
  statusLabel: string;
  publishedAt?: string;
  updatedAt?: string;
  price?: string;
  contentWarning?: string;
  featured: boolean;
  source: "itch-api" | "fallback";
}

export interface GameOverride {
  slug?: string;
  title?: string;
  tagline?: string;
  description?: string[];
  cover?: string;
  screenshots?: string[];
  trailerId?: string;
  genre?: string;
  platforms?: string[];
  tags?: string[];
  status?: GameStatus;
  statusLabel?: string;
  price?: string;
  contentWarning?: string;
}

export type NewsCategory = "Release" | "Trailer" | "Studio";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "link"; label: string; href: string; external?: boolean };

export interface NewsEntry {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  gameSlug?: string;
  body: NewsBlock[];
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
  isShort: boolean;
  description: string;
}

export interface YouTubeChannel {
  label: string;
  handle: string;
  url: string;
  channelId: string;
  subscribeUrl: string;
  description: string;
  avatar: string;
}

export interface YouTubeData {
  channel: YouTubeChannel;
  videos: YouTubeVideo[];
  featured: YouTubeVideo | null;
  source: "rss" | "fallback";
}
