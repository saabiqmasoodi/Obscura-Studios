import type { Metadata } from "next";

import { site } from "@/content/site";

/**
 * Shared social preview defaults.
 *
 * Next merges metadata per field, so a page that declares `openGraph` replaces
 * the layout's object. Pages should build their object with this helper to
 * keep the image, locale and site name.
 */
export const defaultOgImage = {
  url: "/branding/og-obscura.png",
  width: 1200,
  height: 630,
  alt: "Obscura Studios — We create worlds that stay with you.",
};

interface PageOpenGraph {
  title?: string;
  description?: string;
  url: string;
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
}

export function pageOpenGraph({
  title,
  description,
  url,
  images,
}: PageOpenGraph): Metadata["openGraph"] {
  return {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title,
    description,
    url,
    images: images && images.length > 0 ? images : [defaultOgImage],
  };
}

export const defaultTwitterImage = defaultOgImage.url;
