import { Building2, User } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ConciergeType } from "@/types";

const labels: Record<ConciergeType, string> = {
  individual: "Individual",
  company: "Company",
};

/**
 * Communicates the account type with an icon and a word, never colour alone.
 */
export function ConciergeTypeBadge({
  type,
  className,
  variant = "inline",
}: {
  type: ConciergeType;
  className?: string;
  variant?: "inline" | "chip";
}) {
  const Icon = type === "company" ? Building2 : User;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground",
        variant === "chip" &&
          "rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[12px]",
        className,
      )}
    >
      <Icon className="size-3.5 text-subtle-foreground" aria-hidden="true" />
      {labels[type]}
    </span>
  );
}

export function conciergeTypeLabel(type: ConciergeType) {
  return labels[type];
}
