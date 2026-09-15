import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, HandHeart, MapPinned, ShieldCheck } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/Section";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";

const title = "About Conciergo — trusted local help wherever you travel";
const description =
  "Conciergo exists to make travelling easier by connecting travellers and organizations with trusted local concierges at their destination.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Human connection",
    body: "Travel problems are solved by people, not by dashboards. Every trip on Conciergo starts with a conversation.",
    Icon: HandHeart,
  },
  {
    title: "Local expertise",
    body: "The person who knows which road is closed and which office opens late is worth more than any itinerary.",
    Icon: MapPinned,
  },
  {
    title: "Trust",
    body: "Profiles, proposals and reviews are structured so you can judge someone before you rely on them.",
    Icon: ShieldCheck,
  },
  {
    title: "Global access",
    body: "Whether you are arriving alone or with a delegation of twenty, the same support should be available.",
    Icon: Globe2,
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">About</p>
          <h1 className="text-display mt-4 max-w-3xl text-foreground">
            Conciergo exists to make travelling easier.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            We connect travellers and organizations with trusted local help at their destination —
            someone who can meet an arrival, arrange transport, translate a meeting or simply handle
            the details that are difficult from another country.
          </p>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="What we care about" title="Four things we build around" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <article key={value.title} className="surface-card p-6">
              <value.Icon className="size-5 text-brand-600" aria-hidden="true" />
              <h2 className="mt-4 text-[16px] font-semibold text-foreground">{value.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title text-foreground">
            A marketplace for destination assistance.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Conciergo is not a hotel booking site or a tour listing. It is a place to find a
            professional who works where you are going, agree what they will do, and pay for it
            through one protected process.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/explore">Find a Concierge</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
