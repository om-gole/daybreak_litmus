import { Section, SectionHeader } from "./Section";
import { steps } from "../data/content";

export function HowItWorks() {
  return (
    <Section id="how" titleId="how-title">
      <SectionHeader
        index="01 - How it works"
        title="Good coffee, on autopilot"
        titleId="how-title"
      />

      <ol className="steps">
        {steps.map((step, i) => (
          <li className="step" key={step.title}>
            <span className="step__num mono">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__body">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
