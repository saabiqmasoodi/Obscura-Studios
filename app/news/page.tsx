import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";
import { news } from "@/content/news";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageOpenGraph } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "News",
  description:
    "Releases, trailers, and studio updates from Obscura Studios.",
  alternates: { canonical: "/news" },
  openGraph: pageOpenGraph({
    title: `News — ${site.name}`,
    description:
      "Releases, trailers, and studio updates from Obscura Studios.",
    url: "/news",
  }),
};

export default function NewsPage() {
  const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [lead, ...rest] = sorted;

  return (
    <>
      <section className="pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="container-editorial">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
                News
              </span>
              <span className="eyebrow">Studio updates</span>
            </div>
            <span className="eyebrow">
              {sorted.length} {sorted.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.86] tracking-[-0.055em] text-paper">
            News &amp; updates.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Releases, trailers, and notes on what the studio is building next.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-editorial">
          {lead ? (
            <Link
              href={`/news/${lead.slug}`}
              className="group block border-t border-line pt-8"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[9px] uppercase tracking-[0.2em]">
                <span className="text-crimson-soft">{lead.category}</span>
                <span className="text-muted">
                  {formatDate(lead.date, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h2 className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-paper">
                {lead.title}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                {lead.excerpt}
              </p>

              <span className="mt-7 inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-paper">
                Read update
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ) : null}

          {rest.length > 0 ? (
            <ol className="mt-16">
              {rest.map((entry, index) => (
                <Reveal as="li" key={entry.slug} delay={index * 0.05}>
                  <Link
                    href={`/news/${entry.slug}`}
                    className="group grid gap-3 border-t border-line py-6 md:grid-cols-12 md:items-center md:gap-6 md:py-7"
                  >
                    <span className="font-display text-[9px] uppercase tracking-[0.2em] text-muted md:col-span-2">
                      {formatDate(entry.date, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-display text-[9px] uppercase tracking-[0.2em] text-crimson-soft md:col-span-2">
                      {entry.category}
                    </span>
                    <span className="md:col-span-7">
                      <span className="block font-display text-xl font-medium leading-snug text-paper transition-transform duration-500 ease-cinema group-hover:translate-x-1 md:text-2xl">
                        {entry.title}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted">
                        {entry.excerpt}
                      </span>
                    </span>
                    <span className="hidden justify-end md:col-span-1 md:flex">
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ol>
          ) : null}

          <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Follow the studio for trailers, teasers, and development notes.
            </p>
            <ActionLink href={site.youtube.main.url} external variant="secondary">
              Subscribe on YouTube
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
