import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: ReactNode;
  showArrow?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "border border-crimson bg-crimson text-white hover:border-crimson-bright hover:bg-crimson-bright",
  secondary:
    "border border-line-strong bg-transparent text-paper hover:border-paper/40 hover:bg-paper/[0.04]",
  ghost:
    "border border-transparent bg-transparent text-muted hover:text-paper",
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  external,
  icon,
  showArrow = true,
  className,
  ariaLabel,
}: ActionLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  const content = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {showArrow ? (
        isExternal ? (
          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-cinema group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        ) : (
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-cinema group-hover:translate-x-1"
            aria-hidden="true"
          />
        )
      ) : null}
    </>
  );

  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2.5 px-5 py-3 font-display text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-soft",
    variants[variant],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
