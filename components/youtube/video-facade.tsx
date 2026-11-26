"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

import { cn, formatDate } from "@/lib/format";
import type { YouTubeVideo } from "@/types";

interface VideoFacadeProps {
  video: YouTubeVideo;
  className?: string;
}

export function VideoFacade({ video, className }: VideoFacadeProps) {
  const [active, setActive] = useState(false);
  const [thumbnail, setThumbnail] = useState(
    `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
  );

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden border border-line bg-elevated",
        className,
      )}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${video.title}`}
          className="group absolute inset-0 h-full w-full text-left"
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            quality={90}
            onError={() => setThumbnail(video.thumbnail)}
            className="object-cover opacity-80 transition duration-700 ease-cinema group-hover:scale-[1.02] group-hover:opacity-100"
          />

          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/10"
            aria-hidden="true"
          />

          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center border border-paper/40 bg-ink/30 backdrop-blur-sm transition-colors duration-300 group-hover:border-crimson group-hover:bg-crimson">
              <Play
                className="h-5 w-5 fill-paper text-paper"
                aria-hidden="true"
              />
            </span>
          </span>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 block p-5 md:p-6">
            <span className="block font-display text-lg font-medium leading-snug text-paper md:text-xl">
              {video.title}
            </span>
            <span className="mt-2 block font-display text-[9px] uppercase tracking-[0.2em] text-muted">
              {video.isShort ? "Short" : "Video"} ·{" "}
              {formatDate(video.published, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
