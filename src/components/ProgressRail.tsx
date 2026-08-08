import { MayaNumeral } from "./MayaNumeral";
import { useScrollProgress } from "../hooks/useScrollProgress";

export function ProgressRail() {
  const progress = useScrollProgress();
  // Map scroll to Maya 0–19 for the Long Count feel
  const value = Math.round(progress * 19);

  return (
    <aside className="progress-rail" aria-hidden="true">
      <MayaNumeral value={value} />
      <span className="progress-label">Long Count</span>
    </aside>
  );
}
