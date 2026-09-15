import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";

import { Rating } from "@/components/common/Rating";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { Button } from "@/components/ui/button";
import { formatCount, formatPrice, joinWithDot } from "@/lib/format";
import { serviceById } from "@/data/services";
import { cn } from "@/lib/utils";
import type { Concierge } from "@/types";

interface ConciergeCardProps {
  concierge: Concierge;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  layout?: "grid" | "row";
}

export function ConciergeCard({
  concierge,
  isFavorite = false,
  onToggleFavorite,
  layout = "grid",
}: ConciergeCardProps) {
  const services = concierge.serviceIds.slice(0, 3).map((id) => serviceById[id].name);

  return (
    <article
      className={cn(
        "surface-card group relative flex flex-col p-5 transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift",
        layout === "row" && "sm:flex-row sm:items-start sm:gap-6",
      )}
    >
      <div className={cn("flex items-start gap-4", layout === "row" && "sm:w-64 sm:shrink-0")}>
        <img
          src={concierge.avatar}
          alt={`${concierge.name}, concierge in ${concierge.city}`}
          width={640}
          height={640}
          loading="lazy"
          className="size-14 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[15px] font-semibold text-foreground">
              {concierge.name}
            </h3>
            {concierge.verified ? <VerifiedBadge withLabel={false} /> : null}
          </div>
          <p className="mt-1 inline-flex items-center gap-1 text-[13px] text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {concierge.city}, {concierge.country}
          </p>
          <div className="mt-1.5">
            <Rating value={concierge.rating} reviewCount={concierge.reviewCount} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col sm:mt-4">
        <p className="text-[13px] text-subtle-foreground">
          {joinWithDot(concierge.languages)}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {services.map((service) => (
            <li
              key={service}
              className="rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[12px] text-muted-foreground"
            >
              {service}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-subtle-foreground">
          {formatCount(concierge.tripsCompleted)} trips completed
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            From{" "}
            <span className="text-[15px] font-semibold text-foreground">
              {formatPrice(concierge.fromPrice, concierge.currency)}
            </span>
          </p>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/concierges/$conciergeId" params={{ conciergeId: concierge.id }}>
              View profile
            </Link>
          </Button>
        </div>
      </div>

      {onToggleFavorite ? (
        <button
          type="button"
          onClick={() => onToggleFavorite(concierge.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? `Remove ${concierge.name} from saved` : `Save ${concierge.name}`
          }
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-brand-600"
        >
          <Heart
            className={cn("size-4", isFavorite && "fill-brand-500 text-brand-500")}
            aria-hidden="true"
          />
        </button>
      ) : null}
    </article>
  );
}
