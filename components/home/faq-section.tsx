"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs, primaryCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { PillButton } from "@/components/ui/pill-button";

/**
 * Common questions — a custom single-open accordion. The active row lifts with
 * a brand accent rule, an oversized index and a morphing plus/minus glyph, while
 * the answer expands with a height + fade transition. Mirrors the page's
 * border-led, monospace-eyebrow design language; reduced motion shows answers
 * without the height animation.
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-t border-border px-6 py-24 md:px-10 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
        {/* Sticky brief */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            index="05"
            eyebrow="FAQ"
            title="Questions, answered."
            description="The things teams ask us most, before the first call."
          />
          <div className="mt-8 hidden lg:block">
            <PillButton href={primaryCta.href} variant="outline" arrow>
              Still curious? Talk to us
            </PillButton>
          </div>
        </div>

        {/* Accordion */}
        <ul className="divide-y divide-border border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-trigger-${i}`;

            return (
              <li key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start gap-5 py-6 text-left lg:gap-8 lg:py-7"
                  >
                    <span
                      className={cn(
                        "font-mono text-sm font-medium tabular-nums tracking-wide transition-colors duration-300",
                        isOpen ? "text-brand" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-lg font-bold tracking-tight transition-colors duration-300 lg:text-xl",
                        isOpen ? "text-brand" : "text-foreground group-hover:text-brand",
                      )}
                    >
                      {faq.question}
                    </span>
                    {/* Morphing plus / minus glyph */}
                    <span className="relative mt-1 size-4 shrink-0" aria-hidden="true">
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current text-foreground" />
                      <span
                        className={cn(
                          "absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current text-brand transition-transform duration-300",
                          isOpen ? "scale-y-0" : "scale-y-100",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl border-l-2 border-brand pb-7 pl-5 text-base leading-relaxed text-muted-foreground lg:ml-[3.25rem]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}

          {/* Mobile CTA (the sticky one is hidden on small screens) */}
          <li className="pt-8 lg:hidden">
            <PillButton href={primaryCta.href} variant="outline" arrow>
              Still curious? Talk to us
            </PillButton>
          </li>
        </ul>
      </div>
    </section>
  );
}
