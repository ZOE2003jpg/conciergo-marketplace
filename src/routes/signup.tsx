import { cloneElement, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const title = "Create your Conciergo account | Traveller or Concierge";
const description =
  "Sign up as a traveller to find trusted, verified local concierges worldwide, or as a concierge to receive travel requests in your city.";
const canonical = "https://conciergo.lovable.app/signup";

type Role = "traveller" | "concierge";

const signupSchema = z
  .object({
    role: z.enum(["traveller", "concierge"]),
    name: z.string().trim().min(2, "Enter your full name").max(80),
    email: z.string().trim().toLowerCase().email("Enter a valid email").max(254),
    city: z.string().trim().max(80).optional(),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(128)
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((v) => v.role !== "concierge" || (v.city?.length ?? 0) > 1, {
    path: ["city"],
    message: "Tell us the city you operate in",
  });

type FieldErrors = Partial<Record<"name" | "email" | "city" | "password" | "confirmPassword", string>>;

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>): { role?: Role } => {
    const role = search["role"];
    return role === "concierge" || role === "traveller" ? { role } : {};
  },
  head: () => ({
    links: [{ rel: "canonical", href: canonical }],
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: canonical,
        }),
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { role: initialRole } = Route.useSearch();
  const [role, setRole] = useState<Role>(initialRole ?? "traveller");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = signupSchema.safeParse({
      role,
      name: form.get("name"),
      email: form.get("email"),
      city: form.get("city") ?? undefined,
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    // Frontend-only: no account is created yet. Never log credentials.
    setErrors({});
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 700);
  }

  return (
    <SiteLayout>
      <div className="container-page flex justify-center py-14 md:py-20">
        <div className="w-full max-w-md">
          <h1 className="text-section-title text-foreground">Create your account</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Tell us how you plan to use Conciergo.
          </p>

          <div
            role="radiogroup"
            aria-label="Account type"
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {(
              [
                { value: "traveller", label: "I'm travelling", hint: "Find help at my destination" },
                { value: "concierge", label: "I'm a concierge", hint: "Receive requests in my city" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={role === option.value}
                onClick={() => setRole(option.value)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  role === option.value
                    ? "border-primary bg-brand-50"
                    : "border-border bg-surface hover:bg-secondary",
                )}
              >
                <span className="block text-[14px] font-semibold text-foreground">
                  {option.label}
                </span>
                <span className="mt-1 block text-[13px] text-subtle-foreground">{option.hint}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="surface-card mt-5 space-y-5 p-6">
            <Field name="name" label="Full name" error={errors.name}>
              <Input name="name" autoComplete="name" placeholder="Your name" maxLength={80} />
            </Field>
            <Field name="email" label="Email" error={errors.email}>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
              />
            </Field>
            {role === "concierge" ? (
              <Field name="city" label="City you operate in" error={errors.city}>
                <Input name="city" placeholder="Lagos, Nigeria" maxLength={80} />
              </Field>
            ) : null}
            <Field
              name="password"
              label="Password"
              error={errors.password}
              hint="At least 8 characters, with upper and lower case letters and a number."
            >
              <Input name="password" type="password" autoComplete="new-password" maxLength={128} />
            </Field>
            <Field name="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
              <Input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                maxLength={128}
              />
            </Field>
            <Button type="submit" size="lg" className="w-full" loading={submitting}>
              {role === "concierge" ? "Apply as a concierge" : "Create account"}
            </Button>
            <p className="text-center text-[13px] text-subtle-foreground">
              Accounts are not connected yet — this is a design preview.
            </p>
          </form>

          <p className="mt-6 text-center text-[14px] text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({
  name,
  label,
  error,
  hint,
  children,
}: {
  name: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  children: React.ReactElement;
}) {
  const id = `signup-${name}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
      } as Record<string, unknown>)}
      {hint ? (
        <p id={`${id}-hint`} className="text-[13px] text-subtle-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
