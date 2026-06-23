import { Section, SectionHeader } from "./Section";
import { Reveal } from "./Reveal";
import { testimonials } from "../data/content";

export function Testimonials() {
  return (
    <Section id="loved" titleId="loved-title" tone="warm">
      <SectionHeader
        eyebrow="Word of mouth"
        title="People wait for Monday"
        titleId="loved-title"
      />

      <ul className="quote-grid">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.06}>
            <figure className="quote-card">
              <blockquote className="quote-card__text">"{t.quote}"</blockquote>
              <figcaption className="quote-card__name">— {t.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
