import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { CTASection } from "@/components/CTASection";

const values = [
  {
    title: "Build, Don't Just Advise",
    description:
      "We build and deploy working AI systems — not slide decks.",
  },
  {
    title: "Measurable Impact",
    description:
      "Concrete business metrics — time saved, revenue gained, costs reduced.",
  },
  {
    title: "Partnership, Not Projects",
    description:
      "Your AI partner, not a one-off vendor. We grow with your business.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-5 sm:px-8 lg:px-16 py-20 lg:py-[120px] gap-6">
        <span className="text-eyebrow text-[var(--text-secondary)]">
          About Us
        </span>
        <h1 className="text-display-1 text-[var(--text-primary)] text-center">
          About MueveOps
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] text-center max-w-[60ch]">
          We&apos;re an AI solutions agency built on one belief: technology
          should work for your business, not the other way around.
        </p>
      </section>

      {/* Founder Section */}
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-12 px-5 sm:px-8 lg:px-16 py-14 lg:py-20">
        <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 aspect-[480/450] rounded-xl border border-[var(--border)] overflow-hidden lg:flex-shrink-0">
          <Image
            src="/images/founder.webp"
            alt="Ernesto, founder of MueveOps"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <h2 className="text-display-2 text-[var(--text-primary)]">
            Built by Someone Who Ships
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
            MueveOps was founded by Ernesto — an AI specialist who builds,
            deploys, and maintains real AI systems for businesses. No theory. No
            buzzwords. Just working solutions that deliver measurable results.
          </p>
          <p className="text-body-lg font-semibold text-[var(--text-primary)]">
            Based in Sweden. Serving clients globally.
          </p>
          <div className="h-px bg-[var(--divider)]" />
        </div>
      </section>

      {/* Values Section */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 lg:py-20 flex flex-col gap-10 lg:gap-12">
        <SectionLabel>Our Method</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="flex flex-col gap-4 p-7 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            >
              <span
                aria-hidden
                className="h-[3px] w-10 rounded-full"
                style={{
                  background:
                    i % 2 === 0 ? "var(--accent)" : "var(--accent-2)",
                }}
              />
              <h3 className="text-heading text-[var(--text-primary)]">
                {v.title}
              </h3>
              <p className="text-body-lg text-[var(--text-secondary)]">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Let's build something together."
        primaryLabel="Book a Meeting"
        primaryHref="/contact"
        primaryAsBookCall
      />

      <Footer />
    </div>
  );
}
