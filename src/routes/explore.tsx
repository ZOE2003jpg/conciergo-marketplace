import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LayoutGrid, Rows3, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { PRICING_EXPLANATION } from "@/components/common/PricingNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActiveFilterChips } from "@/features/discovery/ActiveFilterChips";
import {
  ConciergeFiltersDrawer,
  ConciergeFiltersSidebar,
} from "@/features/discovery/ConciergeFilters";
import { ConciergeList } from "@/features/discovery/ConciergeList";
import { SortSelect } from "@/features/discovery/SortSelect";
import { filterConcierges } from "@/features/discovery/filterConcierges";
import {
  countActiveFilters,
  parseExploreSearch,
  resolveExploreSearch,
  type ExploreSearch,
} from "@/features/discovery/search-params";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const title = "Explore concierges — Conciergo";
const description =
  "Browse verified individual and company concierges by destination, service, language and experience, then start a conversation about a custom proposal.";

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

function ExplorePage() {
  const params = Route.useSearch();
  const search = resolveExploreSearch(params);
  const navigate = useNavigate({ from: Route.fullPath });
  const { isFavorite, toggle } = useFavorites();
  const [query, setQuery] = useState(search.q);
  const [loading, setLoading] = useState(true);

  const results = useMemo(() => filterConcierges(search), [search]);
  const activeCount = countActiveFilters(search);

  // Mimics a network round trip so the loading state is exercised; a future
  // API call replaces this without changing the components below.
  const filterSignature = JSON.stringify(params);
  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(timer);
  }, [filterSignature]);

  useEffect(() => {
    setQuery(search.q);
  }, [search.q]);

  const update = (patch: Partial<ExploreSearch>) => {
    void navigate({ to: ".", search: (prev) => ({ ...prev, ...patch }) });
  };

  const reset = () => {
    setQuery("");
    void navigate({
      to: ".",
      search: {
        ...(search.view === "list" ? { view: "list" as const } : {}),
        ...(search.sort !== "recommended" ? { sort: search.sort } : {}),
      },
    });
  };

  const filterProps = { search, onChange: update, onReset: reset, activeCount };

  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow">Explore</p>
          <h1 className="text-section-title mt-3 text-foreground">
            {search.destination ? `Concierges in ${search.destination}` : "Find your concierge"}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Compare individuals and concierge companies, then start a conversation.{" "}
            {PRICING_EXPLANATION}
          </p>

          <form
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            role="search"
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
          <ConciergeFiltersSidebar {...filterProps} />

          <div>
            <div className="sticky top-[3.75rem] z-30 -mx-4 mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
              <div className="flex items-center gap-3">
                <ConciergeFiltersDrawer {...filterProps} />
                <p className="text-[14px] text-muted-foreground" aria-live="polite">
                  <span className="font-semibold text-foreground">{results.length}</span>{" "}
                  {results.length === 1 ? "concierge" : "concierges"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SortSelect value={search.sort} onChange={(sort) => update({ sort })} />
                <div
                  className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex"
                  role="group"
                  aria-label="Result layout"
                >
                  {(
                    [
                      { value: "grid", Icon: LayoutGrid, label: "Grid view" },
                      { value: "list", Icon: Rows3, label: "List view" },
                    ] as const
                  ).map(({ value, Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={search.view === value}
                      aria-label={label}
                      onClick={() => update({ view: value })}
                      className={cn(
                        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors",
                        search.view === value
                          ? "bg-secondary text-foreground"
                          : "hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <ActiveFilterChips search={search} onChange={update} onReset={reset} />
            </div>

            <ConciergeList
              concierges={results}
              view={search.view}
              loading={loading}
              onReset={activeCount > 0 ? reset : undefined}
              isFavorite={isFavorite}
              onToggleFavorite={toggle}
            />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
