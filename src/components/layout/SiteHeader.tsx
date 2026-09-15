import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/explore", label: "Explore" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/become-a-concierge", label: "Become a concierge" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="secondary" size="icon" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm p-0 [&>button]:hidden">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <SheetTitle asChild>
                  <span>
                    <Logo />
                  </span>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </Button>
              </div>
              <nav aria-label="Mobile" className="flex-1 px-3 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
                <span className="my-3 block h-px bg-border" />
                {[
                  { to: "/about", label: "About" },
                  { to: "/help", label: "Help center" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[15px] text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="space-y-2 border-t border-border p-5">
                <Button className="w-full" size="lg" asChild onClick={() => setOpen(false)}>
                  <Link to="/signup">Sign up</Link>
                </Button>
                <Button
                  className="w-full"
                  size="lg"
                  variant="secondary"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
