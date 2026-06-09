const items = [
  "Scalable Architecture",
  "Agentic Automation",
  "Design Systems",
  "Performance Engineering",
  "Cloud-Native",
  "Security-First",
  "Intelligent Search",
  "API Design",
  "Motion & Interaction",
  "Brand Identity",
  "Accessibility",
  "Best-Fit Stack",
];

/**
 * Auto-scrolling ticker of the studio's capabilities and approach — framed
 * around outcomes, not a fixed toolchain. Pure CSS marquee; the list is
 * duplicated for a seamless loop and pauses for reduced motion.
 */
export function CapabilityTicker() {
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-background py-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm uppercase tracking-wide text-muted-foreground">
            {item}
            <span className="text-brand">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
