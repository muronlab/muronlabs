import { Quote } from "lucide-react";
import { homeCopy, testimonials } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="text-[15px] font-medium text-ink">{name}</p>
        <p className="mt-0.5 text-[14px] text-muted-foreground">{role}</p>
      </div>
      <Quote className="size-5 shrink-0 fill-ink text-ink" strokeWidth={0} aria-hidden="true" />
    </div>
  );
}

/**
 * Testimonials: sticky heading on the left; on the right two quote cards and
 * a wide featured card pairing gradient artwork (with a headline number) and
 * a pull quote.
 */
export function TestimonialsSection() {
  const { testimonials: copy } = homeCopy;
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section aria-labelledby="testimonials-heading" className="py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="testimonials-heading" align="left" compact eyebrow={copy.eyebrow} title={copy.title} description={copy.intro} />
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal as="article" key={t.name} delay={i * 0.08} className="sheet flex min-h-[18rem] flex-col justify-between p-8">
              <p className="text-[15px] leading-6 text-ink">{t.text}</p>
              <div className="mt-12">
                <Attribution name={t.name} role={t.role} />
              </div>
            </Reveal>
          ))}

          {featured?.featured ? (
            <Reveal as="article" delay={0.16} className="sheet grid gap-2 p-2 md:col-span-2 md:grid-cols-[17rem_1fr]">
              <div className="relative min-h-[18rem] overflow-hidden rounded-[4px]">
                <GradientArt variant="stack" className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <CountUp
                    value={featured.featured.value}
                    suffix={featured.featured.suffix}
                    className="display text-[3.5rem] leading-none"
                    suffixClassName="text-[1.5rem]"
                  />
                  <p className="mt-1 text-[14px] font-medium">{featured.featured.label}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 lg:p-8">
                <p className="display max-w-[30rem] text-[1.5rem] text-ink lg:text-[1.75rem]">{featured.text}</p>
                <div className="mt-12">
                  <Attribution name={featured.name} role={featured.role} />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
