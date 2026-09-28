"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { testimonials, type Testimonial } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Card surfaces — the same family as the hero and "Why Muronlabs" cards. */
const tones: Record<Testimonial["tone"], { card: string; quote: string; meta: string; mark: string; orb: string }> = {
  ink: {
    card: "bg-ink text-white",
    quote: "text-white",
    meta: "text-white/60",
    mark: "text-brand",
    orb: "linear-gradient(150deg, #5c9376, #70b494 60%, #c8b186)",
  },
  green: {
    card: "bg-brand text-ink",
    quote: "text-ink",
    meta: "text-ink/65",
    mark: "text-white",
    orb: "linear-gradient(150deg, #242422, #3f4a45 60%, #5c9376)",
  },
  peach: {
    card: "border border-hairline bg-card text-ink",
    quote: "text-ink",
    meta: "text-muted-foreground",
    mark: "text-hairline",
    orb: "linear-gradient(150deg, #d6a187, #cda585 55%, #70b494)",
  },
  pink: {
    card: "bg-pink text-ink",
    quote: "text-ink",
    meta: "text-ink/65",
    mark: "text-white",
    orb: "linear-gradient(150deg, #e38b95, #d6a187 60%, #f5a6af)",
  },
};

/** Matches the page shell gutter so the first card lines up with the heading. */
const GUTTER = "clamp(1.25rem, 5vw, 5rem)";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 12" fill="none" aria-hidden="true" className={cn("h-3 w-5", flip && "rotate-180")}>
      <path d="M0 6h22m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  const tone = tones[t.tone];
  return (
    <figure
      className={cn(
        "flex h-full min-h-[26rem] flex-col justify-between gap-10 rounded-xl p-8 lg:min-h-[30rem] lg:p-10",
        tone.card,
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-6">
          <span aria-hidden="true" className={cn("font-sans text-[6rem] leading-[0.7] font-light", tone.mark)}>
            “
          </span>
          <span className={cn("pt-1 text-sm font-medium tracking-[2px] uppercase", tone.meta)}>
            /{String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <blockquote className={cn("mt-6 font-display text-[1.375rem] leading-[1.35] font-normal lg:text-[1.625rem]", tone.quote)}>
          {t.quote}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full font-display text-lg text-white"
          style={{ background: tone.orb }}
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-medium">{t.name}</span>
          <span className={cn("block text-sm", tone.meta)}>
            {t.role} · {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Client testimonials — a snap-scrolling row of tone cards under the standard
 * section heading, with round outlined arrows and a hairline progress bar.
 */
export function TestimonialsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(0.5);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setVisible(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 30), behavior: "smooth" });
  };

  const atStart = progress < 0.01;
  const atEnd = progress > 0.99;
  const arrowBtn =
    "flex size-[3.25rem] cursor-pointer items-center justify-center rounded-full border border-hairline text-ink transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-white disabled:cursor-default disabled:opacity-40";

  return (
    <section aria-labelledby="testimonials-heading" className="relative z-[1] overflow-hidden bg-paper py-24 lg:py-36">
      <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="What our clients say"
          title="Trusted by teams who ship."
          description="Founders, product leads and engineers on working with one studio across design, engineering and AI."
        />
        <Reveal delay={0.12} className="flex shrink-0 gap-3">
          <button type="button" aria-label="Previous testimonial" onClick={() => step(-1)} disabled={atStart} className={arrowBtn}>
            <Arrow flip />
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => step(1)} disabled={atEnd} className={arrowBtn}>
            <Arrow />
          </button>
        </Reveal>
      </div>

      <ul
        ref={trackRef}
        style={{ paddingInline: GUTTER, scrollPaddingInline: GUTTER }}
        className="group/cards mt-14 flex snap-x snap-mandatory gap-[1.875rem] overflow-x-auto scroll-smooth [scrollbar-width:none] lg:mt-20 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <li
            key={i}
            className="w-[85%] shrink-0 snap-start transition-opacity duration-500 group-hover/cards:opacity-75 hover:!opacity-100 sm:w-[60%] lg:w-[calc((100%-2*1.875rem)/2.6)] lg:max-w-[34rem]"
          >
            <Reveal delay={i * 0.06} className="h-full">
              <Card t={t} i={i} />
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Hairline progress */}
      <div className="shell mt-12">
        <div className="relative h-px bg-hairline">
          <div
            className="absolute inset-y-0 bg-ink transition-[left] duration-300"
            style={{ width: `${visible * 100}%`, left: `${progress * (1 - visible) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
