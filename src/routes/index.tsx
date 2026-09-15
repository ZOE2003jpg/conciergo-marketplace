import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/features/home/HeroSection";
import {
  BecomeConciergeSection,
  CorporateSection,
  FeaturedConcierges,
  FinalCta,
  HowItWorksPreview,
  PopularDestinations,
  ServiceCategoriesSection,
  TestimonialsSection,
  WhyConciergo,
} from "@/features/home/HomeSections";

const title = "Conciergo — Find a trusted local concierge wherever you go";
const description =
  "Connect with trusted local concierges for airport pickup, transportation, business travel, translation and local assistance at your destination.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <PopularDestinations />
      <FeaturedConcierges />
      <HowItWorksPreview />
      <ServiceCategoriesSection />
      <CorporateSection />
      <WhyConciergo />
      <BecomeConciergeSection />
      <TestimonialsSection />
      <FinalCta />
    </SiteLayout>
  );
}
