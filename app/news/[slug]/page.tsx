import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ActionLink } from "@/components/ui/action-link";
import { getNewsEntry, news } from "@/content/news";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { defaultOgImage, defaultTwitterImage } from "@/lib/metadata";
import type { NewsEntry } from "@/types";

interface NewsPageParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: NewsPageParams): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  if (!entry) return { title: "Update not found" };

  return {
    title: entry.title,
    description: entry.excerpt,
    alternates: { canonical: `/news/${entry.slug}` },
    openGraph: {
      type: "article",
      locale: site.locale,
      siteName: site.name,
      title: `${entry.title} — ${site.name}`,
      description: entry.excerpt,
      url: `/news/${entry.slug}`,
      publishedTime: entry.date,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.title} — ${site.name}`,
      description: entry.excerpt,
      images: [defaultTwitterImage],
    },
  };
}

export default function NewsDetailPage({ params }: NewsPageParams) {
  return (
    <Suspense fallback={<NewsDetailSkeleton />}>
      <NewsDetail params={params} />
    </Suspense>
  );
}

async function NewsDetail({ params }: NewsPageParams) {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  if (!entry) notFound();

  return (
    <article>
      <header className="pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="container-editorial">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 font-display text-[9px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All updates
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 font-display text-[9px] uppercase tracking-[0.2em]">
            <span className="text-crimson-soft">{entry.category}</span>
            <span className="text-muted">
              {formatDate(entry.date, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.9] tracking-[-0.05em] text-paper">
            {entry.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {entry.excerpt}
          </p>
        </div>
      </header>

      <div className="pb-24 md:pb-32">
        <div className="container-editorial">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <div className="border-t border-line pt-5">
                <p className="eyebrow">Filed under</p>
                <p className="mt-3 text-sm text-paper/80">{entry.category}</p>
                <p className="mt-1 text-sm text-muted">
                  {formatDate(entry.date, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="border-t border-line pt-8 md:col-span-7 md:col-start-5">
              {entry.body.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      className="mt-10 font-display text-2xl font-medium tracking-[-0.02em] text-paper first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={`${block.type}-${index}`}
                      className="mt-8 border-l border-crimson/60 pl-5 font-display text-xl leading-relaxed text-paper/90"
                    >
                      {block.text}
                    </blockquote>
                  );
                }

                if (block.type === "link") {
                  return (
                    <div key={`${block.type}-${index}`} className="mt-5">
                      <ActionLink
                        href={block.href}
                        variant="secondary"
                        external={block.external}
                      >
                        {block.label}
                      </ActionLink>
                    </div>
                  );
                }

                return (
                  <p
                    key={`${block.type}-${index}`}
                    className={
                      index === 0
                        ? "text-lg leading-relaxed text-paper/85"
                        : "mt-6 text-base leading-relaxed text-muted"
                    }
                  >
                    {block.text}
                  </p>
                );
              })}

              {entry.gameSlug ? (
                <div className="mt-12 border border-line p-6">
                  <p className="eyebrow">Related game</p>
                  <ActionLink
                    href={`/games/${entry.gameSlug}`}
                    variant="secondary"
                    className="mt-4"
                  >
                    View the game
                  </ActionLink>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <NewsStructuredData entry={entry} />
    </article>
  );
}

function NewsDetailSkeleton() {
  return (
    <section className="pb-24 pt-32">
      <div className="container-editorial">
        <div className="h-3 w-24 animate-pulse bg-elevated" />
        <div className="mt-8 h-3 w-40 animate-pulse bg-elevated" />
        <div className="mt-6 h-20 w-3/4 animate-pulse bg-elevated" />
        <div className="mt-6 h-4 w-1/2 animate-pulse bg-elevated" />
      </div>
    </section>
  );
}

function NewsStructuredData({ entry }: { entry: NewsEntry }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: entry.title,
    description: entry.excerpt,
    datePublished: entry.date,
    dateModified: entry.date,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/branding/obscura-mark-white-on-black.svg`,
      },
    },
    mainEntityOfPage: `${site.url}/news/${entry.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
