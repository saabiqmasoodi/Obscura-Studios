import type { ReactNode } from "react";

import { cn } from "@/lib/format";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("border-t border-line pt-5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
            {index}
          </span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <h2
        className={cn(
          "display-section mt-7 max-w-4xl text-balance text-paper",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
