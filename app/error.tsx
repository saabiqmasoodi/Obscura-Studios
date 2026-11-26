"use client";

import { useEffect } from "react";

import { ActionLink } from "@/components/ui/action-link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center pb-24 pt-32">
      <div className="container-editorial">
        <div className="flex items-center gap-4 border-t border-line pt-5">
          <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
            Error
          </span>
          <span className="eyebrow">Something went wrong</span>
        </div>

        <h1 className="mt-12 max-w-3xl text-balance font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.05em] text-paper">
          The signal dropped.
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          An unexpected error interrupted this page. Try again — if it keeps
          happening, the problem is on our side.
        </p>

        {error.digest ? (
          <p className="mt-4 font-display text-[9px] uppercase tracking-[0.2em] text-muted/60">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex min-h-11 items-center justify-center gap-2.5 border border-crimson bg-crimson px-5 py-3 font-display text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-crimson-bright hover:bg-crimson-bright"
          >
            Try again
          </button>
          <ActionLink href="/" variant="secondary" showArrow={false}>
            Back to home
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
