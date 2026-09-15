import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { sortLabels, type SortOption } from "./search-params";

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as SortOption)}>
      <SelectTrigger className="w-[12.5rem]" aria-label="Sort results">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(sortLabels) as SortOption[]).map((option) => (
          <SelectItem key={option} value={option}>
            {sortLabels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
