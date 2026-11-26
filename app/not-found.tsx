import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EclipseMark } from "@/components/brand/eclipse-mark";
import { ActionLink } from "@/components/ui/action-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pb-24 pt-32">
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <div className="container-editorial relative z-10">
        <div className="flex items-center gap-4 border-t border-line pt-5">
          <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
            404
          </span>
          <span className="eyebrow">Nothing here</span>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h1 className="text-balance font-display text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.05em] text-paper">
              This page is still in the dark.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              The address may have changed, or the page may never have existed.
              Either way, there is nothing to see here.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="/" showArrow={false}>
                Back to home
              </ActionLink>
              <ActionLink href="/games" variant="secondary">
                Browse games
              </ActionLink>
            </div>

            <Link
              href="/news"
              className="group mt-10 inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Read the latest updates
            </Link>
          </div>

          <div className="hidden justify-end md:col-span-5 md:flex">
            <EclipseMark className="h-64 w-64 text-paper/[0.06]" />
          </div>
        </div>
      </div>
    </section>
  );
}
