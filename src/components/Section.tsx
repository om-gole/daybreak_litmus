import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** mono index label, e.g. "02 - Coffees" */
  index?: string;
  title: ReactNode;
  lead?: string;
  titleId: string;
}

/** Flush-left section heading. Static - no scroll motion. */
export function SectionHeader({ index, title, lead, titleId }: SectionHeaderProps) {
  return (
    <div className="section-head">
      {index && <p className="index">{index}</p>}
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

interface SectionProps {
  id: string;
  titleId: string;
  children: ReactNode;
  className?: string;
}

/** Semantic <section> shell + anchor id + aria-labelledby. */
export function Section({ id, titleId, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`section${className ? ` ${className}` : ""}`}
    >
      <div className="container">{children}</div>
    </section>
  );
}
