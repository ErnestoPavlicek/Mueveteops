import Link from "next/link";
import { BookCallButton } from "./BookCallButton";

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

const PRIMARY_CLASS =
  "bg-[var(--accent)] text-[var(--bg)] font-semibold text-base px-8 py-4 rounded-lg hover:opacity-90 transition-opacity text-center";

const SECONDARY_CLASS =
  "border border-[var(--border)] text-[var(--text-primary)] font-medium text-base px-8 py-4 rounded-lg hover:bg-white/[0.04] transition-colors text-center";

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
    <section className="px-5 sm:px-8 lg:px-16 py-20 lg:py-28 border-t border-[var(--divider)]">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
        <div className="flex flex-col gap-4 max-w-[640px]">
          <h2 className="text-display-2 text-[var(--text-primary)]">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
          {primaryAsBookCall ? (
            <BookCallButton text={primaryLabel} className={PRIMARY_CLASS} />
          ) : (
            <Link href={primaryHref} className={PRIMARY_CLASS}>
              {primaryLabel}
            </Link>
          )}
          {secondaryLabel &&
            (secondaryAsBookCall ? (
              <BookCallButton text={secondaryLabel} className={SECONDARY_CLASS} />
            ) : (
              secondaryHref && (
                <Link href={secondaryHref} className={SECONDARY_CLASS}>
                  {secondaryLabel}
                </Link>
              )
            ))}
        </div>
      </div>
    </section>
  );
}
