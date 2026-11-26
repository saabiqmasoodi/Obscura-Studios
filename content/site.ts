/**
 * Central studio configuration.
 *
 * Everything a non-developer is likely to change lives here.
 * Secrets (the itch.io API key) live in .env.local — never in this file.
 */

export const site = {
  name: "Obscura Studios",
  shortName: "Obscura",
  tagline: "We create worlds that stay with you.",
  description:
    "Obscura Studios is an independent game development studio creating atmospheric, first-person experiences about the things waiting in ordinary places.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  locale: "en_US",
  copyrightYear: 2026,

  itch: {
    username: "obscurastudios",
    profileUrl: "https://obscurastudios.itch.io/",
  },

  youtube: {
    main: {
      label: "Obscura Studios",
      handle: "@obscuragamesh",
      url: "https://www.youtube.com/@obscuragamesh",
      channelId: "UC1sda0FWfPXZOSKmnD5hI4A",
      subscribeUrl:
        "https://www.youtube.com/@obscuragamesh?sub_confirmation=1",
      description:
        "Independent horror studio. Small, atmospheric, first-person games about the things waiting in ordinary houses.",
      avatar:
        "https://yt3.googleusercontent.com/fkmVjgED7YGpPd_JArhGhQlT3msR88M9KJWO8ME8JjpRW-j_LEX2fzEsu9UICrgfSFVvJR5Leg=s176-c-k-c0x00ffffff-no-rj",
    },

    /**
     * Secondary / creator channel.
     *
     * The brief asks for a second channel button. Add its real URL here and
     * the button appears automatically in the header, YouTube section and
     * footer. While `url` is empty, no dead button is rendered.
     */
    secondary: {
      label: "",
      handle: "",
      url: "",
      channelId: "",
      subscribeUrl: "",
      description: "",
      avatar: "",
    },
  },

  contactEmail: null as string | null,

  /**
   * Optional: pin a specific game to the homepage hero feature.
   * Leave null to feature the newest published game automatically.
   */
  featuredGameSlug: null as string | null,
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
] as const;

export const secondaryChannel = site.youtube.secondary.url
  ? site.youtube.secondary
  : null;
