import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { CTASection } from "@/components/CTASection";
import { BookCallButton } from "@/components/BookCallButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

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
  { numeric: 15, suffix: "h", label: "Saved per week" },
  { numeric: 3, suffix: "x", label: "Faster lead response" },
  { numeric: 40, suffix: "%", label: "Reduction in manual tasks" },
];

// Marquee tape that runs infinitely under the hero. The list is
// duplicated inside the JSX so the keyframe can translate -50% and
// loop seamlessly.
const marqueeWords = [
  "AUTOMATIONS",
  "AGENTS",
  "AUDITS",
  "CREATIVES",
  "WEBSITES",
  "PIPELINES",
  "WORKFLOWS",
  "INTEGRATIONS",
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-[clamp(40rem,92svh,56rem)] flex items-end overflow-hidden pb-16 lg:pb-24">
        {/* Background image */}
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover -z-20 opacity-55"
        />

        {/* Vignette gradient */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7,7,12,0.92) 0%, rgba(7,7,12,0.55) 45%, rgba(7,7,12,0.95) 100%)",
          }}
        />

        {/* Dot grid backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-70" />

        {/* Drifting brand glows — the hero focal energy */}
        <div
          aria-hidden
          className="absolute -z-10 glow-teal animate-glow-drift"
          style={{ width: 700, height: 700, left: "-10%", top: "-15%" }}
        />
        <div
          aria-hidden
          className="absolute -z-10 glow-purple animate-glow-drift"
          style={{
            width: 600,
            height: 600,
            right: "-12%",
            top: "10%",
            animationDelay: "-7s",
          }}
        />
        <div
          aria-hidden
          className="absolute -z-10 glow-magenta"
          style={{ width: 420, height: 420, left: "30%", bottom: "-15%", opacity: 0.5 }}
        />

        {/* Noise overlay for texture */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

        {/* Eyebrow row pinned to top */}
        <div className="absolute top-0 inset-x-0 px-5 sm:px-8 lg:px-16 pt-6 lg:pt-8 flex items-center justify-between">
          <span
            className="text-eyebrow text-[var(--accent)] animate-rise-in"
            style={{ "--rise-delay": "40ms" } as CSSVars}
          >
            ◉ MueveOps · AI Operations Studio
          </span>
          <span
            className="text-eyebrow text-[var(--text-tertiary)] hidden md:inline animate-rise-in"
            style={{ "--rise-delay": "80ms" } as CSSVars}
          >
            EST. STOCKHOLM · 2025
          </span>
        </div>

        {/* Hero content */}
        <div className="relative w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-10 lg:gap-14">
          <h1 className="text-mega text-[var(--text-primary)] max-w-[14ch]">
            <span className="text-reveal-line">
              <span
                className="text-reveal-inner"
                style={{ "--rise-delay": "120ms" } as CSSVars}
              >
                AI THAT
              </span>
            </span>
            <span className="text-reveal-line">
              <span
                className="text-reveal-inner"
                style={{ "--rise-delay": "240ms" } as CSSVars}
              >
                <span className="text-gradient animate-gradient-sweep">MOVES</span>{" "}
                <span className="display-thin text-[var(--text-secondary)]">your</span>
              </span>
            </span>
            <span className="text-reveal-line">
              <span
                className="text-reveal-inner"
                style={{ "--rise-delay": "360ms" } as CSSVars}
              >
                BUSINESS.
              </span>
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            <p
              className="text-body-lg text-[var(--text-secondary)] max-w-[44ch] animate-rise-in"
              style={{ "--rise-delay": "260ms" } as CSSVars}
            >
              We build automations, AI agents, and content pipelines that plug
              into your existing tools — and start saving your team hours in
              week one. No fluff, no slide decks.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-rise-in"
              style={{ "--rise-delay": "380ms" } as CSSVars}
            >
              <Button href="/ai-audit" variant="primary" size="lg">
                Get a free AI audit
              </Button>
              <BookCallButton variant="outline" size="lg">
                Book a free call →
              </BookCallButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee tape ──────────────────────────────────── */}
      <section
        aria-hidden
        className="marquee-track relative border-y border-[var(--border-strong)] bg-[var(--bg-elev)] overflow-hidden py-7"
      >
        <div className="animate-marquee whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="text-display-2 font-heading inline-flex items-center px-8"
              style={{
                color:
                  i % 3 === 0
                    ? "var(--text-primary)"
                    : i % 3 === 1
                    ? "var(--accent)"
                    : "var(--accent-2)",
              }}
            >
              {w}
              <span
                aria-hidden
                className="inline-block w-3 h-3 rounded-full ml-8"
                style={{ background: "var(--accent-3)" }}
              />
            </span>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-20 lg:py-32 flex flex-col gap-14 lg:gap-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute -z-10 glow-teal"
          style={{ width: 520, height: 520, right: "-10%", top: "10%", opacity: 0.4 }}
        />

        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="flex flex-col gap-5 max-w-[820px]">
              <SectionLabel>01 / Services</SectionLabel>
              <h2 className="text-display-1 text-[var(--text-primary)]">
                From <span className="display-thin text-[var(--text-secondary)]">strategy</span>
                <br />
                to <span className="text-gradient">rollout.</span>
              </h2>
            </div>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[42ch]">
              Five deeply integrated practices, one operating system for your
              business. Pick the entry point — we run the rest.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => {
            const featured = i === 0;
            const accentColor =
              i % 3 === 0
                ? "var(--accent)"
                : i % 3 === 1
                ? "var(--accent-2)"
                : "var(--accent-3)";
            return (
              <Reveal
                key={s.title}
                delay={i * 90}
                className={featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
              >
                <div
                  className={`card-lift relative h-full flex flex-col rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden ${
                    featured ? "p-9 lg:p-12 gap-7" : "p-8 gap-5"
                  }`}
                >
                  {featured && (
                    <div
                      aria-hidden
                      className="absolute -z-0 glow-teal"
                      style={{
                        width: 360,
                        height: 360,
                        right: "-15%",
                        bottom: "-30%",
                        opacity: 0.35,
                      }}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <span
                      className="text-eyebrow tabular"
                      style={{ color: accentColor }}
                    >
                      0{i + 1} / {featured ? "FEATURED" : "SERVICE"}
                    </span>
                    <span
                      aria-hidden
                      className="card-accent-bar h-[3px] w-12 rounded-full"
                      style={{ background: accentColor }}
                    />
                  </div>
                  <h3
                    className={`relative text-[var(--text-primary)] ${
                      featured ? "text-display-2 max-w-[14ch]" : "text-display-3"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`relative text-body-lg text-[var(--text-secondary)] ${
                      featured ? "max-w-[52ch]" : ""
                    }`}
                  >
                    {s.description}
                  </p>
                  <Link
                    href={s.link}
                    className="relative text-body font-bold mt-auto inline-flex items-center gap-2"
                    style={{ color: accentColor }}
                  >
                    Learn more <span className="card-arrow">→</span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* ── Process ──────────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-36 flex flex-col gap-16 lg:gap-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute -z-10 glow-purple"
          style={{ width: 600, height: 600, left: "-15%", top: "20%", opacity: 0.35 }}
        />

        <Reveal>
          <div className="flex flex-col gap-5 max-w-[820px]">
            <SectionLabel>02 / How We Work</SectionLabel>
            <h2 className="text-display-1 text-[var(--text-primary)]">
              Three <span className="text-gradient">moves.</span>
              <br />
              <span className="display-thin text-[var(--text-secondary)]">Zero</span> guesswork.
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {steps.map((step, i) => {
            const color =
              i === 0
                ? "var(--accent)"
                : i === 1
                ? "var(--accent-2)"
                : "var(--accent-3)";
            return (
              <Reveal
                key={step.num}
                delay={i * 140}
                className="border-t border-[var(--border-strong)] last:border-b"
              >
                <div className="row-sweep -mx-5 sm:-mx-8 lg:-mx-16 px-5 sm:px-8 lg:px-16">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20 py-12 lg:py-20 items-start">
                    <span
                      className="font-heading tabular text-[5rem] sm:text-[7rem] lg:text-[10rem] font-black leading-[0.82] tracking-[-0.05em] md:w-56 md:flex-shrink-0"
                      style={{ color }}
                    >
                      {step.num}
                    </span>
                    <div className="flex flex-col gap-4 max-w-[60ch] md:pt-4">
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

      <div aria-hidden className="divider-sweep" />

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-20 lg:py-32 flex flex-col gap-14 lg:gap-20 overflow-hidden bg-[var(--bg-elev)]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40" />
        <div
          aria-hidden
          className="absolute -z-10 glow-teal"
          style={{ width: 700, height: 700, right: "-10%", top: "-20%", opacity: 0.4 }}
        />

        <Reveal>
          <div className="flex flex-col gap-5 max-w-[820px]">
            <SectionLabel>03 / Results</SectionLabel>
            <h2 className="text-display-1 text-[var(--text-primary)]">
              Receipts, not <span className="display-thin text-[var(--text-secondary)]">promises.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const color =
              i === 0
                ? "var(--accent)"
                : i === 1
                ? "var(--accent-2)"
                : "var(--accent-3)";
            return (
              <Reveal key={stat.label} delay={i * 120}>
                <div className="flex flex-col gap-4 border-l-2 pl-6 lg:pl-8" style={{ borderColor: color }}>
                  <span className="text-eyebrow tabular" style={{ color }}>
                    METRIC 0{i + 1}
                  </span>
                  <StatCounter
                    value={stat.numeric}
                    suffix={stat.suffix}
                    className="font-heading tabular text-[clamp(4rem,2rem+9vw,8.5rem)] font-black leading-[0.82] tracking-[-0.045em]"
                    style={{ color }}
                  />
                  <span className="text-body-lg text-[var(--text-secondary)]">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection
        heading="Ready to see what AI can do for your team?"
        subtitle="Get a free audit and find out exactly where AI can save your team hours every week."
        primaryLabel="Get a free AI audit"
        primaryHref="/ai-audit"
        secondaryLabel="Book a free call"
        secondaryHref="/contact"
        secondaryAsBookCall
      />

      <Footer />
    </div>
  );
}
