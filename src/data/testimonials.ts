import type { Testimonial } from "@/types";

/** Frontend mock data only — not real customer statements. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "We had seven people arriving in Lagos for a business trip, and having one local person coordinate everything saved us a huge amount of time.",
    name: "Wei Zhang",
    role: "Operations Manager",
    context: "10-day corporate trip · Shenzhen → Lagos",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Our concierge met my mother at arrivals, handled the hospital appointment paperwork and sent me updates all day. I was three time zones away and still calm.",
    name: "Amara Obi",
    role: "Family traveller",
    context: "Medical visit · London",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "The proposal listed every service and price before we committed. No surprises at the end of the week, which is rare for a sourcing trip.",
    name: "Fatima Al-Rashid",
    role: "Procurement Lead",
    context: "Supplier visits · Guangzhou",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "I hired a Mandarin-speaking concierge in Dubai for two days of meetings. She rewrote our schedule when traffic changed and nothing slipped.",
    name: "Daniel Mercier",
    role: "Regional Director",
    context: "Business travel · Dubai",
    rating: 4.8,
  },
];
