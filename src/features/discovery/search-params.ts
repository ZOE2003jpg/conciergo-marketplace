import type { ServiceId } from "@/types";

export type SortOption = "recommended" | "rating" | "price-low" | "price-high" | "trips";

export interface ExploreSearch {
  destination: string;
  services: ServiceId[];
  languages: string[];
  minRating: number;
  maxPrice: number;
  verified: boolean;
  availableNow: boolean;
  sort: SortOption;
  q: string;
  view: "grid" | "list";
  dates: string;
  travellers: number;
}

/** URL shape: every filter is optional so links can set only what they mean. */
export type ExploreSearchParams = Partial<ExploreSearch>;

export const exploreDefaults: ExploreSearch = {
  destination: "",
  services: [],
  languages: [],
  minRating: 0,
  maxPrice: 400,
  verified: false,
  availableNow: false,
  sort: "recommended",
  q: "",
  view: "grid",
  dates: "",
  travellers: 2,
};

export const PRICE_CEILING = 400;

const sortOptions: SortOption[] = ["recommended", "rating", "price-low", "price-high", "trips"];

function strArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value === "string" && value.length > 0) return value.split(",");
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

/** Tolerant parser: malformed URL values are dropped rather than throwing. */
export function parseExploreSearch(input: Record<string, unknown>): ExploreSearchParams {
  const parsed: ExploreSearchParams = {};

  const destination = str(input["destination"]);
  if (destination) parsed.destination = destination;

  const services = strArray(input["services"]);
  if (services) parsed.services = services as ServiceId[];

  const languages = strArray(input["languages"]);
  if (languages) parsed.languages = languages;

  const minRating = num(input["minRating"]);
  if (minRating !== undefined) parsed.minRating = minRating;

  const maxPrice = num(input["maxPrice"]);
  if (maxPrice !== undefined) parsed.maxPrice = maxPrice;

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

/** Fills every filter with its default so components can read a complete shape. */
export function resolveExploreSearch(params: ExploreSearchParams): ExploreSearch {
  return { ...exploreDefaults, ...params };
}
