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
  accent: "#7c5cff",
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
  { label: "Ecosystem", href: "/#ecosystem", ariaLabel: "View our sub-brand ecosystem" },
  { label: "Capabilities", href: "/#capabilities", ariaLabel: "Explore our engineering capabilities" },
  { label: "Our Workflow", href: "/#workflow", ariaLabel: "See our execution framework" },
  { label: "About", href: "/studio", ariaLabel: "Learn about the studio" },
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
  /** Optional Tailwind classes to render the division name as a gradient. */
  gradient?: string;
  /**
   * Background classes for the full-width accent bar at the bottom of the
   * card — the solid/gradient counterpart of `gradient` (which is text-only).
   */
  accent: string;
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
    gradient: "bg-linear-to-r from-purple-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent",
    accent: "bg-linear-to-r from-purple-900 via-indigo-900 to-blue-900",
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
    gradient: "bg-linear-to-r from-rose-500 to-red-500 bg-clip-text text-transparent",
    accent: "bg-linear-to-r from-rose-500 to-red-500",
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
}

export const workflowPhases: WorkflowPhase[] = [
  {
    phase: "Phase 01",
    title: "Discovery & Architecture Mapping",
    body: "We unpack your core business objective, map the necessary data structures, outline the functional scope, and select the optimal technology stacks across Dev, AI and Arts.",
  },
  {
    phase: "Phase 02",
    title: "High-Fidelity UI/UX & System Prototyping",
    body: "Before writing code, Muron Arts engineers interactive prototypes and clean component libraries. This provides a pixel-perfect, realistic look at your product's user experience.",
  },
  {
    phase: "Phase 03",
    title: "Iterative Sprint Development & AI Training",
    body: "Muron Dev constructs modular, lightweight application frameworks while Muron AI creates, tests and integrates intelligent agentic pipelines to form a fully connected ecosystem.",
  },
  {
    phase: "Phase 04",
    title: "Vulnerability Assessment & Production Deployment",
    body: "We rigorously test every input layer, optimise page-load speed parameters, perform code-level security audits, and deploy a secure, ultra-fast configuration to the cloud.",
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
    title: "Unified Execution Model",
    body: "Most companies force you to hire separate creative designers, software engineers and data scientists. Muronlabs removes this friction by housing the creative brain (Arts), the core infrastructure (Dev) and the automation layer (AI) under a single, highly coordinated engineering roof.",
  },
  {
    title: "Performance-First Mentality",
    body: "We strictly reject slow, outdated legacy systems. We select the best-matching modern stack for each project, prioritising ultra-clean, minimal codebases optimised for loading speed, accessibility and clean search indexing.",
  },
  {
    title: "Security-First Foundation",
    body: "We treat security as a primary design requirement. Code validation, secure data extraction patterns and input safety measures are engineered natively into your platform from day one.",
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
    heading: "Company",
    links: [
      { label: "Capabilities", href: "/#capabilities" },
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
