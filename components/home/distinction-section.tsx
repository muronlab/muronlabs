import { distinctions, homeCopy } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";
import { LineMotif } from "@/components/visuals/line-motif";
import { cn } from "@/lib/utils";

interface DistinctionSectionProps {
  eyebrow?: string;
  title?: string;
  /** Closing paragraph beneath the cards. Omit to hide. */
  body?: string | null;
}

const motifs = ["venn", "rings", "orbit", "dots"] as const;

/**
 * Why Muronlabs — the studio's four standards as a 2×2 of cards, alternating
 * charcoal (with gradient artwork) and white (with a line drawing).
 */
export function DistinctionSection({
  eyebrow = homeCopy.why.eyebrow,
  title = homeCopy.why.title,
  body = homeCopy.why.body,
}: DistinctionSectionProps) {
  return (
    <section aria-labelledby="distinction-heading" className="py-20 lg:py-28">
      <div className="shell">
        <SectionHeading id="distinction-heading" eyebrow={eyebrow} title={title} />

        <ul className="mx-auto mt-14 grid max-w-[54rem] gap-2 md:grid-cols-2">
          {distinctions.map((item, i) => {
            const dark = i === 0 || i === 3;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.08}
                className={cn(
                  "flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[4px] p-2",
                  dark ? "bg-ink-2 text-white" : "bg-surface text-ink",
                )}
              >
                {dark ? (
                  <GradientArt variant="stack" className="h-40 w-full rounded-[2px]" />
                ) : (
                  <div className="flex h-40 items-center justify-start px-6 text-ink">
                    <LineMotif kind={motifs[i]} className="h-28" />
                  </div>
                )}
                <div className="p-6 pt-8">
                  <h3 className="display text-[1.75rem]">{item.title}</h3>
                  <p className={cn("mt-3 max-w-[18rem] text-[15px] leading-6", dark ? "text-white/70" : "text-muted-foreground")}>{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {body ? (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-14 max-w-[36rem] text-center text-[17px] leading-7 text-pretty text-muted-foreground">{body}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
