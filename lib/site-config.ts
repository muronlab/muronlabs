/**
 * Single source of truth for brand, navigation, contact details and the
 * marketing content that appears across the site. Edit values here and they
 * propagate to the header, footer, pages, structured data and SEO metadata.
 */

export const siteConfig = {
  name: "Muronlabs",
  tagline: "Engineering with precision. Designing with soul.",
  /** The lowercase name shown beside the μ mark in the logo ("muronlabs."). */
  wordmark: { text: "muronlabs" },
  description:
    "Muronlabs is an elite multidisciplinary technology studio. We unify high-performance software engineering, intelligent agentic AI and data science — including neuroscience data — and immersive digital artistry into a singular, seamless ecosystem.",
  /**
   * Search-result description (under 160 characters so Google shows it whole).
   * Used as the default meta description and on social shares.
   */
  seoDescription:
    "Muronlabs is a software, AI & data, and design studio in Sri Lanka, building web apps, AI agents, automation and data pipelines for teams worldwide.",
  /** Shorter blurb for cards, footers and meta where the full description is too long. */
  shortDescription:
    "A multidisciplinary technology studio unifying software engineering, AI & data science and digital artistry.",
  /** Absolute base URL of the deployed site. Override with NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muronlabs.com",
  locale: "en_GB",
  /** Signature purple, lifted from the gradient artwork. */
  accent: "#934bf0",
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
  /** One-line description shown in dropdown menus. */
  tagline?: string;
}

/**
 * Primary navigation, in header order. "Ecosystem" also opens a dropdown of
 * the divisions (see `ecosystemNav`). Only real pages belong here.
 */
export const navItems: NavItem[] = [
  { label: "About", href: "/studio", ariaLabel: "Learn about the studio" },
  { label: "Ecosystem", href: "/ecosystem", ariaLabel: "Explore our ecosystem" },
  { label: "Insights", href: "/insights", ariaLabel: "Read our insights" },
];

/** Divisions listed under the "Ecosystem" dropdown in the header. */
export const ecosystemNav: NavItem[] = [
  { label: "Muron Dev", href: "/ecosystem#muron-dev", ariaLabel: "Muron Dev — engineering", tagline: "Robust code, built for scale." },
  { label: "Muron AI & Data", href: "/ecosystem#muron-ai", ariaLabel: "Muron AI & Data — agents, automation and data science", tagline: "Agents, automation & data science." },
  { label: "Muron Arts", href: "/ecosystem#muron-arts", ariaLabel: "Muron Arts — design and brand", tagline: "Interfaces people remember." },
];

/** Primary call to action, surfaced in the header and conversion sections. */
export const primaryCta = {
  label: "Start a project",
  href: "/contact",
  ariaLabel: "Start a project with Muronlabs",
} as const;

export interface SocialItem {
  label: string;
  href: string;
  /**
   * True once `href` is the studio's real profile. Only verified profiles are
   * listed to search engines (schema.org `sameAs`), which ties them to the brand.
   */
  verified?: boolean;
}

export const socialItems: SocialItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/97878910/", verified: true },
  // Mock data — placeholder profiles, hidden until the real URLs exist.
  // Uncomment, swap in the real profile URL and set `verified: true`.
  // { label: "X (Twitter)", href: "https://x.com" },
  // { label: "GitHub", href: "https://github.com" },
];

/**
 * Real, indexable routes for the sitemap. Distinct from `navItems`, which may
 * contain in-page anchors that should never appear in the sitemap.
 */
export const siteRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/studio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ecosystem", priority: 0.9, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

/* ------------------------------------------------------------------ */
/* Ecosystem — the three specialist divisions                          */
/* ------------------------------------------------------------------ */

/** The abstract artwork drawn beside each division. */
export type ArtKind = "grid" | "diamond" | "orb" | "wave";

export interface Division {
  id: string;
  index: string;
  name: string;
  tagline: string;
  /** Short, two-beat headline used on the service cards. */
  headline: string;
  body: string;
  /**
   * Capability and approach areas for this division. Deliberately
   * outcome-focused, not a fixed tool list — we select the best-matching stack
   * per project rather than forcing one toolchain on every client.
   */
  focus: string[];
  /** Label of the "Explore" link on the service card. */
  cta: string;
  art: ArtKind;
  /** Short mark, e.g. "DEV". */
  mark: string;
  /** Detailed services, shown on the Ecosystem page. */
  services: Service[];
}

export interface Service {
  title: string;
  body: string;
  /** What typically lands at the end. */
  outputs: string[];
}

export const divisions: Division[] = [
  {
    id: "muron-dev",
    index: "01",
    name: "Muron Dev",
    tagline: "High-Performance Technical Architecture",
    headline: "Robust code. Built for extreme scale.",
    body: "We turn complex logical concepts into production-grade applications. From ultra-scalable cloud infrastructures to lightning-fast frontend ecosystems, we write robust, clean code engineered to handle extreme scale.",
    focus: [
      "Scalable Architecture",
      "Component-Driven Frontends",
      "Cloud-Native Backends",
      "Type-Safe Foundations",
      "API Design",
      "Performance Engineering",
    ],
    cta: "Explore Muron Dev",
    art: "grid",
    mark: "DEV",
    services: [
      {
        title: "Web applications & platforms",
        body: "Customer-facing products, dashboards and internal tools built on modern, type-safe stacks — fast on day one and maintainable on day one thousand.",
        outputs: ["Production web app", "Admin & dashboards", "Documentation"],
      },
      {
        title: "Mobile & cross-platform apps",
        body: "Native-feeling iOS and Android apps that share logic with your web product, so features ship everywhere at once.",
        outputs: ["iOS & Android builds", "Shared component logic", "Store release"],
      },
      {
        title: "Cloud infrastructure & DevOps",
        body: "Infrastructure as code, CI/CD, observability and cost control, so deploys are boring and outages are rare.",
        outputs: ["IaC templates", "CI/CD pipelines", "Monitoring & alerts"],
      },
      {
        title: "APIs & system integrations",
        body: "Clean APIs and reliable integrations between your CRM, ERP, payment, data and third-party tools.",
        outputs: ["API design & docs", "Integration services", "Webhooks & sync jobs"],
      },
      {
        title: "Performance & security engineering",
        body: "Load-time budgets, profiling, input-layer testing and code audits before anything reaches production.",
        outputs: ["Performance budget", "Security audit", "Hardening fixes"],
      },
      {
        title: "Legacy modernisation",
        body: "Untangle and migrate ageing systems step by step, without a risky big-bang rewrite.",
        outputs: ["Migration plan", "Incremental rebuild", "Data migration"],
      },
    ],
  },
  {
    id: "muron-ai",
    index: "02",
    name: "Muron AI & Data",
    tagline: "AI Agents, Automation & Data Science",
    headline: "Agents that do the work. Data that tells the truth.",
    body: "Move past basic analytics into true cognitive automation. We design and deploy AI agents, workflow automation, data pipelines and data science — including neuroscience data — that surface insight, cut busywork and solve critical business and research challenges.",
    focus: [
      "AI Agents",
      "Workflow Automation",
      "Data Science & Analytics",
      "Neuroscience Data",
      "Knowledge Assistants (RAG)",
      "Data Pipelines",
    ],
    cta: "Explore Muron AI & Data",
    art: "orb",
    mark: "AI",
    services: [
      {
        title: "Workflow automation",
        body: "We map how work really moves between people and tools, then connect them so copying, chasing and re-keying disappear. Approvals, reports, onboarding and order admin run on their own.",
        outputs: ["Process map", "Automated workflows", "Run-book & handover"],
      },
      {
        title: "Custom AI agents",
        body: "Assistants that handle support questions, bookings, triage and back-office tasks — with guardrails, audit logs and a clear hand-off to a person when they’re unsure.",
        outputs: ["Agent design & guardrails", "Tool integrations", "Escalation & logging"],
      },
      {
        title: "Knowledge assistants (RAG)",
        body: "Search and answer across your documents, tickets and wikis with sources attached, so your team gets answers they can verify.",
        outputs: ["Document ingestion", "Retrieval pipeline", "Chat & search UI"],
      },
      {
        title: "AI strategy & roadmap",
        body: "An honest look at where AI belongs in your business — and where it doesn’t — scored by effort, impact and risk.",
        outputs: ["Opportunity shortlist", "ROI model", "90-day roadmap"],
      },
      {
        title: "Data science & predictive analytics",
        body: "Forecasting, classification and anomaly detection on your own data, delivered as models your team can monitor and trust.",
        outputs: ["Exploratory analysis", "Production models", "Monitoring dashboards"],
      },
      {
        title: "Data engineering & pipelines",
        body: "Reliable pipelines that collect, clean and model data from every source into one place your analytics and AI can use.",
        outputs: ["Ingestion pipelines", "Data warehouse models", "Data-quality checks"],
      },
      {
        title: "Neuroscience data science",
        body: "Reproducible pipelines for EEG, MEG, fMRI, electrophysiology and behavioural data — preprocessing, BIDS curation, machine learning on neural signals and research dashboards. We build research tooling, not medical diagnosis.",
        outputs: ["Preprocessing pipeline", "BIDS-curated datasets", "Analysis & decoding models"],
      },
      {
        title: "LLM integration & fine-tuning",
        body: "Bring language models into your product safely: prompt design, evaluation suites, fine-tuning where it pays off, and cost controls.",
        outputs: ["Model selection", "Evaluation suite", "Production integration"],
      },
    ],
  },
  {
    id: "muron-arts",
    index: "03",
    name: "Muron Arts",
    tagline: "Immersive Visual Communication",
    headline: "Logic meets feeling. Interfaces people remember.",
    body: "Advanced technology requires human connection. Muron Arts bridges the gap between complex logic and exceptional human experiences. We craft high-fidelity design systems, intuitive UI/UX architectures, and unforgettable digital branding.",
    focus: [
      "UI/UX Design Systems",
      "Interaction Design",
      "Brand Identity",
      "Motion Graphics",
      "Prototyping",
      "Visual Systems",
    ],
    cta: "Explore Muron Arts",
    art: "diamond",
    mark: "ARTS",
    services: [
      {
        title: "Product UI/UX design",
        body: "Research-led interfaces for web and mobile products, designed around how people actually work.",
        outputs: ["User flows", "High-fidelity screens", "Usability testing"],
      },
      {
        title: "Design systems",
        body: "Tokens, components and documentation that keep every screen consistent and every release faster.",
        outputs: ["Design tokens", "Component library", "Usage guidelines"],
      },
      {
        title: "Brand identity",
        body: "Names, logos, type, colour and voice that make a technical product feel human and memorable.",
        outputs: ["Logo & wordmark", "Brand guidelines", "Launch assets"],
      },
      {
        title: "Interactive prototyping",
        body: "Clickable prototypes with real content, so decisions are made on something you can touch — before code.",
        outputs: ["Clickable prototype", "Stakeholder reviews", "Validated scope"],
      },
      {
        title: "Motion & interaction design",
        body: "Micro-interactions, transitions and product motion that make interfaces feel alive without slowing them down.",
        outputs: ["Motion principles", "Animated components", "Lottie & video assets"],
      },
      {
        title: "Marketing websites",
        body: "High-performance, search-friendly sites that tell your story clearly and convert visitors into conversations.",
        outputs: ["Site design", "CMS build", "SEO foundations"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Execution framework — the workflow                                  */
/* ------------------------------------------------------------------ */

export interface WorkflowPhase {
  phase: string;
  /** One-word name shown on the accordion tab. */
  short: string;
  title: string;
  body: string;
  /** What actually lands at the end of the phase. */
  deliverables: string[];
}

export const workflowPhases: WorkflowPhase[] = [
  {
    phase: "Phase 01",
    short: "Discover",
    title: "Discovery & Architecture Mapping",
    body: "We map the objective, the data and the stack before a line of code is written — so every later decision has somewhere to stand.",
    deliverables: ["Objective mapping", "Data & schema design", "Functional scope", "Stack selection"],
  },
  {
    phase: "Phase 02",
    short: "Prototype",
    title: "High-Fidelity UI/UX & System Prototyping",
    body: "Muron Arts prototypes the real interface first, so you see and touch the product before we commit to code.",
    deliverables: ["Interactive prototypes", "Component library", "Design tokens", "UX validation"],
  },
  {
    phase: "Phase 03",
    short: "Build",
    title: "Iterative Sprint Development & AI Training",
    body: "Muron Dev builds the framework while Muron AI & Data trains and wires the agent and data pipelines. You review working software every sprint.",
    deliverables: ["Modular app framework", "Agentic pipelines", "Sprint reviews", "Continuous integration"],
  },
  {
    phase: "Phase 04",
    short: "Launch",
    title: "Vulnerability Assessment & Production Deployment",
    body: "We audit every input, tune the load times, then ship to a locked-down cloud — with documentation your team can run on.",
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
    title: "Unified execution.",
    body: "Design, engineering, AI and data under one coordinated roof — no hand-off gaps.",
  },
  {
    title: "Performance first.",
    body: "Lean modern stacks, tuned for speed and search from day one.",
  },
  {
    title: "Security by default.",
    body: "Audited inputs, safe data paths and locked-down deploys, not a final-stage checklist.",
  },
  {
    title: "Design-led craft.",
    body: "Interfaces built with the same rigour as the backend that powers them.",
  },
];

/* ------------------------------------------------------------------ */
/* Headline numbers                                                    */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: "layers" | "route" | "clock";
}

export const stats: Stat[] = [
  { value: 3, suffix: "", label: "Specialist divisions under one coordinated roof.", icon: "layers" },
  { value: 4, suffix: "", label: "Phase framework from discovery to secure launch.", icon: "route" },
  { value: 24, suffix: "h", label: "Typical response time to a new project brief.", icon: "clock" },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  /** Marks the wide card with artwork and a headline number. */
  featured?: { value: number; suffix: string; label: string };
}

/** Placeholder quotes — illustrative until real client testimonials are approved. */
export const testimonials: Testimonial[] = [
  {
    text: "We came in with a long list of ideas and left with three that mattered. The first one shipped within a month, and it still runs every day.",
    name: "Ravindu Jayasinghe",
    role: "CTO, Atlas",
  },
  {
    text: "Design, engineering and AI from one team meant no hand-off gaps. The product felt whole from the very first demo.",
    name: "Mei-Lin Tan",
    role: "Head of Product, Tideline",
  },
  {
    text: "Muronlabs shipped the dispatch platform our ops team now runs every morning — and, more importantly, the team actually trusts it.",
    name: "Daniel Okafor",
    role: "Operations Director, Harbour",
    featured: { value: 35, suffix: "%", label: "Fewer late dispatches" },
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
      "All of it, under one roof. Muron Arts, Muron Dev and Muron AI & Data ship as a single coordinated team, so you avoid the friction of stitching together separate design studios, engineering shops and data-science contractors.",
  },
  {
    question: "What kind of neuroscience data work do you take on?",
    answer:
      "Muron AI & Data works with research labs, clinical-research groups and neurotech teams on EEG, MEG, fMRI, electrophysiology and behavioural data. Typical projects are preprocessing and analysis pipelines, BIDS data curation, machine-learning models on neural signals, and dashboards that make results explorable. We build research tooling; we don’t provide medical diagnosis.",
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
    question: "Who owns what you build?",
    answer:
      "You do. Code, design files, infrastructure accounts and documentation are handed over in full, with no lock-in to our tooling or our team.",
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
  { value: "muron-ai", label: "Muron AI & Data" },
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
    heading: "Explore",
    links: [
      { label: "About", href: "/studio" },
      { label: "Workflow", href: "/#workflow" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Ecosystem",
    links: [
      { label: "Muron Dev", href: "/ecosystem#muron-dev" },
      { label: "Muron AI & Data", href: "/ecosystem#muron-ai" },
      { label: "Muron Arts", href: "/ecosystem#muron-arts" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Homepage narrative copy                                             */
/* ------------------------------------------------------------------ */

export const homeCopy = {
  hero: {
    eyebrow: "Software, AI, data and design. One studio.",
    title: "Engineering with precision. Designing with soul.",
    lead: "We bring engineers, AI specialists and designers into one coordinated studio — so your product ships as a whole, not in parts.",
  },
  why: {
    eyebrow: "Why Muronlabs",
    title: "Not a software factory. A studio built around your product.",
    body: "You didn’t start a company to stitch together agencies, contractors and hand-offs. We put design, engineering, AI and data under one roof — so decisions get made once, and the product feels whole.",
  },
  about: {
    eyebrow: "About us",
    title: "A multidisciplinary studio that works inside your product — not around it.",
    body: "Muronlabs unifies high-performance software engineering, AI agents, automation and data science — including neuroscience data — and immersive digital artistry. We map the problem, prototype the experience and ship production-grade software that performs, scales and feels human.",
    link: "More about us",
  },
  ecosystem: {
    eyebrow: "Ecosystem",
    title: "Built for your product. Ready for your team.",
    intro: "Three specialist divisions, one roof. Engage one squad for a focused build, or the whole ecosystem for a product end to end.",
  },
  workflow: {
    eyebrow: "Our Workflow",
    title: "A clear path. From first sketch to secure launch.",
    intro: "Small steps. Close collaboration. Working software at the end of every phase.",
    cta: "Plan your build",
  },
  callout: {
    lines: ["You don’t need to rebuild everything.", "Just the right part."] as const,
    body: "Most engagements show working software within the first sprint — with your team in the loop at every phase.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Good work. In their words.",
    intro: "The people behind the products — and what changed once they shipped.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    intro: "The things teams ask us most, before the first call.",
  },
  finalCta: {
    title: "Let’s build what’s next.",
    body: "Design, engineering, AI and data under one coordinated roof. Built in Sri Lanka, designed for the world.",
  },
} as const;
