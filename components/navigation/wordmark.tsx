import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { LogoMark } from "@/components/brand/logo-mark";

interface WordmarkProps {
  className?: string;
  /** Unique id for the mark's gradient when the logo appears twice on a page. */
  id?: string;
}

/**
 * Brand logo — the μ mark followed by the lowercase name and a coral full
 * stop: "muronlabs.". The name's colour is inherited; size it with a
 * font-size class (the mark scales with the text).
 */
export function Wordmark({ className, id }: WordmarkProps) {
  return (
    <span className={cn("wordmark", className)} aria-label={siteConfig.name}>
      <LogoMark id={id} className="wordmark-mark" />
      <span aria-hidden="true">
        {siteConfig.wordmark.text}
        <span className="wordmark-period">.</span>
      </span>
    </span>
  );
}
