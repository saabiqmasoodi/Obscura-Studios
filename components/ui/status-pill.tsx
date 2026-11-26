import { cn } from "@/lib/format";
import type { GameStatus } from "@/types";

interface StatusPillProps {
  status: GameStatus;
  label: string;
  className?: string;
}

const dotStyles: Record<GameStatus, string> = {
  released: "bg-crimson-soft",
  "early-access": "bg-amber-300/80",
  "in-development": "bg-paper/60",
  "coming-soon": "bg-paper/40",
};

export function StatusPill({ status, label, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line-strong px-3 py-1.5 font-display text-[9px] font-medium uppercase tracking-[0.2em] text-paper",
        className,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", dotStyles[status])}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
