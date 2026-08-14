import type { ReactNode } from "react";
import { GlyphBlock } from "./glyphs/GlyphBlock";
import { MayaNumeral } from "./MayaNumeral";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
  index: number;
};

function CardShell({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <a
        className="project-card"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return <article className="project-card">{children}</article>;
}

export function ProjectCard({ project, index }: Props) {
  const numeral = Math.min(index + 1, 19);

  return (
    <CardShell href={project.href}>
      <div className="project-card-top">
        <GlyphBlock size="sm">
          <MayaNumeral value={numeral} className="maya-numeral--inline" />
        </GlyphBlock>
        <span className="project-card-category">{project.category}</span>
        {project.href && (
          <span className="project-card-link" aria-hidden="true">
            ↗
          </span>
        )}
      </div>

      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-blurb">{project.blurb}</p>

      <ul className="project-card-stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <span className="project-card-context">{project.context}</span>
    </CardShell>
  );
}
