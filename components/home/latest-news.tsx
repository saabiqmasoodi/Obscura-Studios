import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/format";
import type { NewsEntry } from "@/types";

interface LatestNewsProps {
  entries: NewsEntry[];
}

export function LatestNews({ entries }: LatestNewsProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <SectionHeading
          index="05"
          eyebrow="Latest news"
          title="From the studio."
          description="Releases, trailers and notes on what comes next."
          action={
            <ActionLink
              href="/news"
              variant="ghost"
              className="px-0 py-0"
            >
              All updates
            </ActionLink>
          }
        />

        <ol className="mt-12">
          {entries.map((entry, index) => (
            <Reveal as="li" key={entry.slug} delay={index * 0.05}>
              <Link
                href={`/news/${entry.slug}`}
                className="group grid gap-3 border-t border-line py-6 transition-colors md:grid-cols-12 md:items-center md:gap-6 md:py-7"
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
      </div>
    </section>
  );
}
