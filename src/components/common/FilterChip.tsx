import { X } from "lucide-react";

/**
 * Removable representation of one active filter.
 */
export function FilterChip({
  label,
  value,
  onRemove,
}: {
  label: string;
  value: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1.5 pl-3 pr-2.5 text-[13px] text-foreground transition-colors hover:border-brand-200 hover:bg-brand-50"
    >
      <span className="text-subtle-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
      <X className="size-3.5 text-subtle-foreground" aria-hidden="true" />
      <span className="sr-only">Remove filter</span>
    </button>
  );
}
