"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "AI Audit", href: "/ai-audit" },
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
      <div className="h-[72px] lg:h-[84px]" aria-hidden />
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-16 h-[72px] lg:h-[84px] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-200 ${
          scrolled || menuOpen
            ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border-strong)] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
        >
          <span
            aria-hidden
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 24px var(--accent-glow)" }}
          />
          <span className="font-heading text-2xl font-black tracking-[-0.02em] text-[var(--text-primary)]">
            mueve<span className="text-[var(--accent)]">ops</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active ? "true" : "false"}
                className={`nav-underline text-eyebrow min-h-11 inline-flex items-center transition-colors ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/ai-audit" variant="primary" size="sm">
            Free AI Audit →
          </Button>
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
          className="animate-sheet-in lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border-strong)] flex flex-col px-5 py-8 gap-1 overflow-y-auto"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`animate-rise-in min-h-14 inline-flex items-center text-2xl font-heading font-bold border-b border-[var(--divider)] ${
                pathname === link.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              }`}
              style={
                {
                  "--rise-delay": `${80 + i * 60}ms`,
                } as React.CSSProperties & Record<`--${string}`, string>
              }
            >
              {link.label}
            </Link>
          ))}
          <div
            className="animate-rise-in mt-8"
            style={
              {
                "--rise-delay": `${80 + navLinks.length * 60}ms`,
              } as React.CSSProperties & Record<`--${string}`, string>
            }
          >
            <Button
              href="/ai-audit"
              variant="primary"
              size="md"
              fullWidth
              className="min-h-12"
            >
              Free AI Audit →
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
