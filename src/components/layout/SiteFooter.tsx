import { Link } from "@tanstack/react-router";
import { Globe, Instagram, Linkedin, Twitter } from "lucide-react";

import { Logo } from "@/components/brand/Logo";

const columns: { title: string; links: { label: string; to?: string }[] }[] = [
  {
    title: "Conciergo",
    links: [
      { label: "About", to: "/about" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Become a concierge", to: "/become-a-concierge" },
      { label: "Careers" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Destinations", to: "/explore" },
      { label: "Services", to: "/explore" },
      { label: "Concierges", to: "/explore" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/help" },
      { label: "Safety", to: "/help" },
      { label: "Contact", to: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Terms" }, { label: "Privacy" }, { label: "Cancellation policy" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A marketplace for destination-based personal and corporate assistance.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "X" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground"
                  title={`${label} — coming soon`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </span>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[13px] font-semibold text-foreground">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-subtle-foreground" title="Coming soon">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-subtle-foreground">
            © {new Date().getFullYear()} Conciergo. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2 text-[13px] text-subtle-foreground">
            <Globe className="size-4" aria-hidden="true" />
            English (UK) · USD
          </p>
        </div>
      </div>
    </footer>
  );
}
