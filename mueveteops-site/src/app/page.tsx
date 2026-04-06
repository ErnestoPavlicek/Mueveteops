import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { CTASection } from "@/components/CTASection";
import { BookCallButton } from "@/components/BookCallButton";
import { Button } from "@/components/ui/Button";

const services = [
  {
    title: "AI Strategy & Audit",
    description:
      "We assess your workflows, tech stack, and team to find the highest-ROI opportunities for AI integration.",
    link: "/services",
  },
  {
    title: "AI Automations",
    description:
      "From lead routing to invoice processing, we build automations that eliminate repetitive work across your stack.",
    link: "/services",
  },
  {
    title: "AI Agents",
    description:
      "Custom AI agents that handle customer support, data entry, scheduling, and more — 24/7, without burnout.",
    link: "/services",
  },
  {
    title: "AI Creatives",
    description:
      "AI-powered content pipelines for social media, product visuals, and marketing videos at scale.",
    link: "/services",
  },
  {
    title: "Website Building",
    description:
      "High-converting websites and landing pages built with modern AI-assisted development workflows.",
    link: "/services",
  },
];

const steps = [
  {
    num: "01",
    title: "Audit & Discovery",
    description:
      "We map your operations, identify bottlenecks, and find the highest-impact AI opportunities.",
  },
  {
    num: "02",
    title: "Build & Integrate",
    description:
      "We design and deploy custom AI solutions that plug directly into your existing tools and workflows.",
  },
  {
    num: "03",
    title: "Optimize & Scale",
    description:
      "We monitor performance, refine the system, and scale what works across your organization.",
  },
];

const stats = [
  { value: "15h", label: "Saved per week" },
  { value: "3x", label: "Faster lead response" },
  { value: "40%", label: "Reduction in manual tasks" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[clamp(34rem,80svh,44rem)] flex items-center py-16 lg:py-0 overflow-hidden">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.18) 100%)",
          }}
        />
        <div className="relative px-5 sm:px-8 lg:px-16 max-w-[720px] flex flex-col gap-6 lg:gap-8">
          <h1 className="text-display-1 text-[var(--text-primary)]">
            AI That Drives{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Growth.
            </span>
            <br />Not Just Hype.
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
            We build AI systems that integrate into your business — automations,
            agents, and creative pipelines that actually ship results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <BookCallButton variant="outline" size="md">
              Book a Meeting
            </BookCallButton>
            <Button href="/ai-audit" variant="primary" size="md">
              Free AI Audit
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 lg:py-20 border-t border-[var(--divider)] flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-4">
          <SectionLabel>01 — Services</SectionLabel>
          <h2 className="text-display-2 text-[var(--text-primary)]">
            From Strategy to Production
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const featured = i === 0;
            const accentColor =
              i % 2 === 0 ? "var(--accent)" : "var(--accent-2)";
            return (
              <div
                key={s.title}
                className={`flex flex-col rounded-xl bg-[var(--bg-card)] border border-[var(--border)] ${
                  featured
                    ? "sm:col-span-2 lg:col-span-2 p-8 lg:p-10 gap-5 lg:gap-6"
                    : "p-7 gap-4"
                }`}
              >
                <span
                  aria-hidden
                  className={`rounded-full h-[3px] ${featured ? "w-16" : "w-10"}`}
                  style={{ background: accentColor }}
                />
                {featured && (
                  <span
                    className="text-eyebrow"
                    style={{ color: accentColor }}
                  >
                    Start here
                  </span>
                )}
                <h3
                  className={`text-[var(--text-primary)] ${
                    featured
                      ? "text-display-3 max-w-[520px]"
                      : "text-heading"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`text-body-lg text-[var(--text-secondary)] ${
                    featured ? "max-w-[60ch]" : ""
                  }`}
                >
                  {s.description}
                </p>
                <Link
                  href={s.link}
                  className="text-body font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity mt-auto"
                >
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 lg:py-28 border-t border-[var(--divider)] flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-4 max-w-[720px]">
          <SectionLabel>02 — How We Work</SectionLabel>
          <h2 className="text-display-2 text-[var(--text-primary)]">
            Three Steps to AI Transformation
          </h2>
        </div>
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-16 py-10 lg:py-12 border-t border-[var(--divider)] last:border-b"
            >
              <span
                className="font-heading tabular text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-extrabold leading-none tracking-[-0.04em] md:w-40 md:flex-shrink-0"
                style={{
                  color: i === 1 ? "var(--accent-2)" : "var(--accent)",
                }}
              >
                {step.num}
              </span>
              <div className="flex flex-col gap-3 max-w-[60ch] md:pt-3">
                <h3 className="text-display-3 text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-body-lg text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 lg:py-20 border-t border-[var(--divider)] flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-4">
          <SectionLabel>03 — Results</SectionLabel>
          <h2 className="text-display-2 text-[var(--text-primary)]">
            What Our Clients Achieve
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 py-4">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="flex flex-col gap-2"
            >
              <span
                className="font-heading tabular text-[2.5rem] sm:text-5xl lg:text-[56px] font-extrabold leading-none tracking-[-0.025em]"
                style={{
                  color: i === 1 ? "var(--accent-2)" : "var(--accent)",
                }}
              >
                {stat.value}
              </span>
              <span className="text-body-lg text-[var(--text-secondary)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading={"Ready to See What\nAI Can Do for You?"}
        subtitle="Book a free consultation and discover how AI can save your team hours every week."
        primaryLabel="Free AI Audit"
        primaryHref="/ai-audit"
        secondaryLabel="Book a Meeting"
        secondaryHref="/contact"
        secondaryAsBookCall
      />

      <Footer />
    </div>
  );
}
