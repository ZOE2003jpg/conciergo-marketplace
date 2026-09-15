import type { ConciergeType, ServiceId } from "@/types";

export type SortOption = "recommended" | "rating" | "reviews" | "experience" | "recent";

export const sortLabels: Record<SortOption, string> = {
  recommended: "Recommended",
  rating: "Highest rated",
  reviews: "Most reviewed",
  experience: "Most experienced",
  recent: "Recently active",
};

export interface ExploreSearch {
  /** Free-text destination, matched against city and country. */
  destination: string;
  services: ServiceId[];
  languages: string[];
  /** Individual, company, or both when empty. */
  types: ConciergeType[];
  minRating: number;
  /** Minimum years of experience. */
  minExperience: number;
  /** Set up for corporate and group travel. */
  corporate: boolean;
  verified: boolean;
  availableNow: boolean;
  sort: SortOption;
  q: string;
  view: "grid" | "list";
  /** Trip context carried from the search panel; not a filter yet. */
  dates: string;
  travellers: number;
}

/** URL shape: every filter is optional so links can set only what they mean. */
export type ExploreSearchParams = Partial<ExploreSearch>;

export const exploreDefaults: ExploreSearch = {
  destination: "",
  services: [],
  languages: [],
  types: [],
  minRating: 0,
  minExperience: 0,
  corporate: false,
  verified: false,
  availableNow: false,
  sort: "recommended",
  q: "",
  view: "grid",
  dates: "",
  travellers: 1,
};

const sortOptions = Object.keys(sortLabels) as SortOption[];
const conciergeTypes: ConciergeType[] = ["individual", "company"];

function strArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const items = value.filter((item): item is string => typeof item === "string");
    return items.length > 0 ? items : undefined;
  }
  if (typeof value === "string" && value.length > 0) return value.split(",").filter(Boolean);
  return undefined;
}

function num(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function bool(value: unknown): boolean | undefined {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return undefined;
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Tolerant parser: malformed URL values are dropped rather than throwing.
 * Singular aliases (`service`, `language`, `type`) are accepted so shared
 * links stay readable.
 */
export function parseExploreSearch(input: Record<string, unknown>): ExploreSearchParams {
  const parsed: ExploreSearchParams = {};

  const destination = str(input["destination"]);
  if (destination) parsed.destination = destination;

  const services = strArray(input["services"]) ?? strArray(input["service"]);
  if (services) parsed.services = services as ServiceId[];

  const languages = strArray(input["languages"]) ?? strArray(input["language"]);
  if (languages) parsed.languages = languages;

  const types = strArray(input["types"]) ?? strArray(input["type"]);
  if (types) {
    const valid = types
      .map((value) => value.toLowerCase())
      .filter((value): value is ConciergeType => conciergeTypes.includes(value as ConciergeType));
    if (valid.length > 0) parsed.types = valid;
  }

  const minRating = num(input["minRating"]);
  if (minRating !== undefined) parsed.minRating = minRating;

  const minExperience = num(input["minExperience"]);
  if (minExperience !== undefined) parsed.minExperience = minExperience;

  const corporate = bool(input["corporate"]);
  if (corporate !== undefined) parsed.corporate = corporate;

  const verified = bool(input["verified"]);
  if (verified !== undefined) parsed.verified = verified;

  const availableNow = bool(input["availableNow"]);
  if (availableNow !== undefined) parsed.availableNow = availableNow;

  const sort = str(input["sort"]) as SortOption | undefined;
  if (sort && sortOptions.includes(sort)) parsed.sort = sort;

  const q = str(input["q"]);
  if (q) parsed.q = q;

  const view = str(input["view"]);
  if (view === "grid" || view === "list") parsed.view = view;

  const dates = str(input["dates"]);
  if (dates) parsed.dates = dates;

  const travellers = num(input["travellers"]);
  if (travellers !== undefined) parsed.travellers = travellers;

  return parsed;
}

/** Fills every filter with its default so components read a complete shape. */
export function resolveExploreSearch(params: ExploreSearchParams): ExploreSearch {
  return { ...exploreDefaults, ...params };
}

export const ratingOptions = [
  { value: 0, label: "Any rating" },
  { value: 4, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
  { value: 4.8, label: "4.8+" },
];

export const experienceOptions = [
  { value: 0, label: "Any experience" },
  { value: 3, label: "3+ years" },
  { value: 5, label: "5+ years" },
  { value: 10, label: "10+ years" },
];

export function countActiveFilters(search: ExploreSearch) {
  let count = 0;
  if (search.destination) count += 1;
  if (search.q) count += 1;
  count += search.services.length;
  count += search.languages.length;
  count += search.types.length;
  if (search.minRating > 0) count += 1;
  if (search.minExperience > 0) count += 1;
  if (search.corporate) count += 1;
  if (search.verified) count += 1;
  if (search.availableNow) count += 1;
  return count;
}
