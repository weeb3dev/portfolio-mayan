export type Project = {
  title: string;
  category: string;
  blurb: string;
  stack: string[];
  context: string;
  href?: string;
  featured?: boolean;
  repoHref?: string;
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    title: "ambassador.sh",
    category: "Community Directory",
    blurb:
      "One directory for ambassador, fellows, and community programs from AI and LLM organizations. Lists 20 programs from 19 companies, from Anthropic and OpenAI to Cloudflare and Supabase, each with its own page of key facts, perks, and expectations. A Jobs page pulls live openings at those companies through a Cloudflare Worker running TinyFish Search, Fetch, and Agent. No login. Programs are submitted by email and curated into the listings.",
    stack: ["JavaScript", "HTML", "CSS", "Cloudflare Workers", "TinyFish"],
    context: "Live · Actively building",
    href: "https://ambassador.sh",
    featured: true,
    repoHref: "https://github.com/weeb3dev/ambassador.sh",
    metrics: [
      { value: "461", label: "Unique visitors in 24h · Oct 2026" },
      { value: "2.85k", label: "Unique visitors in 30 days · Oct 2026" },
    ],
  },
  {
    title: "Talaria",
    category: "Agentic System",
    blurb:
      "Sync-based headless coding agent with a reactive UI across four Docker containers. Code Mode batches LLM tool calls into TypeScript scripts, cutting inference cost so more budget goes to frontier models.",
    stack: ["TypeScript", "Docker", "Claude Opus", "GPT-5", "WebSocket"],
    context: "Gauntlet AI · Capstone",
    href: "https://www.youtube.com/@weeb3dev",
  },
  {
    title: "COBOLedu (LegacyLens)",
    category: "RAG System",
    blurb:
      "Natural-language Q&A over the GnuCOBOL codebase. Multi-pass retrieval with Voyage Code 3 embeddings, Pinecone, Voyage rerank, and Claude for generation — traced in Langfuse.",
    stack: ["Python", "LlamaIndex", "Pinecone", "Voyage", "Claude", "FastAPI"],
    context: "Gauntlet AI · Capstone",
  },
  {
    title: "CollabBoard",
    category: "Collaborative App",
    blurb:
      "Real-time collaborative whiteboard with an AI sidekick. tldraw SDK, Cloudflare Workers + Durable Objects for sync, Supabase for auth/DB, OpenAI via the Cloudflare Agents SDK.",
    stack: [
      "TypeScript",
      "tldraw",
      "Cloudflare Workers",
      "Durable Objects",
      "Supabase",
    ],
    context: "Gauntlet AI",
  },
  {
    title: "Troubleshoot K8s Bundle Analyzer",
    category: "AI Diagnostics",
    blurb:
      "Web app that ingests Kubernetes support bundles and returns structured diagnostic reports via Claude. Partner project for Replicated.",
    stack: ["Python", "FastAPI", "Claude API", "Kubernetes", "Railway"],
    context: "Gauntlet AI · Partner",
  },
  {
    title: "Ad Engine",
    category: "Autonomous Pipeline",
    blurb:
      "Autonomous ad copy system for Varsity Tutors SAT prep campaigns. Gemini Flash Lite for text, Flash for vision, Gemini image gen for creatives, Streamlit for campaign management.",
    stack: ["Python", "Gemini Flash", "Gemini Vision", "Streamlit"],
    context: "Gauntlet AI · Partner",
  },
  {
    title: "Word Detective",
    category: "Educational Game",
    blurb:
      "Multiplayer vocab game for the Board.fun touchscreen console. Unity + C#, with content reviewed by a former teacher.",
    stack: ["C#", "Unity", "Board.fun SDK", "Game Design"],
    context: "Gauntlet AI · Sprint",
  },
  {
    title: "Finance Education Agent",
    category: "Agentic System",
    blurb:
      "Conversational agent that teaches personal finance via portfolio analysis. Ghostfolio + LangGraph.js, Claude Sonnet, PostgreSQL/Prisma, Redis, Langfuse.",
    stack: ["LangGraph.js", "Claude Sonnet", "PostgreSQL", "Redis", "Langfuse"],
    context: "Gauntlet AI",
  },
  {
    title: "AI Adventure",
    category: "Hackathon Ship",
    blurb:
      "AI Dungeon-style CYOA game, solo 24-hour hackathon ship. Each scene gets narrative choices plus an image. Farcaster MiniApp via Coinbase MiniKit.",
    stack: ["Next.js", "MiniKit", "Llama 3.3", "SDXL Lightning", "Vercel"],
    context: "24hr Hackathon · NYC",
  },
];
