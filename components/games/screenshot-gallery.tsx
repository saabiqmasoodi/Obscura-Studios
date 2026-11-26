"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/format";

interface ScreenshotGalleryProps {
  images: string[];
  title: string;
}

export function ScreenshotGallery({ images, title }: ScreenshotGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = active !== null;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => {
    setActive((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);
  const previous = useCallback(() => {
    setActive((current) =>
      current === null
        ? null
        : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      60,
    );

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus();
    };
  }, [close, isOpen, next, previous]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Open screenshot ${index + 1} of ${images.length}`}
            className={cn(
              "group relative aspect-video overflow-hidden bg-elevated",
              index === 0 && "sm:col-span-2 lg:col-span-2",
            )}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              sizes={
                index === 0
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              quality={90}
              className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.03]"
            />
            <span
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
              aria-hidden="true"
            />
            <span className="absolute bottom-3 right-3 font-display text-[9px] uppercase tracking-[0.2em] text-paper/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && active !== null ? (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-8">
              <p className="eyebrow">
                {title} — {String(active + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="inline-flex h-11 w-11 items-center justify-center border border-line-strong text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center p-4 md:p-8"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full max-w-6xl"
              >
                <Image
                  src={images[active]}
                  alt={`${title} screenshot ${active + 1}`}
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-contain"
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 border-t border-line py-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previous();
                }}
                aria-label="Previous screenshot"
                className="inline-flex h-11 w-11 items-center justify-center border border-line-strong text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                aria-label="Next screenshot"
                className="inline-flex h-11 w-11 items-center justify-center border border-line-strong text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
