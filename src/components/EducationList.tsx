import type { EducationItem } from "../data/education";

type Props = {
  items: EducationItem[];
};

function ProgramItem({ item }: { item: EducationItem }) {
  if (item.href) {
    return (
      <a
        className="edu-item edu-item--compact edu-item--link"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="edu-item-head">
          <h3 className="edu-title">{item.title}</h3>
          <span className="edu-link-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <p className="edu-detail">{item.detail}</p>
      </a>
    );
  }
  return (
    <article className="edu-item edu-item--compact">
      <h3 className="edu-title">{item.title}</h3>
      <p className="edu-detail">{item.detail}</p>
    </article>
  );
}

export function EducationList({ items }: Props) {
  const degrees = items.filter((i) => i.kind === "degree");
  const programs = items.filter((i) => i.kind === "program");

  return (
    <div className="edu-list">
      <div className="edu-group">
        {degrees.map((item) => (
          <article className="edu-item" key={item.title}>
            <h3 className="edu-title">{item.title}</h3>
            <p className="edu-detail">{item.detail}</p>
          </article>
        ))}
      </div>
      <div className="edu-group edu-group--programs">
        <p className="edu-group-label">Programs & certifications</p>
        {programs.map((item) => (
          <ProgramItem item={item} key={item.title} />
        ))}
      </div>
    </div>
  );
}
