import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { brand } from "../data/content";

export function Story() {
  return (
    <Section id="story" titleId="story-title">
      <div className="story">
        <Reveal className="story__main">
          <p className="eyebrow">Our story</p>
          <h2 id="story-title" className="section-title">
            Started in a coffee line, in {brand.established}
          </h2>
          <p className="story__body">
            Two friends met waiting for the same cafe and decided coffee should be
            fresher, more traceable, and a lot more fun. We work directly with
            farmers, roast in small batches, and ship the day after — so what
            lands on your counter still tastes like the farm it came from.
          </p>
          <p className="story__body">
            We care about the planet, too: our bags are fully compostable.
          </p>
        </Reveal>

        <Reveal className="story__aside" delay={0.1}>
          <aside className="story-card" aria-label="A few things about us">
            <ul className="story-card__list">
              <li>
                <span className="story-card__k">Roasted in</span>
                <span className="story-card__v">{brand.city}</span>
              </li>
              <li>
                <span className="story-card__k">Sourcing</span>
                <span className="story-card__v">Direct trade, small batch</span>
              </li>
              <li>
                <span className="story-card__k">Packaging</span>
                <span className="story-card__v">Fully compostable bags</span>
              </li>
              <li>
                <span className="story-card__k">Morale</span>
                <span className="story-card__v">Marlowe, our dog, in on Tuesdays</span>
              </li>
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
