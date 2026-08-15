import type { ExperienceItem } from "../data/experience";

type Props = {
  items: ExperienceItem[];
};

export function ExperienceList({ items }: Props) {
  return (
    <div className="exp-list">
      {items.map((item) => (
        <article className="exp-item" key={`${item.org}-${item.title}-${item.dates}`}>
          <div className="exp-meta">
            <span className="exp-dates">{item.dates}</span>
            <h3 className="exp-title">{item.title}</h3>
            <span className="exp-org">{item.org}</span>
          </div>
          <ul className="exp-bullets">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
