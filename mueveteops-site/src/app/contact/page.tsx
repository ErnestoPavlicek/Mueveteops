import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { BookCallButton } from "@/components/BookCallButton";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="relative px-5 sm:px-8 lg:px-16 pt-20 lg:pt-32 pb-20 lg:pb-28 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-60" />
        <div
          aria-hidden
          className="absolute -z-10 glow-teal animate-glow-drift"
          style={{ width: 700, height: 700, left: "-10%", top: "-20%" }}
        />
        <div
          aria-hidden
          className="absolute -z-10 glow-magenta"
          style={{ width: 500, height: 500, right: "-10%", bottom: "-20%", opacity: 0.45 }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

        <div className="flex flex-col items-center text-center gap-8">
          <SectionLabel>06 / Contact</SectionLabel>
          <h1 className="text-mega text-[var(--text-primary)] max-w-[14ch]">
            Let&apos;s
            <br />
            <span className="text-gradient">talk.</span>
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[58ch]">
            Ready to explore what AI can do for your business? Book a free
            call or send us a message — we read every one.
          </p>
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* Contact Split */}
      <section className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 px-5 sm:px-8 lg:px-16 py-24 lg:py-36 overflow-hidden">
        <div
          aria-hidden
          className="absolute -z-10 glow-purple"
          style={{ width: 600, height: 600, right: "-15%", top: "20%", opacity: 0.3 }}
        />

        {/* Form */}
        <Reveal className="flex-1 min-w-0">
          <div className="flex flex-col gap-8">
            <SectionLabel>Send a Message</SectionLabel>
            <ContactForm />
          </div>
        </Reveal>

        {/* Info */}
        <Reveal delay={120} className="flex-1 min-w-0 flex flex-col gap-10">
          <div className="relative aspect-[4/3] lg:h-[360px] lg:aspect-auto rounded-2xl border border-[var(--border-strong)] overflow-hidden accent-shadow">
            <Image
              src="/images/contact-workspace.webp"
              alt="MueveOps workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-eyebrow tabular bg-[var(--bg)]/70 backdrop-blur-md border border-[var(--border-strong)] text-[var(--accent)]"
            >
              ◉ STUDIO · STOCKHOLM
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-display-2 text-[var(--text-primary)]">
              Or reach us
              <br />
              <span className="text-gradient">directly.</span>
            </h3>

            <div className="flex flex-col gap-5">
              <a
                href="mailto:ernst@mueveops.com"
                className="group flex items-center gap-4 min-w-0 border-l-2 border-[var(--accent)] pl-5 py-2 hover:bg-[var(--accent-muted)] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[var(--accent)] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-display-3 font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate transition-colors">
                  ernst@mueveops.com
                </span>
              </a>
              <div className="flex items-center gap-4 min-w-0 border-l-2 border-[var(--accent-2)] pl-5 py-2">
                <svg
                  className="w-5 h-5 text-[var(--accent-2)] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-body-lg text-[var(--text-secondary)]">
                  Sweden — serving clients globally
                </span>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ background: "var(--accent-muted)", border: "1px solid rgba(11, 255, 194, 0.15)" }}>
              <p className="text-sm text-[var(--text-secondary)]">
                Want to see what&apos;s automatable first?{" "}
                <a href="/ai-audit" className="text-[var(--accent)] font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">
                  Try our free AI Audit →
                </a>
              </p>
            </div>

            <div className="pt-2">
              <BookCallButton variant="outline-accent" size="lg" className="gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book a free call
              </BookCallButton>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
