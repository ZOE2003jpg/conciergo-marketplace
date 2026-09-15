import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  className?: string;
  showCount?: boolean;
}

export function Rating({ value, reviewCount, className, showCount = true }: RatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm", className)}>
      <Star className="size-3.5 fill-brand-500 text-brand-500" aria-hidden="true" />
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {showCount && reviewCount !== undefined ? (
        <span className="text-subtle-foreground">({reviewCount})</span>
      ) : null}
      <span className="sr-only">
        Rated {value} out of 5{reviewCount !== undefined ? ` from ${reviewCount} reviews` : ""}
      </span>
    </span>
  );
}

export function StarRow({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "size-3.5",
            star <= Math.round(value) ? "fill-brand-500 text-brand-500" : "text-border",
          )}
        />
      ))}
    </span>
  );
}
