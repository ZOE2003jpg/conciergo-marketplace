import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { destinationOptions } from "@/data/destinations";
import { serviceCategories } from "@/data/services";
import { cn } from "@/lib/utils";
import type { ServiceId } from "@/types";

interface SearchPanelProps {
  initial?: { destination?: string; service?: string; dates?: string; travellers?: number };
  variant?: "hero" | "inline";
  className?: string;
}

export function SearchPanel({ initial, variant = "hero", className }: SearchPanelProps) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [service, setService] = useState(initial?.service ?? "");
  const [dates, setDates] = useState(initial?.dates ?? "");
  const [travellers, setTravellers] = useState(initial?.travellers ?? 2);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    void navigate({
      to: "/explore",
      search: {
        destination,
        services: service ? [service as ServiceId] : [],
        dates,
        travellers,
      },
    }).finally(() => setSubmitting(false));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-border bg-surface p-3 shadow-panel md:p-2.5",
        variant === "inline" && "shadow-card",
        className,
      )}
      role="search"
      aria-label="Find a concierge"
    >
      <div className="grid gap-2 md:grid-cols-[1.3fr_1.3fr_1fr_0.8fr_auto] md:items-stretch md:gap-0 md:divide-x md:divide-border">
        <Field
          label="Destination"
          icon={<MapPin className="size-4" aria-hidden="true" />}
          htmlFor="search-destination"
        >
          <input
            id="search-destination"
            list="conciergo-destinations"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Where are you going?"
            className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-subtle-foreground"
            autoComplete="off"
          />
          <datalist id="conciergo-destinations">
            {destinationOptions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </Field>

        <Field
          label="What do you need?"
          icon={<Sparkles className="size-4" aria-hidden="true" />}
          htmlFor="search-service"
        >
          <select
            id="search-service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            className={cn(
              "w-full cursor-pointer appearance-none bg-transparent text-[15px] outline-none",
              service ? "text-foreground" : "text-subtle-foreground",
            )}
          >
            <option value="">What can we help with?</option>
            {serviceCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Dates"
          icon={<CalendarDays className="size-4" aria-hidden="true" />}
          htmlFor="search-dates"
        >
          <input
            id="search-dates"
            type="date"
            value={dates}
            onChange={(event) => setDates(event.target.value)}
            aria-label="When are you travelling?"
            className="w-full bg-transparent text-[15px] text-foreground outline-none"
          />
        </Field>

        <Field
          label="Travellers"
          icon={<Users className="size-4" aria-hidden="true" />}
          htmlFor="search-travellers"
        >
          <input
            id="search-travellers"
            type="number"
            min={1}
            max={50}
            value={travellers}
            onChange={(event) => setTravellers(Math.max(1, Number(event.target.value) || 1))}
            className="w-full bg-transparent text-[15px] text-foreground outline-none"
          />
        </Field>

        <div className="flex items-center md:pl-2.5">
          <Button type="submit" size="lg" loading={submitting} className="w-full md:w-auto">
            <Search />
            Find a Concierge
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  icon,
  htmlFor,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl px-3.5 py-3 transition-colors focus-within:bg-brand-50/60 hover:bg-secondary/70 md:rounded-lg">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle-foreground"
      >
        <span className="text-brand-600">{icon}</span>
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
