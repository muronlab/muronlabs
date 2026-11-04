import { SiteFooter } from "@/components/site-footer";
import { ProjectForm } from "@/components/contact/project-form";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig, socialItems } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Start a Project",
  description:
    "Tell Muronlabs about your project. Whether you need an immersive application interface, custom AI agent workflows, or a full system build, our engineers are ready to ship.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Start a Project", path: "/contact" },
        ])}
      />

      <section aria-labelledby="contact-heading" className="relative px-2 pt-[4.5rem]">
        <div className="relative overflow-hidden rounded-md">
          {/* The gradient band sits behind the lower half of the form. */}
          <GradientArt variant="strip" className="absolute inset-x-0 bottom-0 h-[55%]" delay={0.3} />

          <div className="shell relative grid gap-10 py-14 lg:grid-cols-[1fr_1.45fr] lg:gap-16 lg:py-24">
            <div className="lg:pt-4">
              <Reveal immediate delay={0.15}>
                <h1 id="contact-heading" className="display max-w-[20rem] text-[2.75rem] text-balance text-ink sm:text-[3.5rem] lg:text-[3.75rem]">
                  Let’s build what’s next.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.25}>
                <p className="mt-6 max-w-[22rem] text-[16px] leading-6 text-muted-foreground">
                  Tell us about your product and where it needs to go. We reply within one business day with a clear next step — no
                  sales script.
                </p>
              </Reveal>
              <Reveal immediate delay={0.35} className="mt-10 grid gap-6 text-[15px] sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="link-underline mt-1 inline-block text-ink">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <p className="text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">Phone</p>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="link-underline mt-1 inline-block text-ink">
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">Elsewhere</p>
                  <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    {socialItems.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal immediate delay={0.3} className="sheet p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] sm:p-8">
              <ProjectForm />
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter showCta={false} />
    </main>
  );
}
