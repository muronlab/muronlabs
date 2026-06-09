import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing use of the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="09 Jun 2026"
      intro={`This is a template terms-of-service notice for ${siteConfig.name}. Replace this content with your reviewed terms before launch.`}
      sections={[
        {
          heading: "Use of this site",
          body: [
            `This website is provided for informational purposes. By using it you agree to use it lawfully and not to attempt to disrupt, probe or gain unauthorised access to any part of it.`,
          ],
        },
        {
          heading: "Enquiries are not a contract",
          body: [
            "Submitting the project engagement form starts a conversation; it does not create a binding agreement. Any engagement is governed by a separate, signed statement of work.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `All branding, copy and design on this site are the property of ${siteConfig.name} unless stated otherwise.`,
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms? Email ${siteConfig.contact.email}.`],
        },
      ]}
    />
  );
}
