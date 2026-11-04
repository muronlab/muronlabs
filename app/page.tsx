import { HeroSection } from "@/components/home/hero-section";
import { CapabilityTicker } from "@/components/home/capability-ticker";
import { DistinctionSection } from "@/components/home/distinction-section";
import { AboutPreview } from "@/components/home/about-preview";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { WorkflowSection } from "@/components/home/workflow-section";
import { CtaSection } from "@/components/home/cta-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* FAQ rich-result data, mirroring the on-page FaqSection */}
      <JsonLd data={faqPageJsonLd()} />

      <HeroSection />
      <CapabilityTicker />
      <DistinctionSection />
      <AboutPreview />
      <EcosystemSection />
      <WorkflowSection />
      <div className="pt-20 lg:pt-28">
        <CtaSection />
      </div>
      <TestimonialsSection />
      <FaqSection />

      <SiteFooter />
    </main>
  );
}
