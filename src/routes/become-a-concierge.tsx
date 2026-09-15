import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarRange, Coins, Users2 } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/Section";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import conciergeImage from "@/assets/become-concierge.jpg";

const title = "Become a concierge — earn from your local expertise | Conciergo";
const description =
  "List your concierge services on Conciergo, receive requests from travellers and organizations, send proposals and build your reputation.";

export const Route = createFileRoute("/become-a-concierge")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BecomeConciergePage,
});

const benefits = [
  {
    title: "Get discovered",
    body: "Appear in searches for your city and the services you actually offer.",
    Icon: Users2,
  },
  {
    title: "Work on your terms",
    body: "Set your own availability and decide which requests you take.",
    Icon: CalendarRange,
  },
  {
    title: "Earn from expertise",
    body: "Price each service yourself and propose what the work is worth.",
    Icon: Coins,
  },
  {
    title: "Build reputation",
    body: "Completed trips and honest reviews strengthen your profile over time.",
    Icon: BadgeCheck,
  },
];

const requirements = [
  "Live and work in the destination you list",
  "Professional experience relevant to the services you offer",
  "Verifiable identity and contact details",
  "Reliable communication in at least one language a client speaks",
  "Willingness to work to a written, itemised proposal",
];

const faqs = [
  {
    question: "How much does it cost to join?",
    answer:
      "Creating a profile is free. Conciergo takes a service fee on completed trips rather than charging upfront.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Clients pay through Conciergo when they accept your proposal. Your payout is released after the client confirms the trip is complete.",
  },
  {
    question: "Do I have to accept every request?",
    answer:
      "No. You choose which requests to respond to, and you can decline anything outside your services or availability.",
  },
  {
    question: "What happens if a trip changes?",
    answer:
      "Plans change constantly in travel. You and the client can revise the proposal before the trip is confirmed as complete.",
  },
];

function BecomeConciergePage() {
  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">For concierges</p>
            <h1 className="text-display mt-4 text-foreground">
              Turn local knowledge into a concierge business.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Travellers and organizations arriving in your city need someone reliable on the
              ground. If that is already what you do well, Conciergo helps them find you.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/signup" search={{ role: "concierge" }}>
                  Apply as a concierge
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/how-it-works">See how it works</Link>
              </Button>
            </div>
          </div>
          <img
            src={conciergeImage}
            alt="A local concierge standing on a city street"
            width={1408}
            height={1200}
            className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
          />
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="Why join" title="What you get from Conciergo" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="surface-card p-5">
              <benefit.Icon className="size-5 text-brand-600" aria-hidden="true" />
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {benefit.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Requirements"
              title="What we look for"
              description="Clients rely on concierges in unfamiliar places, so listings are reviewed before they go live."
            />
            <ul className="mt-7 space-y-3">
              {requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-foreground"
                >
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Questions" title="Common questions" />
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left text-[15px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-border bg-brand-50/70 px-6 py-14 text-center md:px-16">
          <h2 className="text-section-title mx-auto max-w-xl text-foreground">
            Ready to list your services?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Create your profile, describe what you do, and start receiving requests from travellers
            arriving in your city.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/signup" search={{ role: "concierge" }}>
                Apply as a concierge
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
