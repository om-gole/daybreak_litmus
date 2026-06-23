import { Section, SectionHeader } from "./Section";
import { testimonials } from "../data/content";

export function Testimonials() {
  return (
    <Section id="loved" titleId="loved-title">
      <SectionHeader
        index="05 — Word of mouth"
        title="People wait for Monday"
        titleId="loved-title"
      />

      <ul className="quotes">
        {testimonials.map((t, i) => (
          <li className="pquote" key={t.name}>
            <span className="pquote__idx mono">0{i + 1}</span>
            <blockquote className="pquote__text serif">{t.quote}</blockquote>
            <cite className="pquote__name mono">{t.name}</cite>
          </li>
        ))}
      </ul>
    </Section>
  );
}
