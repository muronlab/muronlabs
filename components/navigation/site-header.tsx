import StaggeredMenu from "./staggered-menu";
import { Wordmark } from "./wordmark";
import { navItems, primaryCta, socialItems, siteConfig } from "@/lib/site-config";

/** Nav items plus the primary call to action, surfaced as the last menu entry. */
const menuItems = [
  ...navItems,
  { label: primaryCta.label, href: primaryCta.href, ariaLabel: primaryCta.ariaLabel },
];

/**
 * Fixed, overlay site navigation built on the StaggeredMenu. Rendered once in
 * the root layout so it sits above every page. The wrapper uses
 * `pointer-events: none` except for the header bar and the open panel, so page
 * content underneath stays interactive.
 */
export function SiteHeader() {
  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={menuItems.map((item) => ({
        label: item.label,
        link: item.href,
        ariaLabel: item.ariaLabel,
      }))}
      socialItems={socialItems.map((s) => ({ label: s.label, link: s.href }))}
      contact={siteConfig.contact}
      displaySocials
      displayItemNumbering
      logo={<Wordmark fuzzOnHover />}
      accentColor={siteConfig.accent}
      panelColor="#b497cf"
      colors={["#cdb8e6", "#b497cf", "#5227ff"]}
      menuButtonColor="#0a0a0a"
      openMenuButtonColor="#0a0a0a"
      changeMenuColorOnOpen
    />
  );
}
