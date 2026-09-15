import { Link } from "@tanstack/react-router";
import { BadgeCheck, Globe2, MessagesSquare } from "lucide-react";

import { SearchPanel } from "@/components/search/SearchPanel";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-arrival.jpg";

const assurances = [
  { Icon: Globe2, label: "Concierges in 40+ cities" },
  { Icon: MessagesSquare, label: "Talk before you commit" },
  { Icon: BadgeCheck, label: "Profiles reviewed before listing" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-transparent"
        aria-hidden="true"
      />
      <div className="container-page relative pt-12 pb-10 md:pt-20 md:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="fade-up">
            <p className="eyebrow">Destination assistance marketplace</p>
            <h1 className="text-display mt-4 text-foreground">
              Find a trusted local concierge wherever you go.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
              From airport pickup to business travel, transportation and local assistance, connect
              with someone who can handle the details at your destination.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/explore">Find a Concierge</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/become-a-concierge">Become a Concierge</Link>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {assurances.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[13px] text-muted-foreground"
                >
                  <Icon className="size-4 text-brand-600" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="A local concierge greeting an arriving business traveller at the airport"
              width={1408}
              height={1600}
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover shadow-panel sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <div className="absolute -bottom-4 left-4 hidden max-w-[15rem] rounded-xl border border-border bg-surface p-4 shadow-lift sm:block">
              <p className="text-[13px] font-medium text-foreground">
                “Seven arrivals, two flights, one local contact.”
              </p>
              <p className="mt-1.5 text-[12px] text-subtle-foreground">
                Corporate trip · Shenzhen → Lagos
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10 md:mt-14">
          <SearchPanel />
          <p className="mt-3 text-[12px] text-subtle-foreground">
            Popular searches: airport pickup in Lagos · Mandarin support in Dubai · field travel in
            Nairobi
          </p>
        </div>
      </div>
    </section>
  );
}
