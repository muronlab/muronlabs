import { distinctions } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { FlickerText } from "@/components/ui/flicker-text";
import { DistinctionIcon } from "./distinction-icons";

/**
 * The Muronlabs distinction — three specific value statements that set the
 * studio apart from generic software factories. Reused on the homepage and the
 * About page.
 */
interface DistinctionSectionProps {
  /** Section number in the running order. Differs per page. */
  index?: string;
}

export function DistinctionSection({ index = "04" }: DistinctionSectionProps) {
  return (
    <section
      aria-labelledby="distinction-heading"
      className="border-t border-border bg-foreground/2 px-6 py-24 md:px-10 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading index={index} eyebrow="Why Muronlabs" title="Built differently. On purpose." />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {distinctions.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="group relative flex flex-col gap-4 bg-background p-8 transition-colors duration-300 hover:bg-foreground/2 lg:p-10"
            >
              {/* Tracer running the card's perimeter. */}
              <span
                aria-hidden="true"
                className={cn("card-edge", i === 1 && "card-edge-b", i === 2 && "card-edge-c")}
              />
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl border border-border text-foreground/70 transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                  <DistinctionIcon index={i} className="size-6" />
                </span>
                <span className="font-mono text-4xl font-bold text-brand">0{i + 1}</span>
              </div>
              <FlickerText
                as="h3"
                text={item.title}
                delay={i * 0.08}
                className="text-xl font-bold tracking-tight text-foreground lg:text-2xl"
              />
              <p className="text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
