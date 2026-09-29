"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { FlowGradient, type FlowPalette } from "@/components/visuals/flow-gradient";
import { GetInTouchButton } from "@/components/contact/contact-drawer";
import { LineBreaker } from "@/components/ui/line-breaker";
import { Reveal } from "@/components/ui/reveal";
import { divisions, homeCopy, type Division } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Corner treatment per column, left to right. */
const columnShape = ["rounded-l-[20px]", "rounded-bl-[60px]", "rounded-r-[20px] rounded-bl-[20px]"];

/** Each division gets its own living colour field: graphite, green, blush. */
const columnPalette: FlowPalette[] = ["dev", "ai", "arts"];

/** Vertical parallax travel per column, so the three drift against each other. */
const columnTravel: [string, string][] = [
  ["4%", "-10%"],
  ["-8%", "6%"],
  ["2%", "-12%"],
];

function Column({ division, i, progress }: { division: Division; i: number; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], columnTravel[i]);

  return (
    <div
      className={cn("relative h-full flex-1 overflow-hidden shadow-[1.5rem_0_2rem_rgb(0_0_0/0.11)]", columnShape[i])}
      style={{ zIndex: 3 - i }}
    >
      <motion.div className="absolute inset-x-0 -top-[10%] h-[120%] max-lg:!translate-y-0" style={{ y }}>
        <FlowGradient palette={columnPalette[i]} resolution={0.4} speed={0.8 + i * 0.15} />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 font-pixel text-3xl leading-none text-white md:bottom-6 md:left-6 md:text-5xl">
        {division.mark}
      </span>
    </div>
  );
}

/**
 * The three divisions as a sticky, three-column colour-field scroll. On desktop
 * the columns start full-screen, then compress into a right-hand panel as the
 * division copy scrolls in on the left. Below `lg` it degrades to a colour strip
 * above a normal column of copy.
 */
export function EcosystemSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const width = useTransform(scrollYProgress, [0, 0.24], ["100%", "45%"]);

  return (
    <section id="ecosystem" aria-labelledby="ecosystem-heading" className="relative z-[1] scroll-mt-24 bg-paper">
      <div ref={wrapRef} className="relative lg:h-[360vh]">
        <div className="relative h-[60vh] w-full overflow-hidden lg:sticky lg:top-0 lg:h-svh">
          <motion.div
            className="absolute inset-y-0 right-0 flex max-lg:!w-full lg:inset-y-[1vh] lg:right-[0.5vw]"
            style={{ width }}
          >
            {divisions.map((division, i) => (
              <Column key={division.id} division={division} i={i} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-[3] lg:-mt-[200vh] lg:min-h-svh lg:w-1/2">
        <div className="px-5 pt-16 pb-20 sm:px-10 lg:pt-[10vh] lg:pr-16 lg:pb-[12vh] lg:pl-[max(5rem,calc((100vw-90rem)/2+5rem))]">
          <Reveal>
            <h2 id="ecosystem-heading" className="mb-5 font-display text-2xl leading-[1.25] font-normal text-brand-deep">
              {homeCopy.ecosystem.title}
            </h2>
            <p className="max-w-xl text-base leading-6 text-muted-foreground">{homeCopy.ecosystem.intro}</p>
          </Reveal>

          <LineBreaker className="mt-8" />

          {divisions.map((division) => (
            <article key={division.id} id={division.id} className="scroll-mt-28">
              <Reveal className="py-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-base text-brand-deep">/{division.index}</span>
                  <h3 className="font-display text-[1.75rem] leading-tight font-medium text-ink">{division.name}</h3>
                </div>
                <p className="mt-2 text-base font-semibold text-muted-foreground">{division.tagline}</p>
                <p className="mt-4 text-base leading-6 text-muted-foreground">{division.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {division.focus.map((area) => (
                    <li key={area} className="rounded-full border border-hairline px-3 py-1 text-sm text-muted-foreground">
                      {area}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <LineBreaker />
            </article>
          ))}

          <div className="mt-10">
            <GetInTouchButton tone="outline">Get in touch</GetInTouchButton>
          </div>
        </div>
      </div>
    </section>
  );
}
