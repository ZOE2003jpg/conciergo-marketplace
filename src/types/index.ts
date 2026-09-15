export type ServiceId =
  | "airport-transfers"
  | "transportation"
  | "business-travel"
  | "local-assistance"
  | "translation"
  | "shopping-assistance"
  | "events-experiences"
  | "personal-assistance";

export interface ServiceCategory {
  id: ServiceId;
  name: string;
  description: string;
  /** lucide-react icon name */
  icon: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  conciergeCount: number;
  image: string;
  blurb: string;
}

export interface ConciergeService {
  id: ServiceId;
  name: string;
  description: string;
  fromPrice: number;
}

export interface Review {
  id: string;
  author: string;
  authorRole: string;
  rating: number;
  date: string;
  tripContext: string;
  body: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
}

export interface Concierge {
  id: string;
  name: string;
  headline: string;
  city: string;
  country: string;
  avatar: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  tripsCompleted: number;
  responseTime: string;
  languages: string[];
  serviceIds: ServiceId[];
  services: ConciergeService[];
  fromPrice: number;
  currency: string;
  about: string;
  experience: ExperienceEntry[];
  availability: { label: string; status: "open" | "limited" | "booked" }[];
  reviews: Review[];
  corporateReady: boolean;
  availableNow: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  context: string;
  rating: number;
}

export interface SearchQuery {
  destination: string;
  service: string;
  dates: string;
  travellers: number;
}
