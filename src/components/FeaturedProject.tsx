import { GlyphBlock } from "./glyphs/GlyphBlock";
import { ShellZero } from "./glyphs/ShellZero";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

export function FeaturedProject({ project }: Props) {
  return (
    <article className="project-featured">
      <div className="project-featured-main">
        <div className="project-card-top">
          <GlyphBlock size="sm">
            <ShellZero className="maya-shell" />
          </GlyphBlock>
          <span className="project-featured-kicker">Featured</span>
          <span className="project-card-category">{project.category}</span>
        </div>

        <h3 className="project-featured-title">{project.title}</h3>
        <p className="project-featured-blurb">{project.blurb}</p>

        <ul className="project-card-stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="project-featured-aside">
        {project.metrics && project.metrics.length > 0 && (
          <ul className="project-featured-metrics">
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <span className="project-featured-metric-value">
                  {metric.value}
                </span>
                <span className="project-featured-metric-label">
                  {metric.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <span className="project-card-context">{project.context}</span>

        <div className="project-featured-actions">
          {project.href && (
            <a
              className="btn btn-primary"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repoHref && (
            <a
              className="btn btn-ghost"
              href={project.repoHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
