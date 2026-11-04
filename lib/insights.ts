/**
 * Insights — the studio's notes. Each post renders as a card on /insights
 * and as its own page at /insights/[slug]. Add a post by appending an entry.
 *
 * These are starter articles written in the studio's voice; review and edit
 * them (and the author names) before launch.
 */

export interface InsightSection {
  heading: string;
  paragraphs: string[];
}

export interface Insight {
  slug: string;
  /** Two-line phrase printed on the card cover. */
  cover: string;
  /** Cover tone: charcoal or pale blue, as on the reference. */
  tone: "dark" | "light";
  title: string;
  excerpt: string;
  tags: string[];
  /** ISO date, e.g. "2026-10-14". */
  date: string;
  readTime: string;
  author: { name: string; role: string };
  sections: InsightSection[];
}

export const insightsCopy = {
  eyebrow: "Insights",
  title: "Notes from building software, AI and brain-data systems.",
  intro: "What we learn inside real projects — written for the people who run products and research teams, not for benchmark charts.",
  newsletter: {
    eyebrow: "Newsletter",
    title: "One useful idea, every other week.",
    body: "Short notes from real projects: what worked, what didn’t, and what we’d do differently. No hype, no hot takes.",
    note: "Unsubscribe any time.",
  },
} as const;

export const insights: Insight[] = [
  {
    slug: "start-with-the-boring-system",
    cover: "Start with the dull one.",
    tone: "dark",
    title: "The first system you rebuild should be the boring one.",
    excerpt: "Big-bang rewrites stall. The quiet, repetitive workflow nobody loves is where a new architecture earns trust fastest.",
    tags: ["Engineering", "Getting started"],
    date: "2026-10-14",
    readTime: "5 min read",
    author: { name: "Muron Dev", role: "Engineering" },
    sections: [
      {
        heading: "Why the exciting rewrite usually stalls",
        paragraphs: [
          "Teams love to start with the flagship feature. It has the most visibility, the most opinions and the most edge cases — which is exactly why a first project there tends to drag.",
          "A boring workflow has clear inputs, clear outputs and people who will happily tell you where it hurts. That makes it the perfect place to prove a new stack.",
        ],
      },
      {
        heading: "What ‘boring’ buys you",
        paragraphs: [
          "You ship in weeks, not quarters. You get real performance numbers and real usage. And you build the deployment, monitoring and testing habits the bigger rebuild will need anyway.",
        ],
      },
      {
        heading: "How we pick it",
        paragraphs: [
          "We look for work that is frequent, rules-based and annoying: report generation, data syncing between tools, approval queues. If people would cheer when it disappears, it is a good candidate.",
        ],
      },
    ],
  },
  {
    slug: "eeg-preprocessing-decides-your-results",
    cover: "Clean signal first.",
    tone: "light",
    title: "Why EEG preprocessing quietly decides your results.",
    excerpt: "Filtering, referencing and artefact rejection are not housekeeping. Small choices here change what your statistics can find.",
    tags: ["Neuroscience", "Data pipelines"],
    date: "2026-10-02",
    readTime: "7 min read",
    author: { name: "Muron AI & Data", role: "Neuroscience data" },
    sections: [
      {
        heading: "Preprocessing is analysis",
        paragraphs: [
          "Every EEG study makes dozens of early decisions: filter cut-offs, re-referencing scheme, how to handle eye blinks and muscle noise, which epochs to drop. Each one shapes the signal that reaches your model.",
          "When those steps live in a few hand-edited scripts, two people on the same team can get different answers from the same recordings.",
        ],
      },
      {
        heading: "Make every step explicit",
        paragraphs: [
          "We build preprocessing as a versioned pipeline: parameters in one config file, every step logged, every rejected epoch recorded with a reason. Rerunning a study becomes a single command, not an archaeology project.",
        ],
      },
      {
        heading: "Check the pipeline, not just the result",
        paragraphs: [
          "Automated quality reports — channel noise, rejection rates per participant, spectra before and after cleaning — catch problems long before they surface as a strange effect in the final figure.",
        ],
      },
    ],
  },
  {
    slug: "ready-for-an-ai-agent",
    cover: "Ready for an agent?",
    tone: "light",
    title: "Five signs your team is ready for an AI agent.",
    excerpt: "Agents work best on repeatable decisions with a clear escalation path. Here is how to tell if you have one.",
    tags: ["AI agents", "Strategy"],
    date: "2026-09-18",
    readTime: "6 min read",
    author: { name: "Muron AI & Data", role: "AI agents" },
    sections: [
      {
        heading: "The work repeats",
        paragraphs: [
          "If the same kinds of questions or tasks arrive every day, an agent has something to learn from — and you have a baseline to measure against.",
        ],
      },
      {
        heading: "There is a right answer most of the time",
        paragraphs: [
          "Agents shine when a good answer can be checked: a booking confirmed, a record updated, a document drafted against a template. Open-ended judgement calls should stay with people.",
        ],
      },
      {
        heading: "Someone owns the edge cases",
        paragraphs: [
          "The best agent knows when to stop. We design every agent with a clear hand-off to a named person, and log every escalation so the system improves over time.",
          "If nobody on the team wants to own that loop, it is too early for an agent.",
        ],
      },
    ],
  },
  {
    slug: "prototype-the-real-interface",
    cover: "Show, then build.",
    tone: "dark",
    title: "Why we prototype the real interface before writing production code.",
    excerpt: "A clickable prototype settles arguments a spec never will — and it costs a fraction of rebuilding the wrong screen.",
    tags: ["Design", "Process"],
    date: "2026-09-04",
    readTime: "4 min read",
    author: { name: "Muron Arts", role: "Design" },
    sections: [
      {
        heading: "Specs hide disagreements",
        paragraphs: [
          "Two people can read the same requirements document and picture two different products. A prototype makes the differences visible on day three instead of month three.",
        ],
      },
      {
        heading: "Prototype with real content",
        paragraphs: [
          "We build prototypes with real data, real copy and the real component library, so what people react to is close to what will ship. Lorem ipsum hides the hardest design problems.",
        ],
      },
    ],
  },
  {
    slug: "organise-neuroimaging-data-with-bids",
    cover: "Make it findable.",
    tone: "dark",
    title: "Organising neuroimaging data so the next study is easier.",
    excerpt: "Adopting BIDS feels like overhead until the second study, a new student or a journal’s data-sharing request arrives.",
    tags: ["Neuroscience", "Data curation"],
    date: "2026-08-21",
    readTime: "6 min read",
    author: { name: "Muron AI & Data", role: "Neuroscience data" },
    sections: [
      {
        heading: "Folders are a data model",
        paragraphs: [
          "Most labs start with a folder per participant and a spreadsheet of notes. It works until it doesn’t: renamed files, missing metadata and scans nobody can match to a session.",
        ],
      },
      {
        heading: "Why BIDS pays off",
        paragraphs: [
          "The Brain Imaging Data Structure gives MRI, EEG, MEG and behavioural data a shared layout and metadata format. Standard tools can then read your dataset directly, and sharing it becomes a packaging step rather than a rescue mission.",
        ],
      },
      {
        heading: "Converting without stopping research",
        paragraphs: [
          "We convert existing datasets in batches, validate each one automatically, and set up the acquisition side so new sessions land in BIDS from the start.",
        ],
      },
    ],
  },
  {
    slug: "measure-before-you-tune",
    cover: "Measure, then tune.",
    tone: "light",
    title: "How we measure performance before we promise speed.",
    excerpt: "Fast is a number, not a feeling. We set budgets, measure real devices and only then decide what to optimise.",
    tags: ["Performance", "Engineering"],
    date: "2026-08-07",
    readTime: "5 min read",
    author: { name: "Muron Dev", role: "Engineering" },
    sections: [
      {
        heading: "Agree the budget first",
        paragraphs: [
          "Before any optimisation, we agree targets for load time, interaction latency and payload size on the devices your users actually own.",
        ],
      },
      {
        heading: "Measure in the field",
        paragraphs: [
          "Lab tests on a fast laptop flatter everyone. Real-user monitoring shows where time is really spent, and usually points at two or three fixes that matter far more than the rest.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((p) => p.slug === slug);
}

/** "14 Oct 2026" — a fixed locale so server and client render the same text. */
export function formatInsightDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
