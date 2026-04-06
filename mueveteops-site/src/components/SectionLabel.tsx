export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-eyebrow inline-flex items-center gap-3 text-[var(--accent-2)]">
      <span
        aria-hidden
        className="inline-block h-[2px] w-6 rounded-full bg-[var(--accent-2)]"
      />
      {children}
    </span>
  );
}
