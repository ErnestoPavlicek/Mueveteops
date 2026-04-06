"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "AI Audit", href: "/ai-audit" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Reset menu when route changes — derive during render instead of effect
  // to avoid cascading-render lint warning. https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <div className="h-[64px] lg:h-[72px]" aria-hidden />
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-16 h-[64px] lg:h-[72px] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200 ${
          scrolled || menuOpen
            ? "bg-[var(--bg)]/70 backdrop-blur-md border-b border-[var(--divider)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-[var(--bg)] border-b border-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-heading text-xl font-bold text-[var(--text-primary)]"
        >
          MueveOps
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base transition-colors min-h-11 inline-flex items-center ${
                pathname === link.href
                  ? "text-[var(--accent)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ai-audit"
            className="bg-[var(--accent)] text-[var(--bg)] font-semibold text-base px-5 min-h-11 inline-flex items-center rounded-lg hover:opacity-90 transition-opacity"
          >
            Free AI Audit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-[var(--text-primary)]"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="19" x2="21" y2="19" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden fixed inset-x-0 top-[64px] bottom-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--divider)] flex flex-col px-5 py-6 gap-1 overflow-y-auto"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`min-h-12 inline-flex items-center text-lg border-b border-[var(--divider)] ${
                pathname === link.href
                  ? "text-[var(--accent)] font-semibold"
                  : "text-[var(--text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ai-audit"
            className="mt-6 bg-[var(--accent)] text-[var(--bg)] font-semibold text-base px-5 min-h-12 inline-flex items-center justify-center rounded-lg"
          >
            Free AI Audit
          </Link>
        </div>
      )}
    </>
  );
}
