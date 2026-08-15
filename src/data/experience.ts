export type ExperienceItem = {
  dates: string;
  title: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    dates: "Jan 2026 – Present",
    title: "Community Ambassador",
    org: "Cursor · Tampa Bay",
    bullets: [
      "Hosted the inaugural Tampa Bay Cursor meetup: 80 RSVPs, 45 in-person attendees, 6 lightning demos, and a live Q&A with Frances Thai (SWE at Cursor).",
      "Building a local community of developers, founders, and engineering leaders through recurring meetups, workshops, and hackathons.",
      "Routing field-level feedback to the Cursor team. Logistics and marketing coordinated with Linear MCP and Claude Cowork.",
    ],
  },
  {
    dates: "Feb 2026 – May 2026",
    title: "AI Engineer Fellow",
    org: "Gauntlet AI · Cohort 4",
    bullets: [
      "Hand-selected from thousands of applicants. About 1000 hours across 10 weeks shipping 9+ AI apps and agents with demo videos.",
      "Built Talaria, a headless coding agent with Code Mode that batches tool calls into TypeScript and cuts inference calls by 60–80% per task.",
      "Shipped RAG, realtime collab, marketing automation, and educational game projects across partner and capstone work.",
    ],
  },
  {
    dates: "Feb 2025 – May 2025",
    title: "Head of BD & Developer Relations",
    org: "Kolwaii",
    bullets: [
      "Secured a strategic grant from Virtuals Protocol enabling Kolwaii's relaunch as a featured AI agent on Base.",
      "Coordinated PR including an op-ed in the AI Journal. Designed a Farcaster airdrop strategy targeting about 50K blockchain developers.",
    ],
  },
  {
    dates: "May 2023 – Present",
    title: "AI-Native SWE & DevRel",
    org: "Weeb3dev",
    bullets: [
      "Led a team that won prizes at the Coinbase AI Hackathon building a Farcaster plugin for Virtuals' GAME SDK.",
      "Published Hermes Agent / Desktop install content on YouTube, driving strong search CTR and watch time within weeks.",
      "Earned Pocket DAO retroactive funding for Scaffold-Base-Nodies, a starter kit for onchain apps.",
    ],
  },
  {
    dates: "Feb 2022 – Feb 2023",
    title: "Senior Infrastructure Sales Executive",
    org: "Pocket Network",
    bullets: [
      "Led partnerships with FUSE, Fantom, NEAR, and Gnosis. Onboarded 100M–300M API requests per day at peak.",
      "Secured a $50K NEAR Foundation grant. Drove 40M Fantom requests in the first 24 hours of RPC support.",
      "Owned a $125K Kava enterprise deal end-to-end from first call through signing.",
    ],
  },
  {
    dates: "May 2020 – Feb 2022",
    title: "Ecosystem Growth Lead",
    org: "Pocket Network",
    bullets: [
      "Turned a $700 Dark Forest tournament budget into hundreds of millions of relays and about $250K in node operator income.",
      "Ran ETHonline and ETHdenver sponsorships that produced 34 projects built.",
    ],
  },
  {
    dates: "Dec 2018 – May 2020",
    title: "Digital Marketing Manager",
    org: "Pocket Network",
    bullets: [
      "Built community channels from zero to tens of thousands across Twitter, YouTube, Discord, and Substack.",
      "Drove 25K+ views on how-to YouTube content with SEO. Wrote newsletters with above-average engagement.",
    ],
  },
  {
    dates: "2015 – 2016",
    title: "Research Team Lead (Intern)",
    org: "SOCOM J36 AML Unit",
    bullets: [
      "Presented The Future of Threat Finance at the Five Eyes Conference. Researched criminal orgs using digital currencies.",
      "Selected for the DIA's ICCAE Summer Seminar.",
    ],
  },
];
