import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "conciergo.favorites";

/**
 * Local-only favourites. Swap the storage calls for an API when accounts exist.
 */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw) as string[]);
    } catch {
      /* ignore unreadable storage */
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore write failure */
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => hydrated && ids.includes(id), [hydrated, ids]);

  return { favorites: ids, toggle, isFavorite, hydrated };
}
