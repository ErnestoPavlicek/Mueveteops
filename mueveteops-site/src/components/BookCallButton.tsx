"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import { Button } from "./ui/Button";

const CALENDLY_URL = "https://calendly.com/ernst-mueveops/30min";

// PopupModal touches `document` at render time, so it must only run on the
// client. Dynamic import with ssr: false skips it during SSR and avoids the
// "set state in effect" hydration dance entirely.
const PopupModal = dynamic(
  () => import("react-calendly").then((m) => m.PopupModal),
  { ssr: false }
);

type BookCallButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-soft" | "outline-accent";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Opens the Calendly booking modal. Composes the design system Button —
 * accepts the same variant/size props instead of raw className overrides
 * so it stays in the system.
 */
export function BookCallButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  ariaLabel,
}: BookCallButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        ariaLabel={ariaLabel}
      >
        {children}
      </Button>
      {isOpen && (
        <PopupModal
          url={CALENDLY_URL}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
          rootElement={document.getElementById("root") as HTMLElement}
        />
      )}
    </>
  );
}
