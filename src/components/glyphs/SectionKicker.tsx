import { GlyphBlock } from "./GlyphBlock";
import { MayaNumeral } from "../MayaNumeral";

type Props = {
  index: number;
  label: string;
};

export function SectionKicker({ index, label }: Props) {
  return (
    <div className="section-kicker">
      <GlyphBlock size="sm">
        <MayaNumeral value={index} className="maya-numeral--inline" />
      </GlyphBlock>
      <span className="section-kicker-label">{label}</span>
    </div>
  );
}
