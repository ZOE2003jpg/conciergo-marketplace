import { Link } from "@tanstack/react-router";

import { formatCount } from "@/lib/format";
import type { Destination } from "@/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      to="/explore"
      search={{ destination: `${destination.city}, ${destination.country}` }}
      className="group relative block overflow-hidden rounded-xl border border-border"
    >
      <img
        src={destination.image}
        alt={`${destination.city}, ${destination.country}`}
        width={900}
        height={1100}
        loading="lazy"
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-72"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        aria-hidden="true"
      />
      <span className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
        <span className="block text-[17px] font-semibold">{destination.city}</span>
        <span className="mt-0.5 block text-[13px] text-primary-foreground/80">
          {destination.country} · {formatCount(destination.conciergeCount)} concierges
        </span>
      </span>
    </Link>
  );
}
