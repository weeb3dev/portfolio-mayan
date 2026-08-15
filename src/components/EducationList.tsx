import type { EducationItem } from "../data/education";

type Props = {
  items: EducationItem[];
};

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
          <article className="edu-item edu-item--compact" key={item.title}>
            <h3 className="edu-title">{item.title}</h3>
            <p className="edu-detail">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
