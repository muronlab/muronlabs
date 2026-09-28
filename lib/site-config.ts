/**
 * Single source of truth for brand, navigation, contact details and the
 * marketing content that appears across the site. Edit values here and they
 * propagate to the header, footer, pages, structured data and SEO metadata.
 */

export const siteConfig = {
  name: "Muronlabs",
  tagline: "Engineering with precision. Designing with soul.",
  /** Used in the wordmark: the letter at `dotIndex` is replaced by the accent dot. */
  wordmark: { text: "MURON", dotIndex: 3 },
  description:
    "Muronlabs is an elite multidisciplinary technology studio. We unify high-performance software engineering, intelligent agentic AI, and immersive digital artistry into a singular, seamless ecosystem.",
  /** Shorter blurb for cards, footers and meta where the full description is too long. */
  shortDescription:
    "A multidisciplinary technology studio unifying software engineering, agentic AI and digital artistry.",
  /** Absolute base URL of the deployed site. Override with NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muronlabs.com",
  locale: "en_GB",
  /** Signature green, lifted from the flow-gradient palette. */
  accent: "#70b494",
  contact: {
    // Placeholders — swap for the real studio details before launch.
    email: "hello@muronlabs.com",
    phone: "+94 11 000 0000",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
}

/** Primary navigation shown in the header menu. Anchors resolve to homepage sections. */
export const navItems: NavItem[] = [
  { label: "About", href: "/studio", ariaLabel: "Learn about the studio" },
  { label: "Workflow", href: "/#workflow", ariaLabel: "See our execution framework" },
  { label: "Work", href: "/work", ariaLabel: "See selected work" },
];

/** Divisions listed under the "Ecosystem" dropdown in the header. */
export const ecosystemNav: NavItem[] = [
  { label: "Muron Dev", href: "/#muron-dev", ariaLabel: "Muron Dev — engineering" },
  { label: "Muron AI", href: "/#muron-ai", ariaLabel: "Muron AI — agentic automation" },
  { label: "Muron Arts", href: "/#muron-arts", ariaLabel: "Muron Arts — design and brand" },
];

/** Primary call to action, surfaced in the header and conversion sections. */
export const primaryCta = {
  label: "Start a Project",
  href: "/contact",
  ariaLabel: "Start a project with Muronlabs",
} as const;

export interface SocialItem {
  label: string;
  href: string;
}

export const socialItems: SocialItem[] = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
];

/**
 * Real, indexable routes for the sitemap. Distinct from `navItems`, which may
 * contain in-page anchors that should never appear in the sitemap.
 */
export const siteRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/studio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

/* ------------------------------------------------------------------ */
/* Ecosystem — the three specialist divisions                          */
/* ------------------------------------------------------------------ */

export interface Division {
  id: string;
  index: string;
  name: string;
  tagline: string;
  body: string;
  /**
   * Capability and approach areas for this division. Deliberately
   * outcome-focused, not a fixed tool list — we select the best-matching stack
   * per project rather than forcing one toolchain on every client.
   */
  focus: string[];
  /**
   * Optional two-stop gradient for the division name. Hex rather than Tailwind
   * classes because the name paints its own fill (see `FlickerText`).
   */
  gradientStops?: { from: string; to: string };
  /**
   * Background classes for the full-width accent bar at the bottom of the
   * card — the solid/gradient counterpart of `gradient` (which is text-only).
   */
  accent: string;
  /** Short mark used on the oversized hero cards, e.g. "DEV". */
  mark: string;
}

export const divisions: Division[] = [
  {
    id: "muron-dev",
    index: "01",
    name: "Muron Dev",
    tagline: "High-Performance Technical Architecture",
    body: "We turn complex logical concepts into production-grade applications. From ultra-scalable cloud infrastructures to lightning-fast frontend ecosystems, we write robust, clean code engineered to handle extreme scale.",
    focus: [
      "Scalable Architecture",
      "Component-Driven Frontends",
      "Cloud-Native Backends",
      "Type-Safe Foundations",
      "API Design",
      "Performance Engineering",
    ],
    accent: "bg-foreground",
    mark: "DEV",
  },
  {
    id: "muron-ai",
    index: "02",
    name: "Muron AI",
    tagline: "Intelligent Automation & Data Science",
    body: "Move past basic analytics into true cognitive automation. We design, fine-tune, and deploy autonomous AI agents, data science solutions and intelligent data pipelines that surface insight, optimise operations, automate complex workflows, and solve critical business challenges.",
    focus: [
      "Autonomous AI Agents",
      "Data Science Solutions",
      "Predictive Analytics",
      "Contextual Retrieval",
      "Data Pipelines",
      "Model Integration",
    ],
    gradientStops: { from: "#5c9376", to: "#70b494" },
    accent: "bg-brand",
    mark: "AI",
  },
  {
    id: "muron-arts",
    index: "03",
    name: "Muron Arts",
    tagline: "Immersive Visual Communication",
    body: "Advanced technology requires human connection. Muron Arts bridges the gap between complex logic and exceptional human experiences. We craft high-fidelity design systems, intuitive UI/UX architectures, and unforgettable digital branding.",
    focus: [
      "UI/UX Design Systems",
      "Interaction Design",
      "Brand Identity",
      "Motion Graphics",
      "Prototyping",
      "Visual Systems",
    ],
    gradientStops: { from: "#e38b95", to: "#f5a6af" },
    accent: "bg-pink",
    mark: "ARTS",
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities — the service matrix                                   */
/* ------------------------------------------------------------------ */

export interface Capability {
  capability: string;
  outcome: string;
}

export interface CapabilityGroup {
  division: string;
  divisionId: string;
  items: Capability[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    division: "Muron Dev",
    divisionId: "muron-dev",
    items: [
      { capability: "Full-Stack Web Applications", outcome: "Scalable, accessible web software built for speed." },
      { capability: "Modern Frontend Ecosystems", outcome: "Component-driven frontend architectures optimised for SEO." },
      { capability: "Robust Cloud Backends & APIs", outcome: "Secure microservices capable of processing parallel traffic loads." },
    ],
  },
  {
    division: "Muron AI",
    divisionId: "muron-ai",
    items: [
      { capability: "Autonomous Workflow Agents", outcome: "Custom agents that execute complex business steps automatically." },
      { capability: "Custom AI Model Integration", outcome: "Fine-tuned intelligence tailored to your proprietary data structures." },
      { capability: "Intelligent Search Systems", outcome: "Deep contextual search and retrieval models for enterprise documentation." },
    ],
  },
  {
    division: "Muron Arts",
    divisionId: "muron-arts",
    items: [
      { capability: "High-Fidelity UI/UX Systems", outcome: "Fluid, human-centric design interfaces mapped from real user research." },
      { capability: "Scale Design Systems", outcome: "Centralised component tokens ensuring visual unity across software suites." },
      { capability: "Branding & Visual Identity", outcome: "Distinctive corporate identity guidelines and modern digital assets." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Execution framework — the workflow                                  */
/* ------------------------------------------------------------------ */

export interface WorkflowPhase {
  phase: string;
  title: string;
  body: string;
  /** What actually lands at the end of the phase. Rendered as a mono index. */
  deliverables: string[];
}

export const workflowPhases: WorkflowPhase[] = [
  {
    phase: "Phase 01",
    title: "Discovery & Architecture Mapping",
    body: "We map the objective, the data and the stack before a line of code is written.",
    deliverables: ["Objective mapping", "Data & schema design", "Functional scope", "Stack selection"],
  },
  {
    phase: "Phase 02",
    title: "High-Fidelity UI/UX & System Prototyping",
    body: "Muron Arts prototypes the real interface first, so you see the product before we code it.",
    deliverables: ["Interactive prototypes", "Component library", "Design tokens", "UX validation"],
  },
  {
    phase: "Phase 03",
    title: "Iterative Sprint Development & AI Training",
    body: "Muron Dev builds the framework while Muron AI trains and wires the agent pipelines.",
    deliverables: ["Modular app framework", "Agentic pipelines", "Sprint reviews", "Continuous integration"],
  },
  {
    phase: "Phase 04",
    title: "Vulnerability Assessment & Production Deployment",
    body: "We audit every input, tune the load times, then ship to a locked-down cloud.",
    deliverables: ["Input-layer testing", "Code security audit", "Speed optimisation", "Cloud deployment"],
  },
];

/* ------------------------------------------------------------------ */
/* The Muronlabs distinction — why choose us                           */
/* ------------------------------------------------------------------ */

export interface Distinction {
  title: string;
  body: string;
}

export const distinctions: Distinction[] = [
  {
    title: "Unified Execution",
    body: "Design, engineering and AI under one coordinated roof.",
  },
  {
    title: "Performance First",
    body: "Lean modern stacks, tuned for speed and search.",
  },
  {
    title: "Security By Default",
    body: "Audited inputs, safe data paths, locked-down deploys.",
  },
  {
    title: "Design-Led Craft",
    body: "Interfaces built with the same rigour as the backend.",
  },
];

/* ------------------------------------------------------------------ */
/* Frequently asked questions                                          */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How do you decide which technologies to use?",
    answer:
      "We stay deliberately stack-agnostic. Rather than forcing one toolchain onto every brief, we select the best-fit languages, libraries and platforms for your specific constraints — scale, performance, team and budget — so the architecture serves the problem, not the other way round.",
  },
  {
    question: "Can you work alongside our existing team and codebase?",
    answer:
      "Yes. We embed with in-house teams as often as we build greenfield. We can extend an existing system, untangle legacy code, or own a discrete module end to end — whatever closes the gap fastest without disrupting what already works.",
  },
  {
    question: "Do you handle design, engineering and AI, or just one?",
    answer:
      "All three, under one roof. Muron Arts, Muron Dev and Muron AI ship as a single coordinated team, so you avoid the friction of stitching together separate design studios, engineering shops and data-science contractors.",
  },
  {
    question: "How do you approach security and data privacy?",
    answer:
      "Security is a primary design requirement, not a final-stage audit. We engineer input validation, secure data patterns and access controls in from day one, and align builds with the data-protection obligations relevant to your market.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "We follow a structured sequence — discovery and architecture mapping, high-fidelity prototyping, iterative sprint development, then a security and performance pass before deployment. You see working software early and stay in the loop at every phase.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We hand over clean, documented code you fully own, and can stay on for monitoring, iteration and scaling. The goal is a platform your team can confidently run — with us on call when you need deeper work.",
  },
];

/* ------------------------------------------------------------------ */
/* Contact form — squad options for the conversion form                */
/* ------------------------------------------------------------------ */

export const squadOptions = [
  { value: "ecosystem", label: "Muronlabs Ecosystem" },
  { value: "muron-dev", label: "Muron Dev" },
  { value: "muron-ai", label: "Muron AI" },
  { value: "muron-arts", label: "Muron Arts" },
] as const;

/* ------------------------------------------------------------------ */
/* Footer architecture                                                 */
/* ------------------------------------------------------------------ */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: "Ecosystem",
    links: [
      { label: "Muron Dev", href: "/#ecosystem" },
      { label: "Muron AI", href: "/#ecosystem" },
      { label: "Muron Arts", href: "/#ecosystem" },
    ],
  },
  {
    heading: "Navigate",
    links: [
      { label: "About", href: "/studio" },
      { label: "Work", href: "/work" },
      { label: "Workflow", href: "/#workflow" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Architecture", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const footerTagline = "Engineering the future, defining the aesthetic.";

/* ------------------------------------------------------------------ */
/* Homepage narrative copy                                             */
/* ------------------------------------------------------------------ */

export const homeCopy = {
  /** Oversized two-line hero headline; the CTA sits between the lines. */
  heroLines: ["Precision", "meets soul"] as const,
  heroLead: "Engineering with precision. Designing with soul. One studio for software, agentic AI and digital artistry.",
  about: {
    eyebrow: "What is Muronlabs?",
    body: "Muronlabs brings engineers, AI specialists and designers into one coordinated studio. Together, we map the problem, prototype the experience and ship production-grade software that performs, scales and feels human.",
    close: "Technology is changing everything. We make sure it is built with care.",
  },
  ecosystem: {
    title: "Bring Muronlabs to your product",
    intro: "Three specialist divisions, one roof. Engage one squad for a focused build, or the whole ecosystem for a product end to end.",
  },
  callout: {
    lines: [
      "Design, engineering and AI under one coordinated roof. Built in Sri Lanka, designed for the world.",
      "Let’s build what’s next.",
    ],
  },
  connect: {
    eyebrow: "Let’s Connect",
    title: "Have a complex problem? We’d love to hear about it.",
    button: "Connect with a human",
  },
  drawer: {
    title: "Want to start a project, join the studio, or just start a conversation?",
    body: "Drop us a line, and we’ll get back to you within one business day.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Client name, set as a type-only wordmark on the card. */
  company: string;
  /** Card surface, from the site palette (no photography on the site). */
  tone: "green" | "peach" | "ink" | "pink";
}

/**
 * PLACEHOLDERS — these are not real clients. Replace every entry with
 * approved quotes from real clients before launch.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Muronlabs became a strategic technology partner for us. Their team helped us ship faster without cutting corners on quality or security.",
    name: "Client Name",
    role: "Chief Executive Officer",
    company: "Company One",
    tone: "green",
  },
  {
    quote:
      "They built AI workflows that actually moved the needle for our operations, and they explained every decision along the way.",
    name: "Client Name",
    role: "Head of Data",
    company: "Company Two",
    tone: "peach",
  },
  {
    quote:
      "Design, engineering and AI in one team meant no hand-off gaps. The product we launched feels as good as it performs.",
    name: "Client Name",
    role: "Product Director",
    company: "Company Three",
    tone: "ink",
  },
  {
    quote:
      "From the first prototype to deployment, the process was clear and collaborative. We now run the platform confidently in-house.",
    name: "Client Name",
    role: "Chief Technology Officer",
    company: "Company Four",
    tone: "pink",
  },
];
