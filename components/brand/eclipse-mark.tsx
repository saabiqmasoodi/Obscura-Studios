import { cn } from "@/lib/format";

const RING =
  "M50 3a47 47 0 1 0 0 94 47 47 0 1 0 0-94Zm0 3.5a43.5 43.5 0 1 1 0 87 43.5 43.5 0 1 1 0-87Z";

const DISC =
  "M47 14a33 33 0 1 0 0 66 33 33 0 1 0 0-66ZM50 28c3.6 10 3.6 28 0 38-3.6-10-3.6-28 0-38Z";

interface EclipseMarkProps {
  className?: string;
  title?: string;
}

/**
 * The Obscura Studios eclipse mark.
 * A corona ring, an offset occluding disc, and a slit of negative space.
 */
export function EclipseMark({ className, title }: EclipseMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      shapeRendering="geometricPrecision"
    >
      {title ? <title>{title}</title> : null}
      <path d={RING} fill="currentColor" fillRule="evenodd" />
      <path d={DISC} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
