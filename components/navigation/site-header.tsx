"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Wordmark } from "./wordmark";
import { GetInTouchButton, useContactDrawer } from "@/components/contact/contact-drawer";
import { ecosystemNav, navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Site navigation. Sits transparently over the top of each page — white over
 * the homepage's flow gradient, ink on the grey inner pages. Once the page is
 * scrolled it becomes a frosted bar that tucks away while scrolling down and
 * returns on the way back up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useContactDrawer();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > window.innerHeight * 0.6 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const light = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] transition-[transform,background-color,border-color,padding] duration-500 ease-out",
        scrolled ? "border-b border-hairline/70 bg-paper/75 py-3 backdrop-blur-md" : "border-b border-transparent pt-8 lg:pt-10",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="shell flex items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className={cn("py-2 transition-colors duration-300", light ? "text-white [--wordmark-dot:var(--pink)]" : "text-ink")}
        >
          <Wordmark fuzzOnHover />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <Link
            href={navItems[0].href}
            className={cn("py-4 text-base transition-colors hover:text-brand", light ? "text-white" : "text-muted-foreground")}
          >
            {navItems[0].label}
          </Link>

          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 py-4 text-base transition-colors hover:text-brand",
                light ? "text-white" : "text-muted-foreground",
              )}
            >
              Ecosystem
              <ChevronDown className={cn("size-4 transition-transform duration-300", menuOpen && "rotate-180")} strokeWidth={1.5} />
            </button>
            <div
              className={cn(
                "absolute top-full left-1/2 w-56 -translate-x-1/2 pt-2 transition-all duration-300",
                menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
              )}
            >
              <ul className="overflow-hidden rounded-xl border border-white bg-white/80 p-2 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)] backdrop-blur-lg">
                {ecosystemNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-4 py-3 text-ink transition-colors hover:bg-paper hover:text-brand-deep"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn("py-4 text-base transition-colors hover:text-brand", light ? "text-white" : "text-muted-foreground")}
            >
              {item.label}
            </Link>
          ))}

          <GetInTouchButton tone={light ? "light" : "outline"} />
        </nav>

        <button
          type="button"
          onClick={open}
          className={cn(
            "cursor-pointer rounded-[3rem] border px-6 py-3 text-base transition-colors lg:hidden",
            light ? "border-white/70 text-white" : "border-hairline text-ink",
          )}
        >
          Menu
        </button>
      </div>
    </header>
  );
}
