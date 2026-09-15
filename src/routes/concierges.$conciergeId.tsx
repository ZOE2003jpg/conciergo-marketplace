import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarCheck, Heart, MapPin, MessagesSquare, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Rating, StarRow } from "@/components/common/Rating";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getConciergeById } from "@/data/concierges";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCount, formatPrice, joinWithDot } from "@/lib/format";

export const Route = createFileRoute("/concierges/$conciergeId")({
  loader: ({ params }) => {
    const concierge = getConciergeById(params.conciergeId);
    if (!concierge) throw notFound();
    return { concierge };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Concierge not found — Conciergo" }, { name: "robots", content: "noindex" }],
      };
    }
    const { concierge } = loaderData;
    const title = `${concierge.name} — concierge in ${concierge.city} | Conciergo`;
    const description = `${concierge.headline} Speaks ${joinWithDot(concierge.languages)}. Start a conversation before you commit.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ConciergeProfilePage,
});

function ConversationPanel({ name, price, currency }: { name: string; price: number; currency: string }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <div className="surface-card p-6">
      <p className="text-[13px] text-muted-foreground">Services start from</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">
        {formatPrice(price, currency)}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-subtle-foreground">
        Final pricing is agreed in a written proposal after you describe your trip.
      </p>

      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSending(true);
          window.setTimeout(() => {
            setSending(false);
            setMessage("");
            toast.success("Message drafted", {
              description: `Messaging isn't connected yet, so this request to ${name} was not sent.`,
            });
          }, 600);
        }}
      >
        <Label htmlFor="conversation-message">Tell {name.split(" ")[0]} what you need</Label>
        <Textarea
          id="conversation-message"
          rows={4}
          placeholder="Arriving 12 March for three days of meetings, need airport pickup and transport."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button type="submit" className="w-full" loading={sending} disabled={message.trim() === ""}>
          <MessagesSquare />
          Start a conversation
        </Button>
      </form>

      <ul className="mt-6 space-y-2.5 border-t border-border pt-5 text-[13px] text-muted-foreground">
        <li className="flex items-start gap-2">
          <MessagesSquare className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
          No commitment until you accept a proposal
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
          Payment is handled through Conciergo, not in cash
        </li>
      </ul>
    </div>
  );
}

function ConciergeProfilePage() {
  const { concierge } = Route.useLoaderData();
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(concierge.id);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-8 md:py-12">
          <Button variant="link" size="sm" asChild className="px-0">
            <Link to="/explore">← Back to explore</Link>
          </Button>

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
            <img
              src={concierge.avatar}
              alt={`${concierge.name}, concierge in ${concierge.city}`}
              width={640}
              height={640}
              className="size-24 rounded-2xl object-cover md:size-28"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[24px] font-semibold tracking-tight text-foreground md:text-[28px]">
                  {concierge.name}
                </h1>
                {concierge.verified ? <VerifiedBadge withLabel /> : null}
              </div>
              <p className="mt-2 text-[15px] text-muted-foreground">{concierge.headline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden="true" />
                  {concierge.city}, {concierge.country}
                </span>
                <Rating value={concierge.rating} reviewCount={concierge.reviewCount} />
                <span>{formatCount(concierge.tripsCompleted)} trips completed</span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => toggle(concierge.id)}
              aria-pressed={saved}
              className="self-start"
            >
              <Heart className={saved ? "fill-brand-500 text-brand-500" : ""} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div className="space-y-12">
            <section>
              <h2 className="text-[18px] font-semibold text-foreground">About</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {concierge.about}
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-foreground">Services offered</h2>
              <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
                {concierge.services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between gap-4 bg-surface px-5 py-4"
                  >
                    <span className="text-[14px] font-medium text-foreground">{service.name}</span>
                    <span className="text-[14px] text-muted-foreground">
                      From {formatPrice(service.fromPrice, concierge.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-foreground">Languages</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {concierge.languages.map((language) => (
                  <li
                    key={language}
                    className="rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-[13px] text-muted-foreground"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-foreground">Experience</h2>
              <ol className="mt-4 space-y-5 border-l border-border pl-5">
                {concierge.experience.map((entry) => (
                  <li key={`${entry.role}-${entry.period}`} className="relative">
                    <span
                      className="absolute -left-[1.4rem] top-1.5 size-2 rounded-full bg-brand-500"
                      aria-hidden="true"
                    />
                    <h3 className="text-[15px] font-semibold text-foreground">{entry.role}</h3>
                    <p className="text-[13px] text-subtle-foreground">
                      {entry.organization} · {entry.period}
                    </p>
                    <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-foreground">Availability</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {concierge.availability.map((slot) => (
                  <li
                    key={slot.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                  >
                    <span className="inline-flex items-center gap-2 text-[14px] text-foreground">
                      <CalendarCheck className="size-4 text-subtle-foreground" aria-hidden="true" />
                      {slot.label}
                    </span>
                    <span
                      className={
                        slot.status === "open"
                          ? "text-[13px] font-medium text-brand-700"
                          : "text-[13px] text-subtle-foreground"
                      }
                    >
                      {slot.status === "open"
                        ? "Available"
                        : slot.status === "limited"
                          ? "Limited"
                          : "Fully booked"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-foreground">
                Reviews ({concierge.reviewCount})
              </h2>
              <div className="mt-4 space-y-4">
                {concierge.reviews.map((review) => (
                  <article key={`${review.author}-${review.date}`} className="surface-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[14px] font-semibold text-foreground">{review.author}</p>
                        <p className="text-[13px] text-subtle-foreground">{review.authorRole}</p>
                      </div>
                      <StarRow value={review.rating} />
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                      {review.body}
                    </p>
                    <p className="mt-3 text-[12px] text-subtle-foreground">
                      {review.tripContext} · {review.date}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <ConversationPanel
              name={concierge.name}
              price={concierge.fromPrice}
              currency={concierge.currency}
            />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
