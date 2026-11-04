"use client";

import { useState } from "react";
import { insightsCopy } from "@/lib/insights";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";
import { SplitWords } from "@/components/motion/split-words";

/**
 * Charcoal newsletter panel: statement and email form on the left, a stack of
 * gradient bars on the right.
 *
 * NOTE: there is no backend yet. `handleSubmit` is the integration point —
 * wire it to your email provider (e.g. via a Route Handler).
 */
export function Newsletter() {
  const { newsletter } = insightsCopy;
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: send the address to the newsletter provider.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  }

  return (
    <section aria-labelledby="newsletter-heading" className="px-6">
      <div className="grid overflow-hidden rounded-md bg-ink-2 text-white lg:grid-cols-[1fr_34%]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:min-h-[36rem] lg:p-12">
          <div>
            <Reveal>
              <Eyebrow tone="dark">{newsletter.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="newsletter-heading" className="display mt-6 max-w-[30rem] text-[2.5rem] text-balance sm:text-[3rem]">
                <SplitWords text={newsletter.title} />
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[30rem] text-[15px] leading-6 text-white/80">{newsletter.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-14">
            {status === "done" ? (
              <p role="status" className="text-[15px] text-white">
                Thanks — you’re on the list. The next note lands in your inbox soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex max-w-[28rem] flex-col gap-2 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-12 flex-1 rounded-[4px] border border-white/10 bg-white/[0.06] px-4 text-[15px] text-white outline-none placeholder:text-white/40 focus-visible:border-white/50"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-12 cursor-pointer rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:bg-chip disabled:opacity-60"
                >
                  {status === "sending" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}
            <p className="mt-3 text-[13px] text-white/50">{newsletter.note}</p>
          </Reveal>
        </div>
        <div className="p-2 lg:p-3 lg:pl-0">
          <GradientArt variant="bars" className="h-64 w-full rounded-[2px] lg:h-full" />
        </div>
      </div>
    </section>
  );
}
