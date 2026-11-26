import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { formatDate } from "@/lib/format";
import type { YouTubeVideo } from "@/types";

interface VideoRowProps {
  video: YouTubeVideo;
}

export function VideoRow({ video }: VideoRowProps) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 border-t border-line pt-4"
    >
      <span className="relative aspect-video w-28 shrink-0 overflow-hidden bg-elevated sm:w-32">
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="128px"
          quality={75}
          className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 block font-display text-sm font-medium leading-snug text-paper/90 transition-colors group-hover:text-paper">
          {video.title}
        </span>
        <span className="mt-2 block font-display text-[9px] uppercase tracking-[0.18em] text-muted">
          {video.isShort ? "Short" : "Video"} ·{" "}
          {formatDate(video.published, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </span>

      <ArrowUpRight
        className="mt-1 h-3.5 w-3.5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
        aria-hidden="true"
      />
    </a>
  );
}
