import { LegalPage } from "@/components/legal/legal-page";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Privacy Architecture",
  description: `How ${siteConfig.name} collects, uses and protects personal data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Architecture", path: "/privacy" },
        ])}
      />
      <LegalPage
      eyebrow="Legal"
      title="Privacy Architecture"
      lastUpdated="09 Jun 2026"
      intro={`This is a template privacy notice for ${siteConfig.name}. Replace this content with your reviewed policy before launch. It should reflect your obligations under the applicable regimes — including Sri Lanka's PDPA and, where relevant, the GDPR.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you submit the project engagement form, we collect the details you provide: your name, company or project name, corporate email address, chosen squad and project brief.",
            "We do not collect special-category personal data through this site. Do not include secrets, credentials or sensitive personal information in your brief.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use the information you submit solely to respond to your enquiry and scope a potential engagement. We do not sell your data.",
          ],
        },
        {
          heading: "Retention & your rights",
          body: [
            "We retain enquiry data only as long as needed to respond and, where applicable, to fulfil a contract. Depending on your jurisdiction you may have rights to access, correct or erase your data.",
            `To exercise any right, contact us at ${siteConfig.contact.email}.`,
          ],
        },
      ]}
      />
    </>
  );
}
