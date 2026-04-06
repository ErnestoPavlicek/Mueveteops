import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookCallButton } from "@/components/BookCallButton";

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-16 py-24 lg:py-32 gap-6">
        <span className="text-eyebrow text-[var(--text-secondary)]">
          Case Studies
        </span>
        <h1 className="text-display-1 text-[var(--text-primary)]">
          Coming Soon
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
          We&apos;re documenting our latest AI projects. Check back soon or
          book a call to learn more.
        </p>
        <div className="mt-2">
          <BookCallButton variant="primary" size="lg">
            Book a Meeting
          </BookCallButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
