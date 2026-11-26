import Link from "next/link";

import { EclipseMark } from "@/components/brand/eclipse-mark";
import { cn } from "@/lib/format";

interface LogoLockupProps {
  className?: string;
  onClick?: () => void;
}

export function LogoLockup({ className, onClick }: LogoLockupProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Obscura Studios — home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <EclipseMark className="h-7 w-7 text-paper transition-transform duration-700 ease-cinema group-hover:rotate-[-10deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[13px] font-medium tracking-[0.28em] text-paper">
          OBSCURA
        </span>
        <span className="mt-1.5 font-display text-[9px] font-medium tracking-[0.46em] text-muted">
          STUDIOS
        </span>
      </span>
    </Link>
  );
}
