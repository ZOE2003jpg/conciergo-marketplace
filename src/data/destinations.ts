import type { Destination } from "@/types";

import lagos from "@/assets/destinations/lagos.jpg";
import dubai from "@/assets/destinations/dubai.jpg";
import london from "@/assets/destinations/london.jpg";
import paris from "@/assets/destinations/paris.jpg";
import guangzhou from "@/assets/destinations/guangzhou.jpg";
import nairobi from "@/assets/destinations/nairobi.jpg";

export const destinations: Destination[] = [
  {
    id: "lagos-ng",
    city: "Lagos",
    country: "Nigeria",
    conciergeCount: 128,
    image: lagos,
    blurb: "Corporate delegations, airport logistics and city movement.",
  },
  {
    id: "dubai-ae",
    city: "Dubai",
    country: "United Arab Emirates",
    conciergeCount: 214,
    image: dubai,
    blurb: "Business travel, sourcing trips and family assistance.",
  },
  {
    id: "london-gb",
    city: "London",
    country: "United Kingdom",
    conciergeCount: 187,
    image: london,
    blurb: "Meetings, medical visits and multi-city itineraries.",
  },
  {
    id: "paris-fr",
    city: "Paris",
    country: "France",
    conciergeCount: 143,
    image: paris,
    blurb: "Translation, retail sourcing and event access.",
  },
  {
    id: "guangzhou-cn",
    city: "Guangzhou",
    country: "China",
    conciergeCount: 96,
    image: guangzhou,
    blurb: "Factory visits, supplier vetting and interpretation.",
  },
  {
    id: "nairobi-ke",
    city: "Nairobi",
    country: "Kenya",
    conciergeCount: 74,
    image: nairobi,
    blurb: "NGO travel, upcountry transport and local coordination.",
  },
];

export const destinationOptions = destinations.map((d) => `${d.city}, ${d.country}`);
