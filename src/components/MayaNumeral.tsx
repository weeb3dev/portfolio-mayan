import { ShellZero } from "./glyphs/ShellZero";

type Props = {
  value: number;
  className?: string;
};

/** Classic Maya bar-and-dot for 0–19 */
export function MayaNumeral({ value, className }: Props) {
  const n = Math.max(0, Math.min(19, Math.round(value)));

  if (n === 0) {
    return (
      <div className={`maya-numeral ${className ?? ""}`} aria-label="0">
        <ShellZero className="maya-shell" />
      </div>
    );
  }

  const bars = Math.floor(n / 5);
  const dots = n % 5;

  return (
    <div className={`maya-numeral ${className ?? ""}`} aria-label={String(n)}>
      {dots > 0 &&
        Array.from({ length: dots }, (_, i) => (
          <span key={`d-${i}`} className="maya-dot" />
        ))}
      {Array.from({ length: bars }, (_, i) => (
        <span key={`b-${i}`} className="maya-bar" />
      ))}
    </div>
  );
}
