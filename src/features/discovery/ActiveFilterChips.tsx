import { FilterChip } from "@/components/common/FilterChip";
import { Button } from "@/components/ui/button";
import { serviceById } from "@/data/services";
import { conciergeTypeLabel } from "@/components/common/ConciergeTypeBadge";

import { experienceOptions, ratingOptions, type ExploreSearch } from "./search-params";

interface ActiveFilterChipsProps {
  search: ExploreSearch;
  onChange: (patch: Partial<ExploreSearch>) => void;
  onReset: () => void;
}

export function ActiveFilterChips({ search, onChange, onReset }: ActiveFilterChipsProps) {
  const chips: { key: string; label: string; value: string; remove: () => void }[] = [];

  if (search.q) {
    chips.push({ key: "q", label: "Search", value: search.q, remove: () => onChange({ q: "" }) });
  }

  if (search.destination) {
    chips.push({
      key: "destination",
      label: "Destination",
      value: search.destination,
      remove: () => onChange({ destination: "" }),
    });
  }

  search.services.forEach((id) => {
    chips.push({
      key: `service-${id}`,
      label: "Service",
      value: serviceById[id]?.name ?? id,
      remove: () => onChange({ services: search.services.filter((value) => value !== id) }),
    });
  });

  search.types.forEach((type) => {
    chips.push({
      key: `type-${type}`,
      label: "Type",
      value: conciergeTypeLabel(type),
      remove: () => onChange({ types: search.types.filter((value) => value !== type) }),
    });
  });

  search.languages.forEach((language) => {
    chips.push({
      key: `language-${language}`,
      label: "Language",
      value: language,
      remove: () => onChange({ languages: search.languages.filter((value) => value !== language) }),
    });
  });

  if (search.minRating > 0) {
    const label = ratingOptions.find((option) => option.value === search.minRating)?.label;
    chips.push({
      key: "minRating",
      label: "Rating",
      value: label ?? `${search.minRating}+`,
      remove: () => onChange({ minRating: 0 }),
    });
  }

  if (search.minExperience > 0) {
    const label = experienceOptions.find((option) => option.value === search.minExperience)?.label;
    chips.push({
      key: "minExperience",
      label: "Experience",
      value: label ?? `${search.minExperience}+ years`,
      remove: () => onChange({ minExperience: 0 }),
    });
  }

  if (search.corporate) {
    chips.push({
      key: "corporate",
      label: "Capability",
      value: "Corporate & group travel",
      remove: () => onChange({ corporate: false }),
    });
  }

  if (search.availableNow) {
    chips.push({
      key: "availableNow",
      label: "Availability",
      value: "Available now",
      remove: () => onChange({ availableNow: false }),
    });
  }

  if (search.verified) {
    chips.push({
      key: "verified",
      label: "Trust",
      value: "Verified only",
      remove: () => onChange({ verified: false }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {chips.map((chip) => (
        <FilterChip key={chip.key} label={chip.label} value={chip.value} onRemove={chip.remove} />
      ))}
      <Button variant="link" size="sm" onClick={onReset}>
        Clear filters
      </Button>
    </div>
  );
}
