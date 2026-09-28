import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProjectForm } from "@/components/contact/project-form";
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
      <PageHero
        glow
        eyebrow="Start a Project"
        title="Have a complex problem? Let’s engineer the solution."
        description="Reach out with your project details. Whether you are looking for an immersive application interface, custom AI agent workflows, or a full system build, our engineers are ready to ship."
      />

      <section className="relative z-[1] bg-paper pb-28">
        <div className="shell grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <ProjectForm />

          <aside className="space-y-10 lg:border-l lg:border-hairline lg:pl-12">
            <div className="space-y-2">
              <h2 className="text-sm font-medium tracking-[2px] text-ink uppercase">Email</h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="link-underline font-display text-2xl text-ink hover:text-brand-deep"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-medium tracking-[2px] text-ink uppercase">Phone</h2>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="link-underline font-display text-2xl text-ink hover:text-brand-deep"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="space-y-3">
              <h2 className="text-sm font-medium tracking-[2px] text-ink uppercase">Elsewhere</h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {socialItems.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-muted-foreground hover:text-brand"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="border-t border-hairline pt-6 text-base leading-relaxed text-muted-foreground">
              Built in Sri Lanka, designed for the world. We typically respond within one business day.
            </p>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
