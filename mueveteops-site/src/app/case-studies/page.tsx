import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookCallButton } from "@/components/BookCallButton";
import { SectionLabel } from "@/components/SectionLabel";

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="relative flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-16 py-32 lg:py-48 gap-8 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-60" />
        <div
          aria-hidden
          className="absolute -z-10 glow-teal animate-glow-drift"
          style={{ width: 700, height: 700, left: "50%", top: "10%", transform: "translateX(-50%)" }}
        />
        <div
          aria-hidden
          className="absolute -z-10 glow-magenta"
          style={{ width: 500, height: 500, left: "50%", bottom: "-10%", transform: "translateX(-50%)", opacity: 0.4 }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

        <SectionLabel>Case Studies</SectionLabel>
        <h1 className="text-mega text-[var(--text-primary)] max-w-[14ch]">
          <span className="display-thin text-[var(--text-secondary)]">Coming</span>
          <br />
          <span className="text-gradient animate-gradient-sweep">soon.</span>
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-[58ch]">
          We&apos;re documenting our latest AI projects. Check back soon —
          or skip the wait and book a call to hear them firsthand.
        </p>
        <div className="mt-2">
          <BookCallButton variant="primary" size="lg">
            Book a free call
          </BookCallButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
