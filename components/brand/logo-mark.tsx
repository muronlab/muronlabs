import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /**
   * Unique suffix for the gradient id. Needed when the mark appears more than
   * once on a page (e.g. header and footer) so each SVG keeps its own gradient.
   */
  id?: string;
}

/**
 * The Muronlabs mark: a white μ and brand dot inside a violet → pink → coral
 * circle. Same artwork as brand/muronlabs-mark.svg and app/icon.svg.
 * Size it with `className` (it fills its box).
 */
export function LogoMark({ className, id = "mark" }: LogoMarkProps) {
  const gradientId = `mu-grad-${id}`;

  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false" className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id={gradientId} x1="30" y1="20" x2="210" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#934BF0" />
          <stop offset=".55" stopColor="#FA7FD8" />
          <stop offset="1" stopColor="#FA7465" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="120" fill={`url(#${gradientId})`} />
      <g fill="none" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="butt" strokeLinejoin="round">
        <path d="M70 60 V182" />
        <path d="M70 104 A38 38 0 0 0 146 104 V60" />
      </g>
      <circle cx="176" cy="128" r="13" fill="#FFFFFF" />
    </svg>
  );
}
