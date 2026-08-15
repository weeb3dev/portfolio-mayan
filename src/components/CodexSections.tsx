import { SectionKicker } from "./glyphs/SectionKicker";
import { SteppedDivider } from "./glyphs/SteppedDivider";
import { ProjectCard } from "./ProjectCard";
import { ExperienceList } from "./ExperienceList";
import { EducationList } from "./EducationList";
import { MediaEmbeds } from "./MediaEmbeds";
import { projects } from "../data/projects";
import { experience } from "../data/experience";
import { education } from "../data/education";

export function CodexSections() {
  return (
    <div className="codex" id="codex">
      <div className="codex-inner">
        <section className="section" id="story">
          <SectionKicker index={1} label="Kin — Story" />
          <h2>How I got here</h2>
          <p>
            Go-To-Market roles for a decade, then software and AI engineering.
            Instrumental in scaling Pocket Network from 0 to 1, driving billions
            of API requests by expanding supported blockchains, onboarding
            strategic partnerships, closing deals, and executing creative growth
            strategies end-to-end. In the Spring of 2026, I graduated from
            Gauntlet's AI Engineering Fellowship where I shipped LLM-integrated
            applications and agents over 10 intensive weeks.
          </p>
          <p className="quote">
            “I still think like GTM. I can not only market and sell, but also
            code and build with agents!”
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

        <section className="section" id="experience">
          <SectionKicker index={3} label="Tun — Experience" />
          <h2>Experience</h2>
          <p>Growth and partnerships first. AI engineering next.</p>
          <ExperienceList items={experience} />
        </section>

        <SteppedDivider />

        <section className="section" id="education">
          <SectionKicker index={4} label="Katun — Education" />
          <h2>Education</h2>
          <EducationList items={education} />
        </section>

        <SteppedDivider />

        <section className="section" id="media">
          <SectionKicker index={5} label="Baktun — Media" />
          <h2>Building in public</h2>
          <p>
            DevRel content and Cursor community events in the Tampa Bay area.
          </p>
          <MediaEmbeds />
        </section>

        <SteppedDivider />

        <section className="section" id="contact">
          <SectionKicker index={6} label="Contact" />
          <h2>Let’s talk</h2>
          <p>
            Looking for Technical GTM, Product Marketing, Developer Relations,
            and AI Engineering roles. Happy to chat about tech startups, AI
            developer tools, LLMs, agents, sustainability, and gardening.
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
            <a
              className="btn btn-ghost"
              href="https://x.com/weeb3dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </div>
        </section>

        <footer className="footer">
          <span>Alberto Jauregui</span>
          <span>Tampa Bay · Built with Cursor</span>
        </footer>
      </div>
    </div>
  );
}
