export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-eyebrow inline-flex items-center gap-3 text-[var(--accent)]">
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 16px var(--accent-glow)",
        }}
      />
      <span
        aria-hidden
        className="inline-block h-[2px] w-10 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      {children}
    </span>
  );
}
