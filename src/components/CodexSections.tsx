const projects = [
  {
    title: "Talaria",
    blurb:
      "Sync-based headless coding agent with a reactive UI. Code Mode batches LLM tool calls into TypeScript to cut inference cost.",
    tag: "Agentic",
  },
  {
    title: "COBOLedu",
    blurb:
      "Natural-language Q&A over GnuCOBOL via multi-pass RAG — Voyage embeddings, Pinecone, rerank, Claude generation.",
    tag: "RAG",
  },
  {
    title: "CollabBoard",
    blurb:
      "Real-time collaborative whiteboard with an AI sidekick on Cloudflare Workers, Durable Objects, and Supabase.",
    tag: "Realtime",
  },
  {
    title: "AI Adventure",
    blurb:
      "Solo 24-hour Farcaster MiniApp — branching CYOA with Llama 3.3 and SDXL Lightning scene images.",
    tag: "Hackathon",
  },
];

export function CodexSections() {
  return (
    <div className="codex" id="codex">
      <div className="codex-inner">
        <section className="section" id="story">
          <div className="section-kicker">Kin — Story</div>
          <h2>How I got here</h2>
          <p>
            GTM for a decade, then engineering. Both still show up in the work.
            Pocket Network partnerships drove billions of API requests. In 2025 I
            joined Gauntlet AI (~1000 hours) shipping agentic systems and
            full-stack apps.
          </p>
          <p className="quote">
            “I still think like GTM. I just write the code now too.”
          </p>
          <p>
            Looking at Developer Relations and founding-engineer roles at
            early-stage startups — architect the agent, write the landing copy,
            demo it to developers.
          </p>
        </section>

        <section className="section" id="work">
          <div className="section-kicker">Uinal — Work</div>
          <h2>Selected projects</h2>
          <p>Coding agents, RAG over COBOL, realtime collab, games. Shipped and demoed.</p>
          <div className="work-list">
            {projects.map((p, i) => (
              <article className="work-item" key={p.title}>
                <span className="work-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="work-title">{p.title}</h3>
                  <p className="work-meta">{p.blurb}</p>
                </div>
                <span className="work-tag">{p.tag}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-kicker">Tun — Contact</div>
          <h2>Let’s talk</h2>
          <p>
            Looking for Developer Relations and AI engineering roles. Happy to
            talk startups, developer tools, and agents.
          </p>
          <div className="contact-row">
            <a className="btn btn-primary" href="mailto:alberto@weeb3.dev">
              Email
            </a>
            <a
              className="btn btn-ghost"
              href="https://linkedin.com/in/albertojauregui"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/weeb3dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.youtube.com/@weeb3dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </section>

        <footer className="footer">
          <span>Alberto Jauregui — Codex v0</span>
          <span>Tampa Bay · Built with Three.js</span>
        </footer>
      </div>
    </div>
  );
}
