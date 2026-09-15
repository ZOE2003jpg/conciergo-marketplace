export type ServiceId =
  | "airport-transfers"
  | "transportation"
  | "business-travel"
  | "local-assistance"
  | "translation"
  | "shopping-assistance"
  | "events-experiences"
  | "personal-assistance";

/** A concierge account is either one person or a registered company. */
export type ConciergeType = "individual" | "company";

/**
 * Pricing is negotiated per request. Cards and profiles surface the wording,
 * never a fixed headline price.
 */
export type PricingModel = "custom-pricing" | "quote-on-request";

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
  /** Concierges listed in this destination in the current dataset. */
  conciergeCount: number;
  image: string;
  blurb: string;
}

export interface ConciergeService {
  id: ServiceId;
  name: string;
  description: string;
  /**
   * Only set when a concierge genuinely publishes a fixed price for an
   * optional add-on. Everything else is quoted in a proposal.
   */
  fixedPrice?: number;
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

export interface AvailabilitySlot {
  label: string;
  status: "open" | "limited" | "booked";
}

export interface Concierge {
  id: string;
  type: ConciergeType;
  /** Company name for companies, person's name for individuals. */
  name: string;
  /** Companies only: the person clients usually deal with. */
  contactName?: string;
  /** Companies only: number of concierges on the team. */
  teamSize?: number;
  headline: string;
  city: string;
  country: string;
  /** Cities and areas the concierge covers, including the home city. */
  coverage: string[];
  avatar: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  /** Bookings completed through Conciergo in this sample dataset. */
  tripsCompleted: number;
  yearsExperience: number;
  /** Days since the concierge was last active on Conciergo (sample data). */
  lastActiveDaysAgo: number;
  responseTime: string;
  languages: string[];
  serviceIds: ServiceId[];
  services: ConciergeService[];
  pricingModel: PricingModel;
  currency: string;
  /** Largest group this concierge is set up to handle. */
  groupCapacity: number;
  about: string;
  experience: ExperienceEntry[];
  availability: AvailabilitySlot[];
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
