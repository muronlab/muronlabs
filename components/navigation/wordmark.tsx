import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Brand wordmark — renders `siteConfig.wordmark.text` (e.g. "Muronlabs") with the
 * letter at `dotIndex` swapped for the gradient dot (Mur●nlabs). Colour is
 * inherited; size via `className`.
 */
export function Wordmark({ className }: { className?: string }) {
  const { text, dotIndex } = siteConfig.wordmark;
  const before = text.slice(0, dotIndex);
  const after = text.slice(dotIndex + 1);

  return (
    <span className={cn("wordmark", className)} aria-label={siteConfig.name}>
      <span aria-hidden="true">{before}</span>
      <span className="wordmark-dot" aria-hidden="true" />
      <span aria-hidden="true">{after}</span>
    </span>
  );
}
