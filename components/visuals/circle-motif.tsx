import { cn } from "@/lib/utils";
import { FlowGradient } from "./flow-gradient";

/**
 * The brand orb: a disc of living green flow-gradient with a dotted orbit
 * ring drifting around it. Size and position come from `className` on the
 * wrapper; the wrapper should be square.
 */
export function CircleMotif({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-flow-root className={cn("pointer-events-none", className)}>
      <div className="relative size-full">
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <FlowGradient palette="hero" resolution={0.35} interactive={false} speed={0.8} />
        </div>
        <div className="orbit-dots animate-orbit absolute inset-0 translate-x-[-6%] translate-y-[-4%]" />
      </div>
    </div>
  );
}
