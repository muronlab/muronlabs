import { homeCopy, primaryCta } from "@/lib/site-config";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";

interface CtaSectionProps {
  /** Override the two headline lines; the second is set in italic. */
  lines?: readonly [string, string];
  body?: string;
}

/**
 * Charcoal call-out: a two-line statement with the second line in italic,
 * supporting copy and a white pill, beside a stack of vertical gradient bars.
 */
export function CtaSection({ lines = homeCopy.callout.lines, body = homeCopy.callout.body }: CtaSectionProps) {
  const [first, second] = lines;

  return (
    <section aria-label="Start a project" className="px-6">
      <div className="grid overflow-hidden rounded-md bg-ink-2 text-white lg:grid-cols-[1fr_34%]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:min-h-[36rem] lg:p-12">
          <Reveal>
            <h2 className="display max-w-[30rem] text-[2.5rem] text-balance sm:text-[3rem] lg:text-[3.5rem]">
              {first}
              <br />
              <em className="italic">{second}</em>
            </h2>
          </Reveal>
          <div className="mt-16">
            <Reveal delay={0.08}>
              <p className="max-w-[22rem] text-[15px] leading-6 text-white/80">{body}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <PillButton href={primaryCta.href} tone="white" className="mt-8" aria-label={primaryCta.ariaLabel}>
                {primaryCta.label}
              </PillButton>
            </Reveal>
          </div>
        </div>
        <div className="p-2 lg:p-3 lg:pl-0">
          <GradientArt variant="bars" className="h-64 w-full rounded-[2px] lg:h-full" />
        </div>
      </div>
    </section>
  );
}
