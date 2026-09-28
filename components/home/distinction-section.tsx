import { distinctions } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface DistinctionSectionProps {
  /** Section number in the running order. Differs per page. */
  index?: string;
}

/** Card surfaces, in the same family as the hero cards. */
const tones = [
  { card: "bg-ink text-white", body: "text-white/75", num: "text-white/90" },
  { card: "bg-brand text-ink", body: "text-ink/75", num: "text-white" },
  { card: "border border-hairline bg-card text-ink", body: "text-muted-foreground", num: "text-hairline" },
  { card: "bg-pink text-ink", body: "text-ink/75", num: "text-white" },
];

/**
 * The Muronlabs distinction — the value statements that set the studio apart,
 * as four tall cards. Reused on the homepage and the Studio page.
 */
export function DistinctionSection({ index }: DistinctionSectionProps) {
  return (
    <section aria-labelledby="distinction-heading" className="relative z-[1] bg-paper py-24 lg:py-36">
      <div className="shell">
        <SectionHeading
          id="distinction-heading"
          index={index}
          eyebrow="Why Muronlabs"
          title="Not a software factory. A studio."
          description="The standards every engagement is held to, whichever squad you work with."
        />

        <ul className="group/cards mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-[1.875rem]">
          {distinctions.map((item, i) => {
            const tone = tones[i % tones.length];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.08}
                className={cn(
                  "flex min-h-[20rem] flex-col justify-between gap-10 rounded-xl p-8 transition-[opacity,transform] duration-500 group-hover/cards:opacity-75 hover:-translate-y-1 hover:!opacity-100 lg:min-h-[26rem]",
                  tone.card,
                )}
              >
                <span aria-hidden="true" className={cn("font-sans text-[5.875rem] leading-none font-light", tone.num)}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.75rem] leading-tight font-medium">{item.title}</h3>
                  <p className={cn("mt-3 text-base leading-6", tone.body)}>{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
