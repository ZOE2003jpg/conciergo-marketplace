import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LayoutGrid, Rows3, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ConciergeCard } from "@/components/cards/ConciergeCard";
import { NoResultsState } from "@/components/common/states";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilterDrawer,
  FilterSidebar,
  countActiveFilters,
} from "@/features/discovery/FilterBar";
import { filterConcierges } from "@/features/discovery/filterConcierges";
import {
  parseExploreSearch,
  resolveExploreSearch,
  type ExploreSearch,
  type SortOption,
} from "@/features/discovery/search-params";
import { useFavorites } from "@/hooks/useFavorites";

const title = "Explore concierges — Conciergo";
const description =
  "Browse trusted local concierges by destination, service, language, rating and price, and start a conversation before you commit.";

export const Route = createFileRoute("/explore")({
  validateSearch: (input: Record<string, unknown>) => parseExploreSearch(input),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ExplorePage,
});

const sortLabels: Record<SortOption, string> = {
  recommended: "Recommended",
  rating: "Highest rated",
  "price-low": "Price: low to high",
  "price-high": "Price: high to low",
  trips: "Most trips completed",
};

function ExplorePage() {
  const params = Route.useSearch();
  const search = resolveExploreSearch(params);
  const navigate = useNavigate({ from: Route.fullPath });
  const { isFavorite, toggle } = useFavorites();
  const [query, setQuery] = useState(search.q);

  const results = useMemo(() => filterConcierges(search), [search]);
  const activeCount = countActiveFilters(search);

  const update = (patch: Partial<ExploreSearch>) => {
    navigate({ search: (prev) => ({ ...prev, ...patch }) });
  };

  const reset = () => {
    setQuery("");
    navigate({ search: search.view === "list" ? { view: "list" } : {} });
  };

  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow">Explore</p>
          <h1 className="text-section-title mt-3 text-foreground">
            {search.destination ? `Concierges in ${search.destination}` : "Find your concierge"}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Compare local professionals, then start a conversation to agree what you need.
          </p>

          <form
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              update({ q: query });
            }}
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
                aria-hidden="true"
              />
              <Label htmlFor="explore-search" className="sr-only">
                Search concierges
              </Label>
              <Input
                id="explore-search"
                type="search"
                className="pl-10"
                placeholder="Search by name, city, language or service"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      <div className="container-page py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-10">
          <FilterSidebar
            search={search}
            onChange={update}
            onReset={reset}
            activeCount={activeCount}
          />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[14px] text-muted-foreground" aria-live="polite">
                <span className="font-semibold text-foreground">{results.length}</span>{" "}
                {results.length === 1 ? "concierge" : "concierges"} available
              </p>

              <div className="flex items-center gap-2">
                <FilterDrawer
                  search={search}
                  onChange={update}
                  onReset={reset}
                  activeCount={activeCount}
                />
                <Select
                  value={search.sort}
                  onValueChange={(value) => update({ sort: value as SortOption })}
                >
                  <SelectTrigger className="w-[13.5rem]" aria-label="Sort results">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(sortLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
                  <Button
                    variant={search.view === "grid" ? "secondary" : "ghost"}
                    size="icon-sm"
                    aria-label="Grid view"
                    aria-pressed={search.view === "grid"}
                    onClick={() => update({ view: "grid" })}
                  >
                    <LayoutGrid />
                  </Button>
                  <Button
                    variant={search.view === "list" ? "secondary" : "ghost"}
                    size="icon-sm"
                    aria-label="List view"
                    aria-pressed={search.view === "list"}
                    onClick={() => update({ view: "list" })}
                  >
                    <Rows3 />
                  </Button>
                </div>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="mt-8">
                <NoResultsState onReset={reset} />
              </div>
            ) : (
              <div
                className={
                  search.view === "grid"
                    ? "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "mt-6 flex flex-col gap-4"
                }
              >
                {results.map((concierge) => (
                  <ConciergeCard
                    key={concierge.id}
                    concierge={concierge}
                    layout={search.view === "list" ? "row" : "grid"}
                    isFavorite={isFavorite(concierge.id)}
                    onToggleFavorite={toggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
