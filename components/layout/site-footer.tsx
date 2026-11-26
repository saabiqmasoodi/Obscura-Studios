import { ArrowUpRight } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";

import { LogoLockup } from "@/components/brand/logo-lockup";
import { YouTubeIcon } from "@/components/brand/youtube-icon";
import { navigation, secondaryChannel, site } from "@/content/site";

const exploreLinks = navigation.filter(
  (item) => item.href !== "/" && item.href !== "/about",
);

/**
 * Cached so the current year is allowed during prerendering and refreshes
 * daily without rebuilding the site.
 */
async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCopyrightYear();

  return (
    <footer className="relative border-t border-line bg-surface/30">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <LogoLockup />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.itch.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
              >
                itch.io
                <ArrowUpRight
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={site.youtube.main.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
              >
                <YouTubeIcon className="h-3.5 w-3.5" />
                YouTube
                <ArrowUpRight
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow">Studio</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted transition-colors hover:text-paper"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href={site.itch.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-paper"
                >
                  itch.io
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow">Elsewhere</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.youtube.main.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-paper"
                >
                  {site.youtube.main.label}
                </a>
              </li>
              {secondaryChannel ? (
                <li>
                  <a
                    href={secondaryChannel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-paper"
                  >
                    {secondaryChannel.label || "Second channel"}
                  </a>
                </li>
              ) : null}
              {site.contactEmail ? (
                <li>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-sm text-muted transition-colors hover:text-paper"
                  >
                    Contact
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[9px] uppercase tracking-[0.2em] text-muted/70">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-display text-[9px] uppercase tracking-[0.2em] text-muted/70">
            Independent game studio
          </p>
        </div>
      </div>
    </footer>
  );
}
