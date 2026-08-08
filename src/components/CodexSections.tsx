import { SectionKicker } from "./glyphs/SectionKicker";
import { SteppedDivider } from "./glyphs/SteppedDivider";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";

export function CodexSections() {
  return (
    <div className="codex" id="codex">
      <div className="codex-inner">
        <section className="section" id="story">
          <SectionKicker index={1} label="Kin — Story" />
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

        <SteppedDivider />

        <section className="section" id="work">
          <SectionKicker index={2} label="Uinal — Work" />
          <h2>Selected projects</h2>
          <p>
            Coding agents, RAG over COBOL, realtime collab, games. Shipped and
            demoed.
          </p>
          <div className="project-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </section>

        <SteppedDivider />

        <section className="section" id="contact">
          <SectionKicker index={3} label="Tun — Contact" />
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
