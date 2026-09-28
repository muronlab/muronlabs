"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FlowGradient } from "@/components/visuals/flow-gradient";
import { LiquidButton } from "@/components/ui/liquid-button";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { Reveal } from "@/components/ui/reveal";
import { divisions, homeCopy, primaryCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const cardTone = [
  "border border-white/40 bg-white/10 backdrop-blur-[2px] lg:w-[40%]",
  "bg-ink lg:w-[35%]",
  "bg-brand lg:w-[25%]",
];

/**
 * Homepage opening: hero + "What is Muronlabs?". Both sit over one fixed
 * flow-gradient layer, clipped to this wrapper so it never leaks into the grey
 * sections below. The layer first opens from a small rounded slot, then —
 * once open — scroll drives it the last few pixels out to full bleed.
 */
export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [opened, setOpened] = useState(false);
  const isOpen = opened || !!reduceMotion;

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const clipPath = useTransform(scrollYProgress, (p) => {
    const k = 1 - Math.min(1, p * 1.4);
    return `inset(${k}% ${k * 0.5}% ${k}% ${k * 0.5}% round ${k * 20}px)`;
  });

  const [lineOne, lineTwo] = homeCopy.heroLines;

  return (
    <div data-flow-root className="relative" style={{ clipPath: "inset(0)" }}>
      {/* The fixed gradient layer */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className={cn("absolute inset-0", !isOpen && "flow-window")}
          style={isOpen ? { clipPath } : undefined}
          onAnimationEnd={(e) => e.target === e.currentTarget && setOpened(true)}
        >
          <FlowGradient mode="liquid" resolution={0.4} />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </div>

      {/* Hero */}
      <section ref={heroRef} aria-label="Introduction" className="relative z-10 flex min-h-svh flex-col">
        <motion.div
          className="shell flex flex-1 flex-col justify-center pt-32 pb-12 lg:pt-28 lg:pb-16"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="sr-only">
            {lineOne} {lineTwo} — {homeCopy.heroLead}
          </h1>

          {/* Desktop: the two headline lines interlock with the lead and CTA. */}
          <div className="mb-14 hidden flex-col items-center lg:flex xl:mb-[4.5rem]">
            <div className="flex items-center">
              <span aria-hidden="true" className="font-display text-[7.5rem] leading-none font-medium whitespace-nowrap text-white">
                {lineOne}
              </span>
              <p aria-hidden="true" className="mt-5 ml-6 w-[21rem] font-display text-xl leading-[1.2] text-white">{homeCopy.heroLead}</p>
            </div>
            <div className="-mt-3 flex items-center">
              <div className="mr-8">
                <LiquidButton href={primaryCta.href} tone="light" bead="always">
                  Start a project
                </LiquidButton>
              </div>
              <span aria-hidden="true" className="font-display text-[7.5rem] leading-none font-medium whitespace-nowrap text-white">
                {lineTwo}
              </span>
            </div>
          </div>

          {/* Small screens: stacked */}
          <div className="mb-10 flex flex-col items-start gap-6 lg:hidden">
            <p aria-hidden="true" className="font-display text-[3.75rem] leading-[0.95] font-medium text-white sm:text-[5.375rem]">
              {lineOne} {lineTwo}
            </p>
            <p className="max-w-md font-display text-2xl leading-[1.2] text-white">{homeCopy.heroLead}</p>
            <LiquidButton href={primaryCta.href} tone="light" bead="always">
              Start a project
            </LiquidButton>
          </div>

          {/* Division cards */}
          <ul className="group/cards flex flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
            {divisions.map((division, i) => {
              const top = (
                <div className="flex w-full items-start justify-between gap-4">
                  <span className="font-sans text-[4.5rem] leading-none font-light text-white md:text-[5.875rem]">
                    {division.mark}
                  </span>
                  {i === 2 ? null : (
                    <span className="pt-1 text-right font-display text-xl leading-[1.2] text-white/80">{division.name}</span>
                  )}
                </div>
              );
              const bottom = (
                <div>
                  <p className="mb-1.5 font-display text-[1.75rem] leading-[1.9rem] text-white">
                    /{division.index}
                    {i === 2 ? <span className="ml-3 text-xl text-white/80">{division.name}</span> : null}
                  </p>
                  <p className={cn("font-display font-medium text-white", i === 2 ? "w-full text-lg leading-6" : "w-[70%]")}>
                    {division.tagline}
                  </p>
                </div>
              );
              return (
                <li key={division.id} className={cn("w-full lg:min-h-[21rem]", cardTone[i])} style={{ borderRadius: "0.75rem" }}>
                  <Link
                    href={`/#${division.id}`}
                    className="flex h-full flex-col justify-between gap-[34px] p-8 pb-4 transition-opacity duration-300 group-hover/cards:opacity-70 hover:!opacity-100"
                  >
                    {i === 2 ? (
                      <>
                        {bottom}
                        {top}
                      </>
                    ) : (
                      <>
                        {top}
                        {bottom}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </section>

      {/* What is Muronlabs? — white copy over the still-pinned gradient. */}
      <section aria-labelledby="about-eyebrow" className="shell relative z-10 flex min-h-[70svh] flex-col items-start justify-center py-24 lg:min-h-svh">
        <Reveal>
          <h2 id="about-eyebrow" className="font-sans text-lg font-medium text-white/70 lg:text-2xl">
            {homeCopy.about.eyebrow}
          </h2>
        </Reveal>
        <ScrollRevealText
          text={homeCopy.about.body}
          baseOpacity={0.3}
          className="mt-3 font-display text-[1.375rem] leading-[1.25] text-white md:text-[1.75rem] lg:mt-4 lg:text-[2.625rem] lg:leading-[1.45]"
        />
        <ScrollRevealText
          text={homeCopy.about.close}
          baseOpacity={0.3}
          className="mt-4 font-display text-[1.375rem] leading-[1.25] text-white md:text-[1.75rem] lg:mt-10 lg:text-[2.625rem] lg:leading-[1.45]"
        />
      </section>
    </div>
  );
}
