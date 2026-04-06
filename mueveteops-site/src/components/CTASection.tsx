import { BookCallButton } from "./BookCallButton";
import { Button } from "./ui/Button";

interface CTASectionProps {
  heading: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  primaryAsBookCall?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryAsBookCall?: boolean;
}

export function CTASection({
  heading,
  subtitle,
  primaryLabel,
  primaryHref,
  primaryAsBookCall,
  secondaryLabel,
  secondaryHref,
  secondaryAsBookCall,
}: CTASectionProps) {
  return (
    <section className="relative px-5 sm:px-8 lg:px-16 py-28 lg:py-40 border-t border-[var(--border-strong)] overflow-hidden">
      {/* Backdrop layers */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-60" />
      <div
        aria-hidden
        className="absolute -z-10 glow-teal animate-glow-drift"
        style={{ width: 700, height: 700, left: "-10%", top: "-30%" }}
      />
      <div
        aria-hidden
        className="absolute -z-10 glow-purple animate-glow-drift"
        style={{
          width: 600,
          height: 600,
          right: "-15%",
          bottom: "-30%",
          animationDelay: "-5s",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

      {/* Giant outline ghost word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-6 lg:-bottom-12 text-mega text-outline opacity-30 leading-none whitespace-nowrap text-center select-none"
        style={{ fontSize: "clamp(5rem, 18vw, 18rem)" }}
      >
        MUEVE
      </div>

      <div className="relative flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 max-w-[18ch]">
          <span className="text-eyebrow text-[var(--accent)]">▸ Next Step</span>
          {/* whitespace-pre-line honors author-controlled line breaks in the
              `heading` prop while still allowing natural word wrapping. */}
          <h2 className="text-display-1 text-[var(--text-primary)] whitespace-pre-line">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[52ch]">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
          {primaryAsBookCall ? (
            <BookCallButton variant="primary" size="lg">
              {primaryLabel}
            </BookCallButton>
          ) : (
            <Button variant="primary" size="lg" href={primaryHref}>
              {primaryLabel}
            </Button>
          )}
          {secondaryLabel &&
            (secondaryAsBookCall ? (
              <BookCallButton variant="outline" size="lg">
                {secondaryLabel}
              </BookCallButton>
            ) : (
              secondaryHref && (
                <Button variant="outline" size="lg" href={secondaryHref}>
                  {secondaryLabel}
                </Button>
              )
            ))}
        </div>
      </div>
    </section>
  );
}
