import { ConciergeCard } from "@/components/cards/ConciergeCard";
import { EmptyResults, LoadingResults } from "@/components/common/states";
import type { Concierge } from "@/types";

interface ConciergeListProps {
  concierges: Concierge[];
  view: "grid" | "list";
  loading?: boolean;
  onReset?: () => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function ConciergeList({
  concierges,
  view,
  loading = false,
  onReset,
  isFavorite,
  onToggleFavorite,
}: ConciergeListProps) {
  if (loading) return <LoadingResults view={view} />;
  if (concierges.length === 0) return <EmptyResults onReset={onReset} />;

  return (
    <ul
      className={
        view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"
      }
    >
      {concierges.map((concierge) => (
        <li key={concierge.id}>
          <ConciergeCard
            concierge={concierge}
            layout={view === "list" ? "row" : "grid"}
            isFavorite={isFavorite(concierge.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}
