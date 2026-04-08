import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
};

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

const accent = (i: number) =>
  i % 3 === 0
    ? "var(--accent)"
    : i % 3 === 1
    ? "var(--accent-2)"
    : "var(--accent-3)";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="relative px-5 sm:px-8 lg:px-16 pt-20 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-60" />
        <div
          aria-hidden
          className="absolute -z-10 glow-purple animate-glow-drift"
          style={{ width: 800, height: 800, left: "50%", top: "0%", transform: "translateX(-50%)" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

        <div className="flex flex-col items-center text-center gap-8">
          <SectionLabel>About Us</SectionLabel>
          <h1 className="text-mega text-[var(--text-primary)] max-w-[14ch]">
            We <span className="display-thin text-[var(--text-secondary)]">build</span>{" "}
            <span className="text-gradient">AI</span>
            <br />
            that ships.
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[58ch]">
            We&apos;re an AI solutions agency built on one belief: technology
            should work for your business — not the other way around.
          </p>
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* Founder Section */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-36 overflow-hidden">
        <div
          aria-hidden
          className="absolute -z-10 glow-teal"
          style={{ width: 600, height: 600, right: "-15%", top: "10%", opacity: 0.4 }}
        />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <Reveal className="w-full lg:w-auto">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-[480/520] rounded-2xl border border-[var(--border-strong)] overflow-hidden accent-shadow lg:flex-shrink-0">
              <Image
                src="/images/founder.webp"
                alt="Ernesto, founder of MueveOps"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute bottom-5 left-5 px-3 py-1.5 rounded-full text-eyebrow tabular bg-[var(--bg)]/70 backdrop-blur-md border border-[var(--border-strong)] text-[var(--accent)]"
              >
                ◉ FOUNDER · ERNESTO
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:flex-1">
            <div className="flex flex-col gap-8 max-w-[58ch]">
              <SectionLabel>The Founder</SectionLabel>
              <h2 className="text-display-1 text-[var(--text-primary)]">
                Built by someone
                <br />
                who actually <span className="text-gradient">builds.</span>
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)]">
                MueveOps was founded by Ernesto — an AI specialist who builds,
                deploys, and maintains real AI systems for businesses. No
                theory. No buzzwords. Just working solutions that deliver
                measurable results.
              </p>
              <p className="text-display-3 text-[var(--text-primary)] border-l-2 border-[var(--accent)] pl-6">
                Based in Sweden. Serving clients globally.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div aria-hidden className="divider-sweep" />

      {/* Values Section */}
      <section className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-36 flex flex-col gap-14 lg:gap-20 overflow-hidden bg-[var(--bg-elev)]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-25" />

        <Reveal>
          <div className="flex flex-col gap-5 max-w-[820px]">
            <SectionLabel>Our Method</SectionLabel>
            <h2 className="text-display-1 text-[var(--text-primary)]">
              Three rules
              <br />
              we <span className="text-gradient">never break.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, i) => {
            const color = accent(i);
            return (
              <Reveal key={v.title} delay={i * 120}>
                <div className="card-lift relative h-full flex flex-col gap-6 p-9 lg:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
                  <span
                    className="font-heading tabular text-display-1 font-black leading-[0.85]"
                    style={{ color }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="text-display-3 text-[var(--text-primary)]">
                    {v.title}
                  </h3>
                  <p className="text-body-lg text-[var(--text-secondary)]">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection
        heading="Let's build something together."
        primaryLabel="Book a free call"
        primaryHref="/contact"
        primaryAsBookCall
      />

      <Footer />
    </div>
  );
}
