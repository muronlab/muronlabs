"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { WorkflowPhase } from "@/lib/site-config";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

/**
 * Horizontal accordion of the four phases. The open phase stretches wide and
 * reveals its brief; the others collapse to a numbered column. Hovering or
 * clicking opens a phase; on small screens the row stacks vertically.
 */
export function PhaseAccordion({ phases, className }: { phases: WorkflowPhase[]; className?: string }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("flex flex-col gap-2 lg:flex-row", className)}>
      {phases.map((phase, i) => {
        const open = i === active;
        return (
          <div
            key={phase.phase}
            role="button"
            tabIndex={0}
            aria-expanded={open}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
            className={cn(
              "relative flex cursor-pointer flex-col overflow-hidden rounded-[3px] border border-white/[0.06] bg-ink-3 p-7 text-left outline-none transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-1 focus-visible:ring-white/40 lg:min-h-[24rem] lg:basis-0",
              open ? "lg:grow-[6]" : "lg:grow lg:hover:bg-[#2b2b2b]",
            )}
          >
            <div className="flex items-baseline justify-between gap-4 lg:block">
              <span className={cn("display text-[2.25rem] leading-none transition-colors duration-500", open ? "text-white" : "text-white/60")}>
                0{i + 1}
              </span>
              <span className={cn("text-[14px] text-white/60 lg:hidden", open && "hidden")}>{phase.short}</span>
            </div>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="body"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-10 lg:absolute lg:inset-x-7 lg:bottom-7 lg:mt-0"
                >
                  <div className="border-t border-white/10 pt-7">
                    <p className="text-[12px] font-medium tracking-[0.12em] text-white/50 uppercase">{phase.phase}</p>
                    <h3 className="display mt-2 text-[1.5rem] text-white lg:text-[1.75rem]">{phase.title}</h3>
                    <p className="mt-3 max-w-[30rem] text-[15px] leading-6 text-white/70">{phase.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Deliverables">
                      {phase.deliverables.map((d) => (
                        <li key={d}>
                          <Chip tone="dark">{d}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
