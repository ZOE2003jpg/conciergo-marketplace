import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Visual indicator only. Verification is not operational in this phase.
 */
export function VerifiedBadge({
  className,
  withLabel = true,
}: {
  className?: string;
  withLabel?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700",
        className,
      )}
      title="Identity details submitted for review"
    >
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      {withLabel ? "Verified" : <span className="sr-only">Verified</span>}
    </span>
  );
}
