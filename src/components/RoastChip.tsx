import type { RoastLevel } from "../data/content";
import { roastLabel } from "../data/content";

export function RoastChip({ roast }: { roast: RoastLevel }) {
  return (
    <span className={`roast mono roast--${roast}`}>
      <span className="roast__dot" aria-hidden="true" />
      {roastLabel[roast]}
    </span>
  );
}
