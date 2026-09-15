import type { ServiceCategory } from "@/types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "airport-transfers",
    name: "Airport & transfers",
    description: "Arrival meet-and-greet, immigration guidance and door-to-door transfers.",
    icon: "PlaneLanding",
  },
  {
    id: "transportation",
    name: "Transportation",
    description: "Vetted drivers and vehicles for daily movement across the city.",
    icon: "CarFront",
  },
  {
    id: "business-travel",
    name: "Business travel",
    description: "Meeting logistics, office visits and delegation coordination.",
    icon: "Briefcase",
  },
  {
    id: "local-assistance",
    name: "Local assistance",
    description: "Someone on the ground for errands, paperwork and the unexpected.",
    icon: "Compass",
  },
  {
    id: "translation",
    name: "Translation",
    description: "Interpretation for meetings, negotiations and everyday situations.",
    icon: "Languages",
  },
  {
    id: "shopping-assistance",
    name: "Shopping assistance",
    description: "Sourcing, market visits, supplier runs and delivery follow-up.",
    icon: "ShoppingBag",
  },
  {
    id: "events-experiences",
    name: "Events & experiences",
    description: "Reservations, tickets and curated evenings that actually happen.",
    icon: "Ticket",
  },
  {
    id: "personal-assistance",
    name: "Personal assistance",
    description: "Family travel, medical visits, relocation support and more.",
    icon: "HeartHandshake",
  },
];

export const serviceById = Object.fromEntries(
  serviceCategories.map((service) => [service.id, service]),
) as Record<ServiceCategory["id"], ServiceCategory>;

export const languageOptions = [
  "English",
  "Mandarin",
  "French",
  "Arabic",
  "Yoruba",
  "Swahili",
  "Portuguese",
  "Hindi",
  "Spanish",
  "Cantonese",
  "Igbo",
  "Hausa",
  "Twi",
];
