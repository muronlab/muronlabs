import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface WordmarkProps {
  className?: string;
}

/**
 * Brand wordmark — renders `siteConfig.wordmark.text` with the letter at
 * `dotIndex` swapped for the accent dot (e.g. MUR●N). Colour is inherited.
 */
export function Wordmark({ className }: WordmarkProps) {
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
