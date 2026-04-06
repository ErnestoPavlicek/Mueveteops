import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The site's only button component. Single source of truth for variants,
 * sizes, rounding, weight, and motion. If you find yourself reaching for a
 * one-off styled <a> or <button>, add a new variant here instead.
 */

type Variant = "primary" | "outline" | "outline-soft" | "outline-accent";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "btn-shimmer bg-[var(--accent)] text-[var(--bg)] hover:opacity-95 shadow-[0_18px_48px_-16px_var(--accent-glow),0_0_0_1px_var(--accent)]",
  outline:
    "border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-white/[0.08] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  "outline-soft":
    "border-2 border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-white/[0.05] hover:border-[var(--text-primary)]",
  "outline-accent":
    "border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-muted)] shadow-[0_0_0_4px_rgba(11,255,194,0.0)] hover:shadow-[0_0_0_4px_var(--accent-muted)]",
};

// Every size owns its own min-height so all buttons clear the 44px touch
// target without relying on padding math — the layout model is identical
// across sizes, so consumers never reach into className for inline-flex/gap.
const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-5 min-h-11",
  md: "px-7 min-h-12",
  lg: "px-8 min-h-14",
};

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-bold text-base tracking-tight select-none " +
  "transition-[background-color,border-color,color,opacity,transform,box-shadow] duration-200 ease-out " +
  "active:scale-[0.97] motion-reduce:transform-none " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

function classes(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  className?: string
) {
  return [
    BASE,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
  ariaBusy?: never;
  ariaLabel?: never;
};

type ActionButtonProps = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaBusy?: boolean;
  ariaLabel?: string;
};

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    children,
  } = props;

  const cls = classes(variant, size, fullWidth, className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-busy={props.ariaBusy}
      aria-label={props.ariaLabel}
      className={cls}
    >
      {children}
    </button>
  );
}
