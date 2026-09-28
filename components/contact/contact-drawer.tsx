"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-button";
import { FlowGradient } from "@/components/visuals/flow-gradient";
import { ecosystemNav, homeCopy, navItems, primaryCta, siteConfig, socialItems } from "@/lib/site-config";

/** Short marks for the round social buttons (brand icons aren't in lucide). */
const socialGlyph: Record<string, string> = { LinkedIn: "in", X: "X", GitHub: "gh" };

interface DrawerContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useContactDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useContactDrawer must be used inside <ContactDrawerProvider>");
  return ctx;
}

/**
 * Owns the site-wide "Get in touch" drawer: a frosted panel that slides in
 * from the right with a quick message form, a link to the full project brief,
 * and — on small screens — the primary navigation.
 */
export function ContactDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <DrawerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactDrawer isOpen={isOpen} onClose={close} />
    </DrawerContext.Provider>
  );
}

/** A LiquidButton that opens the drawer. */
export function GetInTouchButton({
  children = "Get in touch",
  tone = "outline",
  bead,
  className,
}: {
  children?: React.ReactNode;
  tone?: "light" | "outline" | "ink";
  bead?: "hover" | "always";
  className?: string;
}) {
  const { open } = useContactDrawer();
  return (
    <LiquidButton onClick={open} tone={tone} bead={bead} className={className}>
      {children}
    </LiquidButton>
  );
}

function ContactDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // Close on navigation.
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("input, button")?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep focus inside the panel while it is open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button, input, textarea, select");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire to a Route Handler / email service (same as the project form).
    await new Promise((r) => setTimeout(r, 600));
    setStatus("sent");
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[2000]">
          <motion.button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="absolute inset-y-0 right-0 flex w-full flex-col gap-7 overflow-y-auto border-l border-white bg-white/60 px-6 pt-8 pb-10 shadow-[-2rem_0_4rem_-2rem_rgb(0_0_0/0.15)] backdrop-blur-[18px] backdrop-saturate-150 sm:w-[80vw] sm:px-[3.75rem] sm:pt-[3.75rem] lg:w-[45vw]"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
          >
            <div className="flex items-start justify-between gap-6">
              <h2 id="drawer-title" className="w-[85%] pt-1 font-display text-[1.75rem] leading-[1.3] font-normal text-muted-foreground">
                {homeCopy.drawer.title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-muted-foreground/70 text-muted-foreground transition-colors hover:border-ink hover:text-ink"
              >
                <X className="size-7" strokeWidth={1} />
              </button>
            </div>

            {/* Small screens: the nav lives here. */}
            <nav aria-label="Mobile" className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-hairline py-6 lg:hidden">
              {[...navItems, ...ecosystemNav].map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className="text-lg text-ink hover:text-brand-deep">
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="pt-6 text-center text-lg text-muted-foreground">{homeCopy.drawer.body}</p>

            {status === "sent" ? (
              <div role="status" className="rounded-[22px] border border-hairline bg-white/50 p-6 text-ink">
                <p className="text-xl font-medium">Thank you! Your message has been received.</p>
                <p className="mt-2 text-muted-foreground">A human from the studio will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="drawer-name">
                    Name
                  </label>
                  <input id="drawer-name" name="name" required autoComplete="name" placeholder="Name" className="field-pill field-solid" />
                  <label className="sr-only" htmlFor="drawer-email">
                    Email address
                  </label>
                  <input
                    id="drawer-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email Address"
                    className="field-pill field-solid"
                  />
                </div>
                <label className="sr-only" htmlFor="drawer-message">
                  Message
                </label>
                <textarea
                  id="drawer-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="What are you building?"
                  className="field-pill field-solid min-h-[12.5rem]"
                />
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-[3.75rem] min-w-[9.75rem] cursor-pointer rounded-[30px] border border-muted-foreground px-7 text-lg text-muted-foreground transition-colors hover:border-ink hover:bg-ink hover:text-white disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Submit"}
                  </button>
                </div>
              </form>
            )}

            {/* Wide gradient call to action */}
            <Link
              href={primaryCta.href}
              onClick={onClose}
              data-flow-root
              className="group relative mt-3 flex h-[6.875rem] shrink-0 items-center justify-center overflow-hidden rounded-[20px]"
            >
              <FlowGradient palette="hero" resolution={0.35} interactive={false} />
              <span className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15" />
              <span className="relative font-display text-2xl font-medium text-white sm:text-[1.75rem]">
                Send a full project brief
              </span>
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {socialItems.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-14 items-center justify-center rounded-full border border-muted-foreground/70 text-lg font-semibold text-muted-foreground transition-colors hover:border-ink hover:text-ink"
                >
                  {socialGlyph[s.label] ?? s.label.slice(0, 2)}
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ml-2 text-base text-muted-foreground transition-colors hover:text-ink"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
