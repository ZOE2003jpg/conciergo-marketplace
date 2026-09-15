import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-6.5-5.1-6.5-10a6.5 6.5 0 1 1 13 0c0 4.9-6.5 10-6.5 10Z" />
        <circle cx="12" cy="10.5" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md text-[19px] font-semibold tracking-[-0.03em] text-foreground",
        className,
      )}
      aria-label="Conciergo home"
    >
      <BrandMark />
      <span>Conciergo</span>
    </Link>
  );
}
