import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  titleId: string;
}

/** Section heading block with a single labelled <h2> per section. */
export function SectionHeader({ eyebrow, title, lead, titleId }: SectionHeaderProps) {
  return (
    <Reveal className="section-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

interface SectionProps {
  id: string;
  titleId: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "warm";
}

/** Semantic <section> shell with an anchor id + aria-labelledby wiring. */
export function Section({ id, titleId, children, className, tone = "default" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`section${tone === "warm" ? " section--warm" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="container">{children}</div>
    </section>
  );
}
