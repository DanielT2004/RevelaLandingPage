import { Container } from "./ui/Container";
import { Logomark } from "./ui/Logomark";
import { SITE, FOOTER } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark bg-charcoal-900 text-cream">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <Logomark />
              Segma
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cream/55">
              {FOOTER.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-cream/65 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-sm">
            <p className="text-cream/60">{FOOTER.contactLabel}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-cream/80 underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-sm text-cream/60">
          {FOOTER.bottomLine}
        </div>
      </Container>
    </footer>
  );
}
