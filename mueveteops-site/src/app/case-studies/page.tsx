import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookCallButton } from "@/components/BookCallButton";

const caseStudies = [
  {
    image: "/cases/lead-generation.webp",
    tag: "Lead Generation",
    title: "Automated Lead Generation Pipeline",
    description:
      "Built a multi-step lead scraping, enrichment, and outreach system that generates qualified leads on autopilot.",
  },
  {
    image: "/cases/customer-service.webp",
    tag: "AI Agents",
    title: "AI-Powered Customer Service Agent",
    description:
      "Deployed an intelligent agent that handles 70% of support tickets without human intervention.",
  },
  {
    image: "/cases/process-automation.webp",
    tag: "Automation",
    title: "Process Automation for a Distribution Company",
    description:
      "Automated inventory tracking and order processing, saving 20+ hours per week.",
  },
  {
    image: "/cases/creative-content.webp",
    tag: "AI Creatives",
    title: "AI Creative Content Production",
    description:
      "Generated product visuals and marketing videos at 10x the speed of traditional production.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-5 sm:px-8 lg:px-16 py-16 lg:py-[100px] gap-6">
        <h1 className="text-display-1 text-[var(--text-primary)] text-center max-w-[14ch]">
          Case Studies — AI in Practice
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] text-center max-w-[60ch]">
          Real projects. Real results. See how we&apos;ve helped businesses
          implement AI.
        </p>
      </section>

      {/* Case Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5 sm:px-8 lg:px-16 pb-14 lg:pb-20">
        {caseStudies.map((cs, i) => (
          <CaseCard key={cs.title} {...cs} variant={i % 2 === 0 ? "mint" : "indigo"} />
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="flex flex-col items-center justify-center gap-8 px-5 sm:px-8 lg:px-16 py-14 lg:py-20">
        <h2 className="text-display-2 text-[var(--text-primary)] text-center">
          Have a project in mind?
        </h2>
        <BookCallButton
          text="Book a Meeting"
          className="bg-[var(--accent)] text-[var(--bg)] font-bold text-base px-10 py-4 rounded-xl hover:opacity-90 transition-opacity"
        />
      </section>

      <Footer />
    </div>
  );
}

function CaseCard({
  image,
  tag,
  title,
  description,
  variant,
}: {
  image: string;
  tag: string;
  title: string;
  description: string;
  variant: "mint" | "indigo";
}) {
  const tagBg =
    variant === "mint" ? "var(--accent-muted)" : "var(--accent-2-muted)";
  const tagFg =
    variant === "mint" ? "var(--accent)" : "var(--accent-2)";
  return (
    <div className="flex flex-col min-w-0 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
      <div
        className="aspect-[16/9] w-full bg-cover bg-center border-b border-[var(--border)]"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex flex-col gap-4 p-6">
        <span
          className="text-eyebrow self-start px-3 py-1.5 rounded-full"
          style={{ backgroundColor: tagBg, color: tagFg }}
        >
          {tag}
        </span>
        <h3 className="text-heading text-[var(--text-primary)] break-words">
          {title}
        </h3>
        <p className="text-body-lg text-[var(--text-secondary)] break-words">
          {description}
        </p>
      </div>
    </div>
  );
}
