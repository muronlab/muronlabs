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
 * Oversized, slow marquee of the studio's capabilities — framed around
 * outcomes, not a fixed toolchain. Pure CSS; the list is duplicated for a
 * seamless loop and stops for reduced motion.
 */
export function CapabilityTicker() {
  return (
    <div className="relative z-[1] flex overflow-hidden border-y border-hairline bg-paper py-8 md:py-10">
      <p className="sr-only">Capabilities: {items.join(", ")}.</p>
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 [animation-duration:60s]" aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-4xl leading-none font-medium whitespace-nowrap text-ink md:text-6xl"
          >
            {item}
            <span className={i % 3 === 1 ? "size-3 rounded-full bg-pink md:size-4" : "size-3 rounded-full bg-brand md:size-4"} />
          </span>
        ))}
      </div>
    </div>
  );
}
