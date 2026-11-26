export default function Loading() {
  return (
    <div
      className="flex min-h-[70svh] items-center justify-center pt-24"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-crimson-soft" />
        </span>
        <span className="font-display text-[9px] uppercase tracking-[0.28em] text-muted">
          Loading
        </span>
      </div>
    </div>
  );
}
