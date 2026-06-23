import { Section, SectionHeader } from "./Section";
import { plans, planNote } from "../data/content";

export function Plans() {
  return (
    <Section id="plans" titleId="plans-title">
      <SectionHeader
        index="04 — Plans"
        title="Pick your pace"
        titleId="plans-title"
      />

      <ul className="ptable">
        {plans.map((plan) => (
          <li className={`prow${plan.popular ? " prow--popular" : ""}`} key={plan.name}>
            <div className="prow__head">
              <h3 className="prow__name">{plan.name}</h3>
              {plan.popular && <span className="prow__flag mono">Most popular</span>}
            </div>
            <p className="prow__bags mono">{plan.bags}</p>
            <p className="prow__price">
              <span className="prow__amount">${plan.price}</span>
              <span className="prow__cadence mono">/ wk</span>
            </p>
            <p className="prow__blurb">{plan.blurb}</p>
            <a href="#quiz" className="btn-link prow__cta">
              Start {plan.name} →
            </a>
          </li>
        ))}
      </ul>

      <p className="ptable__note mono">{planNote}</p>
    </Section>
  );
}
