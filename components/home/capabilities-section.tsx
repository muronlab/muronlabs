import { capabilityGroups } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Per-division accent palette. Classes are written as full literals so Tailwind
 * detects them at build time (dynamic concatenation would be purged).
 */
const accents: Record<string, { dot: string; index: string; label: string; title: string; rule: string }> = {
  "muron-dev": {
    dot: "bg-violet-500",
    index: "text-violet-500",
    label: "text-violet-600",
    title: "group-hover/cap:text-violet-600",
    rule: "group-hover/cap:bg-violet-500",
  },
  "muron-ai": {
    dot: "bg-blue-500",
    index: "text-blue-500",
    label: "text-blue-600",
    title: "group-hover/cap:text-blue-600",
    rule: "group-hover/cap:bg-blue-500",
  },
  "muron-arts": {
    dot: "bg-rose-500",
    index: "text-rose-500",
    label: "text-rose-500",
    title: "group-hover/cap:text-rose-500",
    rule: "group-hover/cap:bg-rose-500",
  },
};

const fallbackAccent = accents["muron-dev"];

/**
 * Deep-dive capabilities — the specialised engineering matrix. Unlike the
 * Ecosystem section (which introduces the divisions), this is an outcome index:
 * each division marker sticks on the left while its capabilities, each paired
 * with the result we engineer toward, scroll alongside.
 */
export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-24 border-t border-border bg-foreground/2 px-6 py-24 md:px-10 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="What our squads can solve."
          description="A clear index of the problems each division takes on — and the outcomes we engineer toward."
        />

        <div className="mt-16 divide-y divide-border border-t border-border">
          {capabilityGroups.map((group, groupIndex) => {
            const accent = accents[group.divisionId] ?? fallbackAccent;
            const index = String(groupIndex + 1).padStart(2, "0");

            return (
              <Reveal
                key={group.divisionId}
                delay={groupIndex * 0.06}
                className="grid gap-8 py-12 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-16"
              >
                {/* Division marker — sticks while its capabilities scroll */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <span className={cn("font-mono text-5xl font-bold tabular-nums", accent.index)}>{index}</span>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className={cn("size-2 rounded-full", accent.dot)} />
                    <h3 className={cn("font-mono text-sm font-medium uppercase tracking-[0.15em]", accent.label)}>
                      {group.division}
                    </h3>
                  </div>
                  <p className="mt-2 pl-4.5 font-mono text-xs text-muted-foreground">
                    {String(group.items.length).padStart(2, "0")} capabilities
                  </p>
                </div>

                {/* Capability → outcome detail */}
                <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
                  {group.items.map((item, i) => (
                    <div key={item.capability} className="group/cap flex gap-4">
                      <span
                        className={cn(
                          "mt-1.5 h-9 w-px shrink-0 bg-border transition-colors duration-300",
                          accent.rule,
                        )}
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="flex items-baseline gap-2.5">
                          <span className={cn("font-mono text-xs font-medium tabular-nums", accent.index)}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-base font-bold tracking-tight text-foreground transition-colors duration-300 lg:text-lg",
                              accent.title,
                            )}
                          >
                            {item.capability}
                          </span>
                        </dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.outcome}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
