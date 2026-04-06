"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PopupModal } from "react-calendly";

const CALENDLY_URL = "https://calendly.com/ernst-mueveops/30min";

type BookCallButtonProps = {
  text: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function BookCallButton({ text, className, ariaLabel }: BookCallButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // PopupModal needs document.getElementById("root") at render time, which only
  // exists on the client. Defer mounting the modal until after hydration.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {text}
      </button>
      {mounted && (
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
