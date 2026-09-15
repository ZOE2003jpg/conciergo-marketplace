import type { ReactNode } from "react";
import { Compass, SearchX, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: StateProps) {
  return (
    <div
      className={cn(
        "surface-card flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
    >
      <span className="mb-4 inline-flex size-11 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon ?? <Compass className="size-5" aria-hidden="true" />}
      </span>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function NoResultsState({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      icon={<SearchX className="size-5" aria-hidden="true" />}
      title="No concierges match these filters"
      description="Try widening your destination, removing a service filter or lowering the minimum rating."
      action={
        onReset ? (
          <Button variant="secondary" onClick={onReset}>
            Clear all filters
          </Button>
        ) : undefined
      }
    />
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={<TriangleAlert className="size-5" aria-hidden="true" />}
      title="Something went wrong"
      description="We couldn't load this section. Please try again."
      action={
        onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        ) : undefined
      }
    />
  );
}

export function ConciergeCardSkeleton() {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start gap-4">
        <Skeleton className="size-14 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-28 rounded-[10px]" />
      </div>
    </div>
  );
}

export function ConciergeGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <ConciergeCardSkeleton key={index} />
      ))}
    </div>
  );
}
