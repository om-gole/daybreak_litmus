import { Section, SectionHeader } from "./Section";
import { Reveal } from "./Reveal";
import { steps } from "../data/content";

export function HowItWorks() {
  return (
    <Section id="how" titleId="how-title">
      <SectionHeader
        eyebrow="How it works"
        title="Good coffee, on autopilot"
        lead="Four small steps between you and a better morning."
        titleId="how-title"
      />

      <ol className="steps">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} className="step" delay={i * 0.06}>
            <span className="step__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__body">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
