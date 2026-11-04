"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs, homeCopy } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Common questions — a sticky heading on the left and a stack of white cards
 * on the right. One question opens at a time; the plus turns into a minus and
 * the answer expands with a height + fade (static under reduced motion).
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const { faq } = homeCopy;

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-heading" align="left" compact eyebrow={faq.eyebrow} title={faq.title} description={faq.intro} />
        </div>

        <ul className="flex flex-col gap-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-trigger-${i}`;

            return (
              <Reveal as="li" key={item.question} delay={Math.min(i, 4) * 0.05} className="sheet">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-6 text-left"
                  >
                    <span className="text-[16px] font-medium text-ink">{item.question}</span>
                    <motion.span
                      aria-hidden="true"
                      className="relative flex size-6 shrink-0 items-center justify-center text-ink"
                      animate={{ rotate: isOpen && !reduceMotion ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <span className="absolute h-px w-4 bg-current" />
                      <span className={cn("absolute h-4 w-px bg-current transition-transform duration-300", isOpen ? "scale-y-0" : "scale-y-100")} />
                    </motion.span>
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        className="max-w-[40rem] px-6 pb-7 text-[15px] leading-6 text-muted-foreground"
                        initial={reduceMotion ? false : { y: 12 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
