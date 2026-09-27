import { Marquee } from "./Marquee";
import { skillCategories } from "../data/skills";

const topRow = [...skillCategories[0].items, ...skillCategories[1].items];
const bottomRow = [...skillCategories[2].items, ...skillCategories[3].items];

/**
 * A recurring divider band used between sections across the whole page:
 * two rows of skill keywords, scrolling in opposite directions. Decorative
 * (the same skills are listed accessibly in the Skills section), so it's
 * fully aria-hidden via the underlying Marquee component.
 */
export function SkillsMarquee() {
  return (
    <div className="relative py-7 space-y-4 border-y border-border bg-bg-elevated/40 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <Marquee items={topRow} direction="left" duration={40} />
      <Marquee items={bottomRow} direction="right" duration={36} />
    </div>
  );
}
