import { divisions } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * The Core Ecosystem — three editorial cards introducing the specialist
 * sub-brands (Muron Dev, Muron AI, Muron Arts). Driven by `divisions` in
 * site-config so copy lives in one place.
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

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
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
              <h3 className={cn("text-2xl font-bold tracking-tight lg:text-3xl", division.gradient ?? "text-foreground")}>
                {division.name}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                {division.tagline}
              </p>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
