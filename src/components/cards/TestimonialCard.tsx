import { StarRow } from "@/components/common/Rating";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="surface-card flex h-full flex-col p-6">
      <StarRow value={testimonial.rating} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <span className="block text-sm font-semibold text-foreground">{testimonial.name}</span>
        <span className="mt-0.5 block text-[13px] text-muted-foreground">{testimonial.role}</span>
        <span className="mt-1 block text-[12px] text-subtle-foreground">
          {testimonial.context}
        </span>
      </figcaption>
    </figure>
  );
}
