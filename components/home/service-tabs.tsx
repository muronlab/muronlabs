"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceTabsProps {
  items: { id: string; label: string }[];
}

/**
 * Sticky index for the stacked service cards. The tab for the card nearest
 * the middle of the viewport turns white; clicking scrolls to that card.
 */
export function ServiceTabs({ items }: ServiceTabsProps) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <ul className="flex flex-row flex-wrap gap-1 lg:sticky lg:top-24 lg:flex-col lg:self-start">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "block rounded-[3px] px-3 py-2.5 text-[13px] font-medium tracking-[0.06em] uppercase transition-colors duration-300",
                isActive ? "bg-surface text-ink" : "text-[#aab1b5] hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
