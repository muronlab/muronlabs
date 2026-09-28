import { HeroSection } from "@/components/home/hero-section";
import { EcosystemSection } from "@/components/home/ecosystem-section";
// import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CapabilityTicker } from "@/components/home/capability-ticker";
import { WorkflowSection } from "@/components/home/workflow-section";
import { DistinctionSection } from "@/components/home/distinction-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* FAQ rich-result data, mirroring the on-page FaqSection */}
      <JsonLd data={faqPageJsonLd()} />

      <HeroSection />
      {/* <TestimonialsSection /> — hidden until real client quotes are ready */}
      <EcosystemSection />
      <CapabilityTicker />
      <WorkflowSection />
      <DistinctionSection />
      <FaqSection />
      <CtaSection />

      <SiteFooter />
    </main>
  );
}
