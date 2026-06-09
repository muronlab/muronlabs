import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProjectForm } from "@/components/contact/project-form";
import { siteConfig, socialItems } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Muronlabs about your project. Whether you need an immersive application interface, custom AI agent workflows, or a full system build, our engineers are ready to ship.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        glow
        eyebrow="Start a Project"
        title={<>Have a complex problem? Let&rsquo;s engineer the solution.</>}
        description="Reach out with your project details. Whether you are looking for an immersive application interface, custom AI agent workflows, or a full system build, our engineers are ready to ship."
      />

      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.4fr_1fr]">
          <ProjectForm />

          <aside className="space-y-10 lg:border-l lg:border-border lg:pl-12">
            <div className="space-y-2">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">[ Email ]</h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="link-underline text-xl font-bold tracking-tight text-foreground"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="space-y-2">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">[ Phone ]</h2>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="link-underline text-xl font-bold tracking-tight text-foreground"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="space-y-3">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">[ Elsewhere ]</h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {socialItems.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-mono text-sm uppercase tracking-wide text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              Built in Sri Lanka, designed for the world. We typically respond within one business day.
            </p>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
