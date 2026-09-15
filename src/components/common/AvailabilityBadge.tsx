import { CircleDot, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Availability is indicative only. Dates are confirmed in conversation.
 */
export function AvailabilityBadge({
  availableNow,
  className,
}: {
  availableNow: boolean;
  className?: string;
}) {
  const Icon = availableNow ? CircleDot : Clock;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium",
        availableNow
          ? "border-brand-200 bg-brand-50 text-brand-700"
          : "border-border bg-secondary/70 text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {availableNow ? "Available now" : "Limited availability"}
    </span>
  );
}
