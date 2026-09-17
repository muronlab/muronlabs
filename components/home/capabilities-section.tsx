import { capabilityGroups } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";
import { CapabilitiesField } from "./capabilities-field";
import { DivisionGlyph } from "./division-glyphs";

/**
 * Per-division accent palette. Classes are written as full literals so Tailwind
 * detects them at build time (dynamic concatenation would be purged).
 */
const accents: Record<
  string,
  { dot: string; index: string; label: string; title: string; rule: string; glyph: string }
> = {
  "muron-dev": {
    dot: "bg-violet-500",
    index: "text-violet-500",
    label: "text-violet-600",
    title: "group-hover/cap:text-violet-600",
    rule: "group-hover/cap:bg-violet-500",
    glyph: "text-violet-500/35",
  },
  "muron-ai": {
    dot: "bg-blue-500",
    index: "text-blue-500",
    label: "text-blue-600",
    title: "group-hover/cap:text-blue-600",
    rule: "group-hover/cap:bg-blue-500",
    glyph: "text-blue-500/35",
  },
  "muron-arts": {
    dot: "bg-rose-500",
    index: "text-rose-500",
    label: "text-rose-500",
    title: "group-hover/cap:text-rose-500",
    rule: "group-hover/cap:bg-rose-500",
    glyph: "text-rose-500/35",
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
                    <FlickerText
                      as="h3"
                      text={group.division}
                      variant="tube"
                      inline
                      className={cn("font-mono text-sm font-medium uppercase tracking-[0.15em]", accent.label)}
                    />
                  </div>
                  <DivisionGlyph
                    index={groupIndex}
                    className={cn("mt-10 hidden max-w-[210px] lg:block", accent.glyph)}
                  />
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
                          <FlickerText
                            as="p"
                            text={item.capability}
                            delay={i * 0.06}
                            inline
                            className={cn(
                              "text-lg font-bold tracking-tight text-foreground transition-colors duration-300 lg:text-xl",
                              accent.title,
                            )}
                          />
                        </dt>
                        <dd className="mt-1.5 text-base leading-relaxed text-muted-foreground">{item.outcome}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>
            );
          })}
        </div>

        {/* Closing band — turns the index above into an invitation. The copy and
            the particle field never share space: the field is a block above the
            text on phones and takes the right half from md up, with a gradient
            that dissolves its near edge into the panel. `dark` flips the design
            tokens locally, the way the closing CTA does. */}
        <Reveal className="mt-16 overflow-hidden rounded-3xl border border-border">
          <div className="dark relative bg-[#05060a]">
            <div className="relative h-56 sm:h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[46%]">
              <CapabilitiesField />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#05060a_2%,transparent_65%)] md:bg-[linear-gradient(to_right,#05060a_4%,transparent_60%)]"
              />
            </div>

            <div className="relative px-6 pb-12 pt-10 sm:px-10 md:w-[58%] md:py-20 lg:px-14 lg:py-24">
              <FlickerText
                as="p"
                text="[ Bring us the hard part ]"
                variant="tube"
                inline
                className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand"
              />

              <FlickerText
                as="h3"
                text="You bring the idea. We bring the specialists."
                pace="primary"
                delay={0.12}
                className="mt-5 max-w-xl text-balance text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-foreground sm:text-3xl lg:text-4xl"
              />

              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Tell us what you are building. We will put the division that does it full time on it.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
