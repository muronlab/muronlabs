import { Activity, Boxes, Bot, Brain, Cloud, Cpu, Gauge, Layers, Palette, Search, ShieldCheck, Sparkles, Waypoints, Workflow } from "lucide-react";

const items = [
  { label: "Scalable Architecture", Icon: Layers },
  { label: "Agentic Automation", Icon: Bot },
  { label: "Design Systems", Icon: Palette },
  { label: "Performance Engineering", Icon: Gauge },
  { label: "Cloud-Native", Icon: Cloud },
  { label: "Security-First", Icon: ShieldCheck },
  { label: "Intelligent Search", Icon: Search },
  { label: "API Design", Icon: Waypoints },
  { label: "Motion & Interaction", Icon: Sparkles },
  { label: "Data Pipelines", Icon: Workflow },
  { label: "Model Integration", Icon: Cpu },
  { label: "Component Libraries", Icon: Boxes },
  { label: "Neuroscience Data", Icon: Brain },
  { label: "EEG & fMRI Pipelines", Icon: Activity },
];

/**
 * A slow, muted marquee of capabilities, styled like a logo strip: grey marks
 * fading at both edges. The list is duplicated for a seamless loop and stops
 * for reduced motion.
 */
export function CapabilityTicker() {
  return (
    <div className="relative overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <p className="sr-only">Capabilities: {items.map((i) => i.label).join(", ")}.</p>
      <div className="flex w-max animate-marquee items-center gap-16 pr-16" aria-hidden="true">
        {[...items, ...items].map(({ label, Icon }, i) => (
          <span key={i} className="flex items-center gap-3 text-[22px] font-semibold whitespace-nowrap text-muted-foreground">
            <Icon className="size-7" strokeWidth={1.75} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
