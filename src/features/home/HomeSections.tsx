import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  MessagesSquare,
  ShieldCheck,
  Star,
  Users2,
  UserSearch,
  PlaneTakeoff,
  MapPinned,
  Receipt,
} from "lucide-react";

import { CategoryCard } from "@/components/cards/CategoryCard";
import { ConciergeCard } from "@/components/cards/ConciergeCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Section, SectionHeading } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { featuredConcierges } from "@/data/concierges";
import { destinations } from "@/data/destinations";
import { serviceCategories } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { useFavorites } from "@/hooks/useFavorites";
import corporateImage from "@/assets/corporate-travel.jpg";
import conciergeImage from "@/assets/become-concierge.jpg";

export function PopularDestinations() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Where travellers need help"
        title="Popular destinations"
        description="Concierges working in the cities our clients travel to most."
        action={
          <Button variant="secondary" asChild>
            <Link to="/explore">
              Browse all destinations
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </Section>
  );
}

export function FeaturedConcierges() {
  const { isFavorite, toggle } = useFavorites();

  return (
    <Section muted>
      <SectionHeading
        eyebrow="Featured concierges"
        title="Meet your local expert"
        description="Find trusted people who know the destination and can help make your trip easier."
        action={
          <Button variant="secondary" asChild>
            <Link to="/explore">
              See all concierges
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {featuredConcierges.map((concierge) => (
          <ConciergeCard
            key={concierge.id}
            concierge={concierge}
            isFavorite={isFavorite(concierge.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </div>
    </Section>
  );
}

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    body: "Describe your destination, dates and assistance required.",
    Icon: ClipboardList,
  },
  {
    number: "02",
    title: "Find your concierge",
    body: "Browse trusted local professionals who match your needs.",
    Icon: UserSearch,
  },
  {
    number: "03",
    title: "Chat and agree",
    body: "Discuss your requirements and receive a personalized proposal.",
    Icon: MessagesSquare,
  },
  {
    number: "04",
    title: "Travel with confidence",
    body: "Your concierge handles the agreed services while Conciergo helps protect the transaction.",
    Icon: PlaneTakeoff,
  },
];

export function HowItWorksPreview() {
  return (
    <Section>
      <SectionHeading eyebrow="How it works" title="Four steps from request to trip" />
      <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="bg-surface p-6">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold tracking-widest text-brand-600">
                {step.number}
              </span>
              <step.Icon className="size-5 text-subtle-foreground" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-[15px] font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <Button variant="link" asChild>
          <Link to="/how-it-works">
            See the full process
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

const trustPoints = [
  {
    title: "Local expertise",
    body: "Get help from people who actually know the destination.",
    Icon: MapPinned,
  },
  {
    title: "Direct communication",
    body: "Talk directly with your concierge before committing to anything.",
    Icon: MessagesSquare,
  },
  {
    title: "Transparent proposals",
    body: "Know exactly what services you're paying for, itemised in writing.",
    Icon: Receipt,
  },
  {
    title: "Protected transactions",
    body: "Conciergo is designed to provide protection throughout the transaction.",
    Icon: ShieldCheck,
  },
  {
    title: "Real reviews",
    body: "Learn from people who have actually used the service.",
    Icon: Star,
  },
];

export function WhyConciergo() {
  return (
    <Section muted>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow="Why Conciergo"
          title="Built around trust, not transactions."
          description="Destination assistance only works if you believe the person on the other side will show up. Everything here is designed around that."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {trustPoints.map((point) => (
            <li key={point.title} className="surface-card p-5">
              <point.Icon className="size-5 text-brand-600" aria-hidden="true" />
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function ServiceCategoriesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Services"
        title="What a concierge can handle for you"
        description="Choose a category to see concierges who offer it."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}

export function CorporateSection() {
  return (
    <section className="section-y bg-ink text-background">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-200">
            For organizations
          </p>
          <h2 className="text-section-title mt-4">
            Travel shouldn't become another project to manage.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-background/70">
            Give your team a trusted local contact who can handle the details on the ground —
            arrivals, transport, meetings and the changes nobody planned for.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "One coordinator per trip",
              "Itemised proposals before approval",
              "Support for groups of 2 to 20",
              "Language-matched concierges",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[14px] text-background/85">
                <Users2 className="mt-0.5 size-4 shrink-0 text-brand-200" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/explore" search={{ services: ["business-travel"] }}>
                Explore corporate assistance
              </Link>
            </Button>
          </div>
        </div>
        <img
          src={corporateImage}
          alt="Business travellers walking with a local coordinator in an international city"
          width={1600}
          height={1104}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}

export function BecomeConciergeSection() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <img
          src={conciergeImage}
          alt="A local concierge standing on a city street"
          width={1408}
          height={1200}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
        />
        <div>
          <p className="eyebrow">For concierges</p>
          <h2 className="text-section-title mt-4 text-foreground">
            Turn your local knowledge into a business.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Help travellers experience your city while building a professional concierge business of
            your own.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "Get discovered by travellers",
              "Manage requests in one place",
              "Build your reputation with reviews",
              "Earn from your expertise",
            ].map((item) => (
              <li key={item} className="surface-card px-4 py-3 text-[14px] text-foreground">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/become-a-concierge">Become a concierge</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function TestimonialsSection() {
  return (
    <Section muted>
      <SectionHeading
        eyebrow="Client stories"
        title="What travellers say"
        description="Illustrative examples of how clients use Conciergo."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section>
      <div className="hairline-grid overflow-hidden rounded-2xl border border-border bg-brand-50/70 px-6 py-14 text-center md:px-16 md:py-20">
        <h2 className="text-section-title mx-auto max-w-2xl text-foreground">
          Wherever you're going, have someone local in your corner.
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/explore">Find a Concierge</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/become-a-concierge">Become a Concierge</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
