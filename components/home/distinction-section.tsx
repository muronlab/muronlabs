import { distinctions } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";

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
              className="flex flex-col gap-4 bg-background p-8 lg:p-10"
            >
              <span className="font-mono text-4xl font-bold text-brand">0{i + 1}</span>
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
