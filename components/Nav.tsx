"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { Container } from "./ui/Container";
import { Logomark } from "./ui/Logomark";
import { buttonClasses } from "./ui/Button";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="top"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-charcoal/8 bg-cream/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal"
        >
          <Logomark />
          Revela
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/65 transition-colors hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#waitlist" className={buttonClasses("primary", "md")}>
          <span className="sm:hidden">Join waitlist</span>
          <span className="hidden sm:inline">Join the waitlist</span>
        </a>
      </Container>
    </header>
  );
}
