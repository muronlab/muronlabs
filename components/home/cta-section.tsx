import { FlowGradient } from "@/components/visuals/flow-gradient";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Reveal } from "@/components/ui/reveal";
import { homeCopy, primaryCta } from "@/lib/site-config";

interface CtaSectionProps {
  /** Override the two callout lines (e.g. per page). */
  lines?: readonly string[];
}

/**
 * Full-bleed call-out: a window onto a fixed flow-gradient (the fixed layer is
 * clipped to this section, so it behaves like `background-attachment: fixed`)
 * with a sticky statement that holds while the window scrolls past.
 */
export function CtaSection({ lines = homeCopy.callout.lines }: CtaSectionProps) {
  const [statement, close] = lines;

  return (
    <section
      data-flow-root
      aria-label="Start a project"
      className="relative z-[1] h-[90vh] bg-paper lg:h-[125vh]"
      style={{ clipPath: "inset(0)" }}
    >
      <div className="fixed inset-0">
        <FlowGradient />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="relative z-[2] h-full">
        <div className="shell sticky top-[100px] py-[60px] lg:py-[100px]">
          <Reveal>
            <p className="max-w-full font-display text-[2rem] leading-9 font-normal text-white lg:max-w-[50%] lg:text-[2.625rem] lg:leading-[3rem]">
              {statement}
              {close ? (
                <>
                  <br />
                  <br />
                  {close}
                </>
              ) : null}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <LiquidButton href={primaryCta.href} tone="light" bead="always">
              {primaryCta.label}
            </LiquidButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
