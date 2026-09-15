import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, MessagesSquare } from "lucide-react";
import { useState } from "react";

import { Section, SectionHeading } from "@/components/common/Section";
import { EmptyState } from "@/components/common/states";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Help centre — Conciergo";
const description =
  "Answers about finding a concierge, proposals, payments, cancellations and safety on Conciergo.";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HelpPage,
});

const topics = [
  {
    group: "Getting started",
    items: [
      {
        question: "How do I find the right concierge?",
        answer:
          "Search your destination on Explore, then filter by the services you need, languages spoken, rating and starting price. Read profiles and reviews before you contact anyone.",
      },
      {
        question: "Do I need an account to browse?",
        answer:
          "No. You can browse concierges freely. An account is only needed to start conversations and manage requests.",
      },
    ],
  },
  {
    group: "Proposals and payments",
    items: [
      {
        question: "Why is there no instant booking?",
        answer:
          "Destination assistance is negotiated. You describe your trip, the concierge proposes exactly what they will do, and you agree on the details before paying.",
      },
      {
        question: "How is payment handled?",
        answer:
          "Payments for accepted proposals go through Conciergo. Funds are released to the concierge after you confirm the services were delivered.",
      },
      {
        question: "Can a proposal change after I accept it?",
        answer:
          "Yes. If plans shift, you and your concierge can revise the proposal so the record still matches what actually happened.",
      },
    ],
  },
  {
    group: "Trust and safety",
    items: [
      {
        question: "What does the verified badge mean?",
        answer:
          "It indicates a concierge has completed Conciergo's profile review, including identity and professional details.",
      },
      {
        question: "What if something goes wrong on a trip?",
        answer:
          "Keep communication inside Conciergo so there is a record, and contact support before confirming completion.",
      },
    ],
  },
];

function HelpPage() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const filtered = topics
    .map((topic) => ({
      ...topic,
      items: topic.items.filter(
        (item) =>
          term === "" ||
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term),
      ),
    }))
    .filter((topic) => topic.items.length > 0);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-14 md:py-18">
          <p className="eyebrow">Help centre</p>
          <h1 className="text-display mt-4 text-foreground">How can we help?</h1>
          <div className="mt-7 max-w-xl">
            <Label htmlFor="help-search" className="sr-only">
              Search help articles
            </Label>
            <Input
              id="help-search"
              type="search"
              placeholder="Search help articles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <Section>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="size-5" aria-hidden="true" />}
            title="No articles matched your search"
            description="Try a different word, or contact support with your question."
            action={
              <Button variant="secondary" onClick={() => setQuery("")}>
                Clear search
              </Button>
            }
          />
        ) : (
          <div className="space-y-10">
            {filtered.map((topic) => (
              <div key={topic.group}>
                <h2 className="text-[16px] font-semibold text-foreground">{topic.group}</h2>
                <Accordion type="single" collapsible className="mt-3">
                  {topic.items.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger className="text-left text-[15px]">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section muted>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="surface-card p-6">
            <MessagesSquare className="size-5 text-brand-600" aria-hidden="true" />
            <h2 className="mt-4 text-[16px] font-semibold text-foreground">
              Still have a question?
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Support contact is not connected in this preview. In the live product you would reach
              our team from here.
            </p>
          </article>
          <article className="surface-card p-6">
            <LifeBuoy className="size-5 text-brand-600" aria-hidden="true" />
            <h2 className="mt-4 text-[16px] font-semibold text-foreground">New to Conciergo?</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Read the full process from search to review, for both travellers and concierges.
            </p>
            <Button variant="link" className="mt-3 px-0" asChild>
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </article>
        </div>
      </Section>
    </SiteLayout>
  );
}
