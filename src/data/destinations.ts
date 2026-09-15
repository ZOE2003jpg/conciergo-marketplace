import type { Destination } from "@/types";

import { countConciergesInCity } from "@/data/concierges";

import lagos from "@/assets/destinations/lagos.jpg";
import abuja from "@/assets/destinations/abuja.jpg";
import accra from "@/assets/destinations/accra.jpg";
import nairobi from "@/assets/destinations/nairobi.jpg";
import dubai from "@/assets/destinations/dubai.jpg";
import guangzhou from "@/assets/destinations/guangzhou.jpg";
import london from "@/assets/destinations/london.jpg";
import paris from "@/assets/destinations/paris.jpg";

interface DestinationSeed extends Omit<Destination, "conciergeCount"> {}

const seeds: DestinationSeed[] = [
  {
    id: "lagos-ng",
    city: "Lagos",
    country: "Nigeria",
    image: lagos,
    blurb: "Corporate delegations, airport logistics and city movement.",
  },
  {
    id: "abuja-ng",
    city: "Abuja",
    country: "Nigeria",
    image: abuja,
    blurb: "Business meetings, institutional visits and family assistance.",
  },
  {
    id: "accra-gh",
    city: "Accra",
    country: "Ghana",
    image: accra,
    blurb: "Group arrivals, conference logistics and sourcing trips.",
  },
  {
    id: "nairobi-ke",
    city: "Nairobi",
    country: "Kenya",
    image: nairobi,
    blurb: "Employee travel, field logistics and local coordination.",
  },
  {
    id: "dubai-ae",
    city: "Dubai",
    country: "United Arab Emirates",
    image: dubai,
    blurb: "Executive travel, interpreting and client hosting.",
  },
  {
    id: "guangzhou-cn",
    city: "Guangzhou",
    country: "China",
    image: guangzhou,
    blurb: "Factory visits, supplier vetting and interpreting.",
  },
  {
    id: "london-gb",
    city: "London",
    country: "United Kingdom",
    image: london,
    blurb: "Meetings, medical visits and multi-city itineraries.",
  },
  {
    id: "paris-fr",
    city: "Paris",
    country: "France",
    image: paris,
    blurb: "Interpreting, retail sourcing and event access.",
  },
];

/** Counts come from the listed concierges, not from invented platform totals. */
export const destinations: Destination[] = seeds.map((seed) => ({
  ...seed,
  conciergeCount: countConciergesInCity(seed.city),
}));

export const destinationOptions = destinations.map((d) => `${d.city}, ${d.country}`);
