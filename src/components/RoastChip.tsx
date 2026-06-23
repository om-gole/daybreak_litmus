import type { RoastLevel } from "../data/content";
import { roastLabel } from "../data/content";

export function RoastChip({ roast }: { roast: RoastLevel }) {
  return (
    <span className={`roast-chip roast-chip--${roast}`}>
      <span className="roast-chip__dot" aria-hidden="true" />
      {roastLabel[roast]}
    </span>
  );
}
