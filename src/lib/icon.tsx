import {
  Briefcase,
  CarFront,
  Compass,
  HeartHandshake,
  Languages,
  PlaneLanding,
  ShoppingBag,
  Ticket,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  PlaneLanding,
  CarFront,
  Briefcase,
  Compass,
  Languages,
  ShoppingBag,
  Ticket,
  HeartHandshake,
};

export function getIcon(name: string): LucideIcon {
  return registry[name] ?? Compass;
}
