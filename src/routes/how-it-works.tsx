import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/common/Section";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const title = "How Conciergo works — from request to completed trip";
const description =
  "Search, compare, chat, agree, pay, travel, confirm and review. See how travellers and concierges work together on Conciergo.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HowItWorksPage,
});

const travellerJourney = [
  {
    step: "Search",
    body: "Enter your destination, dates and what you need help with. Results show concierges who work in that city.",
  },
  {
    step: "Compare",
    body: "Review profiles side by side: services, languages, ratings, trips completed and starting prices.",
  },
  {
    step: "Chat",
    body: "Start a conversation and explain your request. Nothing is committed at this point.",
  },
  {
    step: "Agree",
    body: "Your concierge sends a proposal listing each service and its price. You accept or ask for changes.",
  },
  {
    step: "Pay",
    body: "Payment for an accepted proposal is made through Conciergo rather than directly to the concierge.",
  },
  {
    step: "Travel",
    body: "Your concierge delivers the agreed services and keeps you updated throughout the trip.",
  },
  {
    step: "Confirm",
    body: "Once the trip is complete you confirm delivery, and the concierge is paid out.",
  },
  {
    step: "Review",
    body: "Leave a review so the next traveller can judge from real experience.",
  },
];

const conciergeJourney = [
  {
    step: "Create your profile",
    body: "Describe your city, services, languages and professional background.",
  },
  {
    step: "Submit your details",
    body: "Provide identity and professional details for review before your profile is listed.",
  },
  {
    step: "Receive requests",
    body: "Travellers contact you with their destination needs, dates and group size.",
  },
  {
    step: "Send a proposal",
    body: "Itemise the services you will deliver and what each one costs.",
  },
  {
    step: "Deliver the trip",
    body: "Handle the agreed services and keep the client informed as things change.",
  },
  {
    step: "Get paid",
    body: "After the client confirms completion, your payout is released.",
  },
  {
    step: "Build reputation",
    body: "Completed trips and reviews improve how you appear in search results.",
  },
];

function Journey({ items }: { items: { step: string; body: string }[] }) {
  return (
    <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-border bg-border">
      {items.map((item, index) => (
        <li key={item.step} className="bg-surface p-5 sm:flex sm:gap-6 sm:p-6">
          <span className="text-[13px] font-semibold tracking-widest text-brand-600 sm:w-14">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="mt-2 sm:mt-0">
            <h3 className="text-[15px] font-semibold text-foreground">{item.step}</h3>
            <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function HowItWorksPage() {
  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">How it works</p>
          <h1 className="text-display mt-4 max-w-3xl text-foreground">
            A negotiated service, not a checkout button.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Every trip is different, so Conciergo is built around conversation first: you explain
            what you need, your concierge proposes exactly what they will do, and payment follows an
            agreement you have both seen.
          </p>
        </div>
      </div>

      <Section>
        <Tabs defaultValue="traveller">
          <TabsList>
            <TabsTrigger value="traveller">For travellers</TabsTrigger>
            <TabsTrigger value="concierge">For concierges</TabsTrigger>
          </TabsList>
          <TabsContent value="traveller">
            <SectionHeading
              title="The traveller journey"
              description="From first search to the review that helps the next client."
              className="mt-8"
            />
            <Journey items={travellerJourney} />
          </TabsContent>
          <TabsContent value="concierge">
            <SectionHeading
              title="The concierge journey"
              description="How local professionals receive work and get paid."
              className="mt-8"
            />
            <Journey items={conciergeJourney} />
          </TabsContent>
        </Tabs>
      </Section>

      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <SectionHeading
            title="Ready to see who's available?"
            description="Browse concierges by destination and service."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/explore">Find a Concierge</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/become-a-concierge">Become a Concierge</Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
