import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { CTASection } from "@/components/CTASection";
import { BookCallButton } from "@/components/BookCallButton";

const cards = [
  {
    title: "Structured Process Review",
    description:
      "We map your workflows and identify bottlenecks where AI can make the biggest impact.",
  },
  {
    title: "2-3 AI Opportunity Identification",
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

export default function AIAuditPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[clamp(36rem,85svh,49rem)] flex items-center py-16 lg:py-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.8) 40%, rgba(10,10,15,0.6) 70%, rgba(10,10,15,0.38) 100%), url(/images/audit-hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-5 sm:px-8 lg:px-16 max-w-[720px] flex flex-col gap-6 lg:gap-8">
          <h1 className="text-display-1 text-[var(--text-primary)]">
            Free AI Audit
          </h1>
          <p className="text-body-lg text-[var(--text-primary)] max-w-[60ch]">
            Discover where AI can save you time, reduce costs, and improve
            quality — with zero fluff.
          </p>
          <BookCallButton
            text="Book Your Free Audit"
            className="self-start bg-[var(--accent)] text-[var(--bg)] font-semibold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
          />
        </div>
      </section>

      {/* What You Get */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 lg:py-20 flex flex-col gap-10 lg:gap-12">
        <SectionLabel>01 — What You Get</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="flex flex-col gap-5 p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
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
                {card.title}
              </h3>
              <p className="text-body-lg text-[var(--text-secondary)]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why an AI Audit */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 lg:py-20 flex flex-col gap-10 lg:gap-12">
        <SectionLabel>02 — Why an AI Audit?</SectionLabel>
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-display-2 text-[var(--text-primary)]">
              Most businesses waste time on the wrong AI tools.
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
              Without a clear strategy, teams end up chasing trends instead of
              solving real problems. Our audit cuts through the noise — we
              analyze your actual workflows and deliver a prioritized, actionable
              plan built around your business goals.
            </p>
          </div>
          <div
            className="w-full max-w-[500px] mx-auto lg:mx-0 aspect-[5/4] lg:h-[400px] rounded-xl border border-[var(--border)] bg-cover bg-center lg:flex-shrink-0"
            style={{ backgroundImage: "url(/images/audit-why.webp)" }}
          />
        </div>
      </section>

      {/* The Process */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 lg:py-20 flex flex-col gap-10 lg:gap-12">
        <SectionLabel>03 — The Process</SectionLabel>
        <div className="sm:px-6 lg:px-10 flex flex-col">
          {processSteps.map((step, i) => {
            const stepColor =
              i === 1 ? "var(--accent-2)" : "var(--accent)";
            return (
            <div key={step.num} className="flex gap-6 sm:gap-8 pb-10 min-w-0">
              <div className="flex flex-col items-center flex-shrink-0">
                <span
                  className="font-heading tabular text-[2.5rem] sm:text-5xl lg:text-[56px] font-extrabold leading-none tracking-[-0.025em]"
                  style={{ color: stepColor }}
                >
                  {step.num}
                </span>
                {i < processSteps.length - 1 && (
                  <div
                    className="w-0.5 h-10 mt-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--accent), var(--accent-2))",
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 pt-2 sm:pt-4 min-w-0">
                <h3 className="text-display-3 text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
                  {step.description}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      <CTASection
        heading="Ready to See What AI Can Do?"
        primaryLabel="Book Your Free Audit"
        primaryHref="/contact"
        primaryAsBookCall
      />

      <Footer />
    </div>
  );
}
