import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Insight } from "@/lib/insights";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";
import { SplitWords } from "@/components/motion/split-words";

/**
 * An Insights card: a cover (charcoal or pale blue) with a short phrase and a
 * drifting gradient band, then topic chips, the title and a "Read post" link.
 * The whole card is one link.
 */
export function PostCard({ post, className }: { post: Insight; className?: string }) {
  const dark = post.tone === "dark";

  return (
    <article className={cn("sheet group p-2", className)}>
      <Link href={`/insights/${post.slug}`} className="block rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
        <div className={cn("relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-[2px]", dark ? "bg-ink-2" : "bg-sky")}>
          <p className={cn("display max-w-[11ch] p-6 text-[1.75rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 sm:text-[2.25rem]", dark ? "text-white" : "text-ink")}>
            <SplitWords text={post.cover} delay={0.2} />
          </p>
          <div aria-hidden="true" className="cover-band grain relative h-[14%] min-h-10 transition-[filter,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-[18%] group-hover:brightness-110 group-hover:saturate-125" />
        </div>

        <div className="px-5 pt-7 pb-6 sm:px-6">
          <ul className="flex flex-wrap gap-2" aria-label="Topics">
            {post.tags.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
          <h2 className="display mt-5 max-w-[26rem] text-[1.5rem] text-balance text-ink">{post.title}</h2>
          <span className="mt-5 inline-flex items-center gap-2.5 text-[14px] font-medium text-ink">
            Read post
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </span>
        </div>
      </Link>
    </article>
  );
}
