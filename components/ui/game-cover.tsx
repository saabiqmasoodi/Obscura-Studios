import Image from "next/image";

import { EclipseMark } from "@/components/brand/eclipse-mark";
import { cn } from "@/lib/format";

interface GameCoverProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  preload?: boolean;
  quality?: 75 | 90;
}

export function GameCover({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 60vw",
  preload = false,
  quality = 90,
}: GameCoverProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-elevated px-6 text-center",
          className,
        )}
      >
        <EclipseMark className="h-10 w-10 text-paper/20" />
        <span className="font-display text-xs uppercase tracking-[0.24em] text-muted">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      loading={preload ? "eager" : undefined}
      quality={quality}
      className={cn("object-cover", imageClassName, className)}
    />
  );
}
