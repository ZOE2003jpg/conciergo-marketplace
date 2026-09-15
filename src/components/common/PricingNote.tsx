import { ClipboardList, MessagesSquare, Receipt, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PricingModel } from "@/types";

export const PRICING_EXPLANATION =
  "Every request is different. Your concierge will provide a custom proposal based on your requirements.";

export function pricingLabel(model: PricingModel) {
  return model === "custom-pricing" ? "Custom pricing" : "Quote based on request";
}

const steps = [
  { Icon: MessagesSquare, title: "You explain what you need", body: "Share your dates, group size and requirements." },
  { Icon: ClipboardList, title: "You agree the details", body: "Your concierge asks questions and confirms what is possible." },
  { Icon: Receipt, title: "You receive a proposal", body: "Each service is listed with its own price, in writing." },
  { Icon: ShieldCheck, title: "You accept and pay", body: "Nothing is owed until you accept the proposal." },
];

/**
 * Explains the negotiated pricing model wherever price would normally appear.
 */
export function PricingExplainer({ className }: { className?: string }) {
  return (
    <section className={cn("surface-card p-6", className)} aria-labelledby="pricing-explainer-title">
      <h2 id="pricing-explainer-title" className="text-[18px] font-semibold text-foreground">
        How pricing works
      </h2>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
        {PRICING_EXPLANATION}
      </p>
      <ol className="mt-6 grid gap-5 sm:grid-cols-2">
        {steps.map(({ Icon, title, body }, index) => (
          <li key={title} className="flex gap-3">
            <span
              className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
              aria-hidden="true"
            >
              <Icon className="size-4" />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-foreground">
                <span className="text-subtle-foreground">{index + 1}. </span>
                {title}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
