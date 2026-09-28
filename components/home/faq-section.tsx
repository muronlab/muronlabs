"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { GetInTouchButton } from "@/components/contact/contact-drawer";
import { Reveal } from "@/components/ui/reveal";

/**
 * Common questions — a single-open accordion separated by hairlines. The
 * toggle is a round bead whose plus turns into a minus; answers expand with a
 * height + fade (static under reduced motion).
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative z-[1] scroll-mt-24 bg-paper py-24 lg:py-36">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Questions, answered."
            description="The things teams ask us most, before the first call."
          />
          <Reveal delay={0.18} className="mt-10">
            <GetInTouchButton tone="outline">Still curious? Ask us</GetInTouchButton>
          </Reveal>
        </div>

        <ul className="border-t border-muted-foreground/70">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-trigger-${i}`;

            return (
              <li key={faq.question} className="border-b border-muted-foreground/70">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full cursor-pointer items-center gap-6 py-7 text-left"
                  >
                    <span
                      className={cn(
                        "flex-1 font-display text-xl leading-snug font-medium transition-colors duration-300 lg:text-2xl",
                        isOpen ? "text-ink" : "text-muted-foreground group-hover:text-ink",
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                        isOpen ? "border-brand bg-brand text-ink" : "border-hairline text-ink group-hover:border-ink",
                      )}
                    >
                      <span className="absolute h-px w-4 bg-current" />
                      <span
                        className={cn(
                          "absolute h-4 w-px bg-current transition-transform duration-300",
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-base leading-7 text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
