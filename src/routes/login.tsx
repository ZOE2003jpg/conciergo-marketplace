import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Log in — Conciergo";
const description =
  "Log in to Conciergo to manage your trips, requests and conversations with local concierges.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Frontend-only: no authentication is wired up yet.
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 700);
  }

  return (
    <SiteLayout>
      <div className="container-page flex justify-center py-14 md:py-20">
        <div className="w-full max-w-md">
          <h1 className="text-section-title text-foreground">Welcome back</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Log in to continue your trip planning.
          </p>

          <form onSubmit={handleSubmit} className="surface-card mt-7 space-y-5 p-6">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <Link to="/help" className="text-[13px] text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="login-password" type="password" autoComplete="current-password" required />
            </div>
            <Button type="submit" size="lg" className="w-full" loading={submitting}>
              Log in
            </Button>
            <p className="text-center text-[13px] text-subtle-foreground">
              Sign-in is not connected yet — this is a design preview.
            </p>
          </form>

          <p className="mt-6 text-center text-[14px] text-muted-foreground">
            New to Conciergo?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
