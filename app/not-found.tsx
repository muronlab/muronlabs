import { SiteFooter } from "@/components/site-footer";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";

/** 404 — same sheet, pill and gradient language as every other page. */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <section aria-labelledby="not-found-heading" className="px-2 pt-[4.5rem]">
        <div className="sheet overflow-hidden">
          <div className="mx-auto flex max-w-[40rem] flex-col items-center px-6 pt-24 pb-16 text-center lg:pt-32">
            <Reveal immediate delay={0.15}>
              <Eyebrow tone="chip">Error 404</Eyebrow>
            </Reveal>
            <Reveal immediate delay={0.25}>
              <h1 id="not-found-heading" className="display mt-6 text-[2.75rem] text-balance text-ink sm:text-[3.5rem] lg:text-[4.25rem]">
                This page took a different path.
              </h1>
            </Reveal>
            <Reveal immediate delay={0.35}>
              <p className="mx-auto mt-6 max-w-[28rem] text-[17px] leading-7 text-muted-foreground">
                The link may be out of date or the page may have moved. Head back home, or tell us what you were looking for.
              </p>
            </Reveal>
            <Reveal immediate delay={0.45} className="mt-10 flex flex-wrap justify-center gap-3">
              <PillButton href="/">Back to home</PillButton>
              <PillButton href="/contact" tone="outline">
                Start a project
              </PillButton>
            </Reveal>
          </div>
          <GradientArt variant="strip" className="mx-2 mb-2 h-40 sm:h-56" delay={0.3} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
