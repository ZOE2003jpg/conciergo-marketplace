import { concierges } from "@/data/concierges";
import type { Concierge } from "@/types";

import type { ExploreSearch } from "./search-params";

/**
 * Deterministic local filtering and ranking. A future recommendation service
 * can replace the "recommended" branch without touching the UI.
 */
export function filterConcierges(
  search: ExploreSearch,
  source: Concierge[] = concierges,
): Concierge[] {
  const destination = search.destination.trim().toLowerCase();
  const query = search.q.trim().toLowerCase();

  const results = source.filter((concierge) => {
    if (destination) {
      const haystack = [concierge.city, concierge.country, ...concierge.coverage]
        .join(" ")
        .toLowerCase();
      const matches = destination
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .some((part) => haystack.includes(part));
      if (!matches) return false;
    }

    if (query) {
      const haystack = [
        concierge.name,
        concierge.contactName ?? "",
        concierge.headline,
        concierge.city,
        concierge.country,
        ...concierge.coverage,
        ...concierge.languages,
        ...concierge.services.map((service) => service.name),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (search.services.length > 0) {
      const hasService = search.services.some((id) => concierge.serviceIds.includes(id));
      if (!hasService) return false;
    }

    if (search.languages.length > 0) {
      const speaks = search.languages.some((language) => concierge.languages.includes(language));
      if (!speaks) return false;
    }

    if (search.types.length > 0 && !search.types.includes(concierge.type)) return false;
    if (search.minRating > 0 && concierge.rating < search.minRating) return false;
    if (search.minExperience > 0 && concierge.yearsExperience < search.minExperience) return false;
    if (search.corporate && !concierge.corporateReady) return false;
    if (search.verified && !concierge.verified) return false;
    if (search.availableNow && !concierge.availableNow) return false;

    return true;
  });

  const sorted = [...results];
  switch (search.sort) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "reviews":
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "experience":
      sorted.sort(
        (a, b) => b.yearsExperience - a.yearsExperience || b.tripsCompleted - a.tripsCompleted,
      );
      break;
    case "recent":
      sorted.sort((a, b) => a.lastActiveDaysAgo - b.lastActiveDaysAgo);
      break;
    default:
      sorted.sort(
        (a, b) =>
          Number(b.verified) - Number(a.verified) ||
          b.rating * b.reviewCount - a.rating * a.reviewCount,
      );
  }

  return sorted;
}
