import { divisions } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { EcosystemCore, coreColors } from "./ecosystem-core";
import { FlickerText } from "@/components/ui/flicker-text";

/**
 * The Core Ecosystem — an interactive plasma core above three editorial cards
 * introducing the specialist sub-brands (Muron Dev, Muron AI, Muron Arts).
 * Driven by `divisions` in site-config so copy lives in one place.
 */
export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
      className="scroll-mt-24 border-t border-border px-6 py-24 md:px-10 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="01"
          eyebrow="The Ecosystem"
          title="Three specialist divisions. One coordinated roof."
          description="Modern software requires specialised squads. Each Muronlabs division owns a discipline outright — and they ship as one connected team."
        />

        {/* Core + divisions read as a single object: one border, one radius. */}
        <Reveal className="mt-16 overflow-hidden rounded-3xl border border-border">
          {/* ── The core ─────────────────────────────────────────────── */}
          <div className="relative h-[360px] border-b border-border bg-[#05060a] sm:h-[440px] lg:h-[560px]">
            <EcosystemCore />

            {/* Vignette: settles the canvas into the panel edges. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent_30%,rgba(5,6,10,0.92)_100%)]"
            />

            {/* Overlay chrome — never intercepts the drag-to-orbit pointer. */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 lg:p-9">
              <div className="flex items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                <FlickerText as="p" text="[ The Core ]" variant="tube" inline />
                <FlickerText
                  as="p"
                  text="Drag to orbit ⟲"
                  variant="tube"
                  delay={0.35}
                  className="hidden sm:inline-block"
                />
              </div>

              <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                <FlickerText
                  as="p"
                  text="One shared core. Three disciplines in orbit."
                  pace="primary"
                  delay={0.15}
                  className="max-w-md text-balance text-lg font-semibold leading-snug text-white/90 lg:text-2xl"
                />

                <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
                  {divisions.map((division, i) => (
                    <li
                      key={division.id}
                      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full"
                        style={{
                          backgroundColor: coreColors[i % coreColors.length],
                          boxShadow: `0 0 10px ${coreColors[i % coreColors.length]}`,
                        }}
                      />
                      <FlickerText
                        as="p"
                        text={division.name}
                        variant="tube"
                        delay={0.45 + i * 0.12}
                        inline
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── The divisions ────────────────────────────────────────── */}
          <div className="grid gap-px bg-border md:grid-cols-3">
            {divisions.map((division, i) => (
              <Reveal
                key={division.id}
                as="article"
                delay={i * 0.08}
                className="group relative flex flex-col gap-5 bg-background p-8 transition-colors duration-300 hover:bg-foreground/2 lg:p-10"
              >
                {/* Oversized faded index watermark */}
                <span className="pointer-events-none absolute right-6 top-6 font-mono text-5xl font-bold text-foreground/6 transition-colors duration-300 group-hover:text-brand/20 lg:text-6xl">
                  {division.index}
                </span>

                <span className="font-mono text-sm text-brand">
                  [{division.index}]
                </span>
                <FlickerText
                  as="h3"
                  text={division.name}
                  gradient={division.gradientStops}
                  variant="tube"
                  delay={i * 0.08}
                  onHover
                  className={cn(
                    "text-2xl font-bold tracking-tight lg:text-3xl",
                    division.gradientStops ? undefined : "text-foreground",
                  )}
                />
                <FlickerText
                  as="p"
                  text={division.tagline}
                  variant="tube"
                  delay={0.2 + i * 0.08}
                  className="text-sm font-semibold uppercase tracking-wide text-foreground/70"
                />
                <p className="text-base leading-relaxed text-muted-foreground">
                  {division.body}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                  {division.focus.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:border-foreground/20"
                    >
                      {area}
                    </li>
                  ))}
                </ul>

                {/* Full-width accent bar matching the division's title colour */}
                <span
                  aria-hidden="true"
                  className={cn("absolute inset-x-0 bottom-0 h-4", division.accent)}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
