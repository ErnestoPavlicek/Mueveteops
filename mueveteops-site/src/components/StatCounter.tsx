"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Count-up for metrics. Starts at 0 and animates to `value` when
 * the element enters the viewport, using ease-out-quart to match
 * the rest of the motion system. Once only — does not re-run.
 *
 * Suffix (`h`, `x`, `%`) is rendered as-is after the integer so
 * the surrounding type token (tabular + display) owns the styling.
 * Respects prefers-reduced-motion by jumping to the final value.
 */

type StatCounterProps = {
  value: number;
  suffix?: string;
  /** Total duration in ms. Default 1400. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
};

export function StatCounter({
  value,
  suffix = "",
  duration = 1400,
  className,
  style,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  // Lazy initializer: users with reduced motion skip the count-up
  // entirely and see the final value on first paint. Avoids an
  // effect-driven setState for the reduced-motion branch.
  const [display, setDisplay] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? value
      : 0;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();

            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // ease-out-quart — matches the motion system curve
              const eased = 1 - Math.pow(1 - t, 4);
              setDisplay(value * eased);
              if (t < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(value);
              }
            };

            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {Math.round(display)}
      {suffix}
    </span>
  );
}
