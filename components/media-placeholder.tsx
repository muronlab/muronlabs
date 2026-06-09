import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  className?: string;
  label?: string;
}

/**
 * Placeholder for imagery. Swap the background colour or drop a `next/image`
 * in here when real photos are ready. Sizing/aspect is controlled via className.
 */
export function MediaPlaceholder({ className, label = "Image" }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        "flex items-center justify-center bg-muted text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground",
        className
      )}
    >
      {label}
    </div>
  );
}
