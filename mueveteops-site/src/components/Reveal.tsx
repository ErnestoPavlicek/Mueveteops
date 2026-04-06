"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal primitive. Wraps children in a div that starts
 * hidden (via the `.reveal` class in globals.css) and fades +
 * rises into place on first viewport intersection. One-shot —
 * the observer disconnects after firing.
 *
 * Stagger groups of items by passing incremental `delay` values
 * (e.g. index * 80). Respects prefers-reduced-motion by showing
 * content immediately.
 */

type RevealProps = {
  children: ReactNode;
  /** Delay in ms before the transition starts. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Viewport intersection threshold (0–1). Default 0.15. */
  threshold?: number;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const mergedStyle = {
    ...style,
    ["--reveal-delay" as string]: `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}
