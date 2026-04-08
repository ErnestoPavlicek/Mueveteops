import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { CTASection } from "@/components/CTASection";
import { BookCallButton } from "@/components/BookCallButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/ai-audit",
  },
};

const cards = [
  {
    title: "Structured Process Review",
    description:
      "We map your workflows and identify bottlenecks where AI can make the biggest impact.",
  },
  {
    title: "2–3 high-impact AI opportunities",
    description:
      "We pinpoint the highest-ROI use cases tailored to your specific business needs.",
  },
  {
    title: "Cost & Time Savings Estimate",
    description:
      "You get concrete numbers — not vague promises — on what AI can save your team.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Book a Call",
    description:
      "A quick 30-minute intro where we learn about your business, current tools, and goals.",
  },
  {
    num: "02",
    title: "We Analyze",
    description:
      "Our team reviews your processes, identifies bottlenecks, and maps AI opportunities.",
  },
  {
    num: "03",
    title: "You Get a Plan",
    description:
      "A concrete report with prioritized recommendations, estimated savings, and next steps.",
  },
];

const accent = (i: number) =>
  i % 3 === 0
    ? "var(--accent)"
    : i % 3 === 1
    ? "var(--accent-2)"
    : "var(--accent-3)";

export default function AIAuditPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[clamp(40rem,90svh,52rem)] flex items-end pb-16 lg:pb-24 overflow-hidden">
        <Image
          src="/images/audit-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover -z-20 opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7,7,12,0.95) 0%, rgba(7,7,12,0.55) 45%, rgba(7,7,12,0.95) 100%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-60" />
        <div
          aria-hidden
          className="absolute -z-10 glow-teal animate-glow-drift"
          style={{ width: 700, height: 700, right: "-10%", top: "0%" }}
        />
        <div
          aria-hidden
          className="absolute -z-10 glow-magenta"
          style={{ width: 500, height: 500, left: "10%", bottom: "-15%", opacity: 0.45 }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

        <div className="absolute top-0 inset-x-0 px-5 sm:px-8 lg:px-16 pt-6 lg:pt-8">
          <span className="text-eyebrow text-[var(--accent)]">
            ◉ FREE AI AUDIT · NO STRINGS
          </span>
        </div>

        <div className="relative w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-10">
          <h1 className="text-mega text-[var(--text-primary)] max-w-[14ch]">
            See where{" "}
            <span className="text-gradient">AI pays off</span>
            <br />
            <span className="display-thin text-[var(--text-secondary)]">in your</span>{" "}
            business.
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[48ch]">
              A free, no-strings review of your workflows — we&apos;ll show
              you where AI saves time, cuts costs, and improves quality. No
              fluff.
            </p>
            <BookCallButton variant="primary" size="lg">
              Book a free call
            </BookCallButton>
          </div>
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* What You Get */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-36 flex flex-col gap-14 lg:gap-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute -z-10 glow-teal"
          style={{ width: 600, height: 600, right: "-15%", top: "10%", opacity: 0.35 }}
        />

        <Reveal>
          <div className="flex flex-col gap-5 max-w-[820px]">
            <SectionLabel>01 / What You Get</SectionLabel>
            <h2 className="text-display-1 text-[var(--text-primary)]">
              Three deliverables.
              <br />
              <span className="text-gradient">Zero fluff.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const color = accent(i);
            return (
              <Reveal key={card.title} delay={i * 120}>
                <div className="card-lift relative h-full flex flex-col gap-6 p-9 lg:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
                  <span
                    className="font-heading tabular font-black leading-[0.85]"
                    style={{ color, fontSize: "clamp(3rem, 1.5rem + 4vw, 5rem)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="text-display-3 text-[var(--text-primary)]">
                    {card.title}
                  </h3>
                  <p className="text-body-lg text-[var(--text-secondary)]">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* Why an AI Audit */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-36 overflow-hidden bg-[var(--bg-elev)]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div
          aria-hidden
          className="absolute -z-10 glow-purple"
          style={{ width: 600, height: 600, left: "-15%", top: "10%", opacity: 0.4 }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          <Reveal className="lg:flex-1">
            <div className="flex flex-col gap-7 max-w-[58ch]">
              <SectionLabel>02 / Why an AI Audit?</SectionLabel>
              <h2 className="text-display-1 text-[var(--text-primary)]">
                Most teams chase{" "}
                <span className="display-thin text-[var(--text-secondary)]">trends.</span>
                <br />
                We chase <span className="text-gradient">leverage.</span>
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)]">
                Without a clear strategy, teams end up chasing trends instead
                of solving real problems. Our audit cuts through the noise — we
                analyze your actual workflows and deliver a prioritized,
                actionable plan built around your business goals.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:flex-1">
            <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 aspect-[5/4] rounded-2xl border border-[var(--border-strong)] overflow-hidden accent-shadow lg:flex-shrink-0">
              <Image
                src="/images/audit-why.webp"
                alt="A clear AI audit cuts through the noise"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* The Process */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-36 flex flex-col gap-14 lg:gap-20 overflow-hidden">
        <Reveal>
          <div className="flex flex-col gap-5 max-w-[820px]">
            <SectionLabel>03 / The Process</SectionLabel>
            <h2 className="text-display-1 text-[var(--text-primary)]">
              From call to <span className="text-gradient">plan</span>
              <br />
              in <span className="display-thin text-[var(--text-secondary)]">one week.</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {processSteps.map((step, i) => {
            const color = accent(i);
            return (
              <Reveal key={step.num} delay={i * 140} className="border-t border-[var(--border-strong)] last:border-b">
                <div className="row-sweep -mx-5 sm:-mx-8 lg:-mx-16 px-5 sm:px-8 lg:px-16">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20 py-12 lg:py-16 items-start">
                    <span
                      className="font-heading tabular font-black leading-[0.82] tracking-[-0.05em] md:w-56 md:flex-shrink-0"
                      style={{
                        color,
                        fontSize: "clamp(4.5rem, 2rem + 9vw, 9rem)",
                      }}
                    >
                      {step.num}
                    </span>
                    <div className="flex flex-col gap-4 max-w-[60ch] md:pt-3">
                      <h3 className="text-display-2 text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="text-body-lg text-[var(--text-secondary)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection
        heading="Ready to see what AI can do for your team?"
        primaryLabel="Book a free call"
        primaryHref="/contact"
        primaryAsBookCall
      />

      <Footer />
    </div>
  );
}
