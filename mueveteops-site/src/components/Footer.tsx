import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--divider)]">
      <div className="px-5 sm:px-8 lg:px-16 py-10 lg:py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
        <div>
          <p className="text-heading text-[var(--text-primary)] mb-3">
            MueveOps
          </p>
          <p className="text-body-lg text-[var(--text-secondary)]">
            AI solutions that move your business forward.
          </p>
        </div>
        <div>
          <p className="text-eyebrow text-[var(--text-secondary)] mb-4">
            Navigation
          </p>
          <div className="flex flex-col gap-3">
            {["Services", "AI Audit", "Case Studies", "About", "Contact"].map(
              (link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link}
                </Link>
              )
            )}
          </div>
        </div>
        <div>
          <p className="text-eyebrow text-[var(--text-secondary)] mb-4">
            Contact
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:ernst@mueveops.com"
              className="text-body text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              ernst@mueveops.com
            </a>
            <p className="text-body text-[var(--text-secondary)]">
              Stockholm, Sweden
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--divider)] px-5 sm:px-8 lg:px-16 py-5">
        <span className="text-meta text-[var(--text-secondary)]">
          © 2026 MueveOps. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
