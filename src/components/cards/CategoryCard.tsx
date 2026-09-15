import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { getIcon } from "@/lib/icon";
import type { ServiceCategory } from "@/types";

export function CategoryCard({ category }: { category: ServiceCategory }) {
  const Icon = getIcon(category.icon);

  return (
    <Link
      to="/explore"
      search={{ services: [category.id] }}
      className="surface-card group flex flex-col p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
    >
      <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-brand-50 text-brand-600">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="mt-4 flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
        {category.name}
        <ArrowUpRight
          className="size-4 text-subtle-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
      <span className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
        {category.description}
      </span>
    </Link>
  );
}
