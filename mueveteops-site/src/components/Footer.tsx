import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-strong)] bg-[var(--bg-elev)] overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
      <div
        aria-hidden
        className="absolute glow-purple"
        style={{ width: 500, height: 500, right: "-15%", top: "-40%", opacity: 0.25 }}
      />

      {/* Mega wordmark */}
      <div className="relative px-5 sm:px-8 lg:px-16 pt-16 lg:pt-24">
        <h2
          aria-hidden
          className="font-heading font-black tracking-[-0.05em] leading-[0.8] select-none"
          style={{
            fontSize: "clamp(4rem, 18vw, 16rem)",
          }}
        >
          <span className="text-[var(--text-primary)]">Mueve</span>
          <span className="text-gradient">Ops.</span>
        </h2>
      </div>

      <div className="relative px-5 sm:px-8 lg:px-16 py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-eyebrow text-[var(--accent)]">▸ Studio</span>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[36ch]">
            AI solutions that move your business forward. Built and maintained
            by humans who actually ship.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-eyebrow text-[var(--accent-2)]">▸ Navigation</span>
          <div className="flex flex-col gap-3">
            {["Services", "AI Audit", "Strategy", "About", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                className="text-display-3 font-heading text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors w-fit"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-eyebrow text-[var(--accent-3)]">▸ Contact</span>
          <a
            href="mailto:ernst@mueveops.com"
            className="text-display-3 font-heading text-gradient hover:opacity-80 transition-opacity w-fit"
          >
            ernst@mueveops.com
          </a>
          <p className="text-body-lg text-[var(--text-secondary)]">
            Stockholm, Sweden — Serving clients globally
          </p>
        </div>
      </div>

      <div className="relative border-t border-[var(--border)] px-5 sm:px-8 lg:px-16 py-6 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center sm:justify-between">
        <span className="text-eyebrow text-[var(--text-tertiary)]">
          © 2026 MUEVEOPS · ALL RIGHTS RESERVED
        </span>
        <span className="text-eyebrow text-[var(--text-tertiary)]">
          ◉ STATUS · ALL SYSTEMS OPERATIONAL
        </span>
      </div>
    </footer>
  );
}
