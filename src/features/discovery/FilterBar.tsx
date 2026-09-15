import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { destinationOptions } from "@/data/destinations";
import { languageOptions, serviceCategories } from "@/data/services";
import { formatPrice } from "@/lib/format";
import type { ServiceId } from "@/types";

import { PRICE_CEILING, exploreDefaults, type ExploreSearch } from "./search-params";

export interface FilterBarProps {
  search: ExploreSearch;
  onChange: (patch: Partial<ExploreSearch>) => void;
  onReset: () => void;
  activeCount: number;
}

const ratingOptions = [
  { value: 0, label: "Any rating" },
  { value: 4, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
  { value: 4.8, label: "4.8+" },
];

function toggleItem<T>(list: T[], item: T) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

function FilterFields({ search, onChange }: Pick<FilterBarProps, "search" | "onChange">) {
  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <Label htmlFor="filter-destination">Destination</Label>
        <Input
          id="filter-destination"
          list="filter-destination-options"
          placeholder="City or country"
          value={search.destination}
          onChange={(event) => onChange({ destination: event.target.value })}
        />
        <datalist id="filter-destination-options">
          {destinationOptions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-[13px] font-medium text-foreground">Services</legend>
        <div className="grid gap-2.5">
          {serviceCategories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2.5 text-[14px] text-muted-foreground"
            >
              <Checkbox
                checked={search.services.includes(category.id)}
                onCheckedChange={() =>
                  onChange({ services: toggleItem<ServiceId>(search.services, category.id) })
                }
              />
              {category.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-[13px] font-medium text-foreground">Languages</legend>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((language) => {
            const active = search.languages.includes(language);
            return (
              <button
                key={language}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ languages: toggleItem(search.languages, language) })}
                className={
                  active
                    ? "rounded-full border border-brand-500 bg-brand-50 px-3 py-1.5 text-[13px] font-medium text-brand-700"
                    : "rounded-full border border-border px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-brand-200 hover:text-foreground"
                }
              >
                {language}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="filter-rating">Minimum rating</Label>
        <Select
          value={String(search.minRating)}
          onValueChange={(value) => onChange({ minRating: Number(value) })}
        >
          <SelectTrigger id="filter-rating">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ratingOptions.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="filter-price">Starting price</Label>
          <span className="text-[13px] text-muted-foreground">
            {search.maxPrice >= PRICE_CEILING
              ? "Any price"
              : `Up to ${formatPrice(search.maxPrice)}`}
          </span>
        </div>
        <Slider
          id="filter-price"
          min={40}
          max={PRICE_CEILING}
          step={20}
          value={[search.maxPrice]}
          onValueChange={(value) => onChange({ maxPrice: value[0] ?? PRICE_CEILING })}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="filter-available" className="font-normal text-muted-foreground">
            Available now
          </Label>
          <Switch
            id="filter-available"
            checked={search.availableNow}
            onCheckedChange={(checked) => onChange({ availableNow: checked })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="filter-verified" className="font-normal text-muted-foreground">
            Verified profiles only
          </Label>
          <Switch
            id="filter-verified"
            checked={search.verified}
            onCheckedChange={(checked) => onChange({ verified: checked })}
          />
        </div>
      </div>
    </div>
  );
}

export function FilterSidebar({ search, onChange, onReset, activeCount }: FilterBarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-foreground">Filters</h2>
          {activeCount > 0 ? (
            <Button variant="link" size="sm" onClick={onReset}>
              Clear all
            </Button>
          ) : null}
        </div>
        <div className="mt-6">
          <FilterFields search={search} onChange={onChange} />
        </div>
      </div>
    </aside>
  );
}

export function FilterDrawer({ search, onChange, onReset, activeCount }: FilterBarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <SlidersHorizontal />
          Filters
          {activeCount > 0 ? (
            <span className="ml-1 rounded-full bg-brand-500 px-1.5 text-[11px] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-8">
          <FilterFields search={search} onChange={onChange} />
          {activeCount > 0 ? (
            <Button variant="ghost" className="mt-6 w-full" onClick={onReset}>
              <X />
              Clear all filters
            </Button>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function countActiveFilters(search: ExploreSearch) {
  let count = 0;
  if (search.destination !== exploreDefaults.destination) count += 1;
  count += search.services.length;
  count += search.languages.length;
  if (search.minRating > 0) count += 1;
  if (search.maxPrice < PRICE_CEILING) count += 1;
  if (search.verified) count += 1;
  if (search.availableNow) count += 1;
  return count;
}
