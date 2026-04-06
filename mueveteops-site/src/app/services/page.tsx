import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    num: "01",
    title: "AI Strategy & Audit",
    description:
      "Before building anything, we map your entire operation to find where AI creates the most value — not where it sounds coolest.",
    bullets: [
      "Process mapping & bottleneck analysis",
      "ROI opportunity identification",
      "Concrete action plan with timelines",
    ],
    image: "/images/service-1.webp",
  },
  {
    num: "02",
    title: "AI Automations",
    description:
      "Stop wasting hours on repetitive tasks. We build custom automation pipelines that connect your tools and eliminate manual work.",
    bullets: [
      "Custom workflow design",
      "Seamless system integration",
      "Real-time performance monitoring",
    ],
    image: "/images/service-2.webp",
  },
  {
    num: "03",
    title: "AI Agents",
    description:
      "Deploy intelligent AI assistants that work around the clock — handling support, research, and analysis while your team focuses on strategy.",
    bullets: [
      "24/7 customer support agents",
      "Internal knowledge base assistants",
      "Automated data analysis & reporting",
    ],
    image: "/images/service-3.webp",
  },
  {
    num: "04",
    title: "AI Creatives",
    description:
      "Produce stunning visuals, videos, and marketing assets at a fraction of the time and cost of traditional production.",
    bullets: [
      "AI-generated product visuals",
      "Marketing video production",
      "Brand-consistent graphic design",
    ],
    image: "/images/service-4.webp",
  },
  {
    num: "05",
    title: "Website Building",
    description:
      "Your website is your hardest-working salesperson. We build fast, modern, conversion-optimized sites with AI-assisted workflows.",
    bullets: [
      "Conversion-optimized design",
      "Lightning-fast performance",
      "SEO-ready architecture",
    ],
    image: "/images/service-5.webp",
  },
];

const accentForIndex = (i: number) =>
  i % 3 === 0
    ? "var(--accent)"
    : i % 3 === 1
    ? "var(--accent-2)"
    : "var(--accent-3)";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="relative px-5 sm:px-8 lg:px-16 pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-60" />
        <div
          aria-hidden
          className="absolute -z-10 glow-teal animate-glow-drift"
          style={{ width: 700, height: 700, left: "-15%", top: "-20%" }}
        />
        <div
          aria-hidden
          className="absolute -z-10 glow-purple animate-glow-drift"
          style={{ width: 600, height: 600, right: "-10%", top: "20%", animationDelay: "-6s" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

        <div className="flex flex-col gap-8">
          <SectionLabel>What We Do</SectionLabel>
          <h1 className="text-mega text-[var(--text-primary)] max-w-[14ch]">
            From AI <span className="display-thin text-[var(--text-secondary)]">strategy</span>
            <br />
            to <span className="text-gradient">business results.</span>
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[58ch]">
            We deliver end-to-end AI solutions — from audit to deployment to
            ongoing optimization. No fluff, no hype, just receipts.
          </p>
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* Service Sections */}
      {services.map((service, i) => {
        const imageLeft = i % 2 === 1;
        const color = accentForIndex(i);
        return (
          <section
            key={service.num}
            className="relative border-b border-[var(--border-strong)] overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -z-10"
              style={{
                width: 500,
                height: 500,
                [imageLeft ? "right" : "left"]: "-15%",
                top: "20%",
                background: `radial-gradient(closest-side, ${color}33, transparent 70%)`,
                filter: "blur(60px)",
              }}
            />

            <div
              className={`flex flex-col ${
                imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-stretch gap-10 lg:gap-16 px-5 sm:px-8 lg:px-16 py-20 lg:py-32`}
            >
              <Reveal className="lg:flex-1">
                <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl border border-[var(--border-strong)] overflow-hidden accent-shadow">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-eyebrow tabular bg-[var(--bg)]/70 backdrop-blur-md border border-[var(--border-strong)]"
                    style={{ color }}
                  >
                    SERVICE / {service.num}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:flex-1 flex flex-col justify-center">
                <div className="flex flex-col gap-7">
                  <span
                    className="font-heading tabular font-black leading-none tracking-[-0.05em]"
                    style={{
                      color,
                      fontSize: "clamp(4rem, 2rem + 8vw, 8rem)",
                    }}
                  >
                    {service.num}
                  </span>
                  <h2 className="text-display-1 text-[var(--text-primary)]">
                    {service.title}
                  </h2>
                  <p className="text-body-lg text-[var(--text-secondary)] max-w-[58ch]">
                    {service.description}
                  </p>
                  <div className="flex flex-col gap-4 pt-2">
                    {service.bullets.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-4 border-l-2 pl-5 py-1"
                        style={{ borderColor: color }}
                      >
                        <span className="text-body-lg font-semibold text-[var(--text-primary)]">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTASection
        heading="Ready to put AI to work in your business?"
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
