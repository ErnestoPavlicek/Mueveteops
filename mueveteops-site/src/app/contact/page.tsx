import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { BookCallButton } from "@/components/BookCallButton";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      <div className="h-px w-full bg-[var(--divider)]" />

      {/* Hero */}
      <section className="flex flex-col items-center px-5 sm:px-8 lg:px-16 pt-16 lg:pt-[100px] pb-14 lg:pb-20 gap-5">
        <span className="text-eyebrow text-[var(--text-secondary)]">
          06 — Contact
        </span>
        <h1 className="text-display-1 text-[var(--text-primary)] text-center break-words">
          Let&apos;s Talk
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] text-center max-w-[60ch]">
          Ready to explore what AI can do for your business? Book a meeting or
          drop us a message.
        </p>
      </section>

      <div className="h-px w-full bg-[var(--divider)]" />

      {/* Contact Split */}
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-[60px] px-5 sm:px-8 lg:px-16 py-14 lg:py-20">
        {/* Form */}
        <div className="flex-1 min-w-0">
          <ContactForm />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-10">
          <div className="relative aspect-[4/3] lg:h-[340px] lg:aspect-auto rounded-xl border border-[var(--border)] overflow-hidden">
            <Image
              src="/images/contact-workspace.webp"
              alt="MueveOps workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-7">
            <h3 className="text-heading text-[var(--text-primary)]">
              Get in touch directly
            </h3>
            <div className="flex items-center gap-3 min-w-0">
              <svg
                className="w-[18px] h-[18px] text-[var(--accent)] flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <a
                href="mailto:ernst@mueveops.com"
                className="text-body font-medium text-[var(--text-primary)] truncate hover:text-[var(--accent)] transition-colors"
              >
                ernst@mueveops.com
              </a>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <svg
                className="w-[18px] h-[18px] text-[var(--accent)] flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-body text-[var(--text-secondary)]">
                Sweden (serving clients globally)
              </span>
            </div>

            <div className="h-px bg-[var(--divider)]" />

            <div className="flex flex-col gap-4 items-start">
              <BookCallButton
                variant="outline-accent"
                size="md"
                className="inline-flex items-center gap-2.5"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Schedule a Meeting
              </BookCallButton>
            </div>

          </div>
        </div>
      </section>

      <div className="h-px w-full bg-[var(--divider)]" />

      <Footer />
    </div>
  );
}
