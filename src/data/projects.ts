export type Project = {
  title: string;
  category: string;
  blurb: string;
  stack: string[];
  context: string;
  href?: string;
};

export const projects: Project[] = [
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
