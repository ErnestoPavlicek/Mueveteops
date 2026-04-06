import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";

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

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 px-5 sm:px-8 lg:px-16 py-14 lg:py-20 border-b border-[var(--divider)]">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-display-1 text-[var(--text-primary)]">
            Services That Take AI From Buzzword to Business Results
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
            We deliver end-to-end AI solutions — from audit to deployment to
            ongoing optimization. No fluff, no hype, just results.
          </p>
        </div>
        <div className="relative w-full lg:flex-1 aspect-[4/3] lg:aspect-auto lg:h-[420px] rounded-xl border border-[var(--border)] overflow-hidden">
          <Image
            src="/images/service-hero.webp"
            alt="MueveOps services overview"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => {
        const imageLeft = i % 2 === 1;
        return (
          <section
            key={service.num}
            className={`flex flex-col ${
              imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-10 lg:gap-12 px-5 sm:px-8 lg:px-16 py-14 lg:py-20 border-b border-[var(--divider)]`}
          >
            <div className="relative w-full lg:flex-1 aspect-[4/3] lg:aspect-auto lg:h-[380px] rounded-xl border border-[var(--border)] overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <span className="text-eyebrow tabular text-[var(--accent)]">
                {service.num}
              </span>
              <h2 className="text-display-2 text-[var(--text-primary)]">
                {service.title}
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
                {service.description}
              </p>
              <div className="flex flex-col gap-3">
                {service.bullets.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <span aria-hidden className="text-[var(--accent)] font-bold">→</span>
                    <span className="text-body text-[var(--text-primary)]">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        heading="Ready to Transform Your Business with AI?"
        subtitle="Book a free consultation and discover how AI can save your team hours every week."
        primaryLabel="Get Your Free AI Audit"
        primaryHref="/ai-audit"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
      />

      <Footer />
    </div>
  );
}
