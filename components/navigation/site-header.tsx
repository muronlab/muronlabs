"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Wordmark } from "./wordmark";
import { PillButton } from "@/components/ui/pill-button";
import { ecosystemNav, navItems, primaryCta, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Nav link type: Inter 14/500 in slate grey, as on the reference (see `.nav-type`). */
const linkClass = "nav-type py-2 text-[#4e565e] transition-colors hover:text-ink";

/**
 * Site navigation: a white bar inset from the top of the canvas with the
 * wordmark left, links centred and the primary call to action right. The
 * "Ecosystem" item opens a dropdown describing the three divisions; on small
 * screens a hamburger opens a full menu sheet beneath the bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecoOpen, setEcoOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const ecoRef = useRef<HTMLDivElement>(null);

  // Close everything on navigation (state adjusted during render, not in an effect).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setEcoOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll behind the mobile sheet.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!ecoOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!ecoRef.current?.contains(e.target as Node)) setEcoOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setEcoOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ecoOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] px-2 transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "pt-0" : "pt-2",
      )}
    >
      {/*
        At the top of the page the bar spans the full width, 8px in from the
        edges, with rounded corners. Once scrolled it docks flush to the top,
        contracts to a centred 77rem bar and squares its corners. No shadows.
      */}
      <div
        className={cn(
          "mx-auto w-full transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "max-w-[77rem]" : "max-w-[200rem]",
        )}
      >
      <div
        className={cn(
          "relative flex h-14 items-center justify-between bg-surface px-4 transition-[border-radius] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6",
          scrolled ? "rounded-none" : "rounded-md",
        )}
      >
        <Link href="/" aria-label={`${siteConfig.name} home`} className="text-ink">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.href === "/ecosystem" ? (
          <div
            key={item.href}
            ref={ecoRef}
            className="relative flex items-center gap-1"
            onMouseEnter={() => setEcoOpen(true)}
            onMouseLeave={() => setEcoOpen(false)}
          >
            {/* The word opens the Ecosystem page; the chevron toggles the division menu. */}
            <Link
              href={item.href}
              aria-label={item.ariaLabel}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(linkClass, pathname === item.href && "text-ink")}
            >
              {item.label}
            </Link>
            <button
              type="button"
              aria-expanded={ecoOpen}
              aria-haspopup="true"
              aria-label="Show ecosystem divisions"
              onClick={() => setEcoOpen((v) => !v)}
              className="flex cursor-pointer items-center py-2 text-ink/90 transition-colors hover:text-ink"
            >
              <ChevronDown className={cn("size-4 transition-transform duration-300", ecoOpen && "rotate-180")} strokeWidth={1.5} />
            </button>
            <div
              className={cn(
                "absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 transition-all duration-300",
                ecoOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
              )}
            >
              <ul className="overflow-hidden rounded-lg border border-hairline bg-surface p-1.5">
                {ecosystemNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel}
                      onClick={() => setEcoOpen(false)}
                      className="block rounded-md px-3.5 py-3 transition-colors hover:bg-chip"
                    >
                      <span className="nav-type block text-ink">{item.label}</span>
                      <span className="mt-0.5 block font-nav text-[13px] tracking-[-0.01em] text-muted-foreground">{item.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(linkClass, pathname === item.href && "text-ink")}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <PillButton href={primaryCta.href} size="sm" className="nav-type nav-btn hidden sm:inline-flex" aria-label={primaryCta.ariaLabel}>
            {primaryCta.label}
          </PillButton>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-chip lg:hidden"
          >
            {menuOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="menu"
            role="dialog"
            aria-label="Menu"
            className="sheet mt-2 max-h-[calc(100svh-5rem)] overflow-y-auto border border-hairline px-5 py-6 lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Same order as desktop; the divisions nest under Ecosystem. */}
            <nav aria-label="Mobile" className="flex flex-col font-nav font-medium tracking-[-0.02em]">
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-hairline">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-4 text-[20px] text-ink"
                  >
                    {item.label}
                  </Link>
                  {item.href === "/ecosystem" ? (
                    <ul className="-mt-1 pb-3 pl-4">
                      {ecosystemNav.map((d) => (
                        <li key={d.href}>
                          <Link href={d.href} className="flex items-baseline justify-between gap-4 py-2">
                            <span className="shrink-0 text-[16px] whitespace-nowrap text-ink/80">{d.label}</span>
                            <span className="text-right text-[13px] text-muted-foreground">{d.tagline}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </nav>
            {/* The bar already shows this button from the sm breakpoint up. */}
            <PillButton href={primaryCta.href} className="nav-type nav-btn mt-6 w-full sm:hidden">
              {primaryCta.label}
            </PillButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </header>
  );
}
