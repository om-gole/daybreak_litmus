import { Section } from "./Section";
import { Picture } from "./Picture";
import { brand } from "../data/content";

const FACTS = [
  ["Roasted in", brand.city],
  ["Sourcing", "Direct trade, small batch"],
  ["Packaging", "Fully compostable bags"],
  ["Morale", "Marlowe, our dog, in on Tuesdays"],
] as const;

export function Story() {
  return (
    <Section id="story" titleId="story-title" className="story-section">
      <div className="story">
        <div className="story__media">
          <Picture
            src="/story-roastery"
            alt="A roaster cupping a handful of fresh-roasted beans over an open bag beside a drum roaster."
            width={2000}
            height={1342}
            className="story__img"
          />
        </div>

        <div className="story__copy">
          <p className="index">06 - Our story</p>
          <h2 id="story-title" className="story__title">
            Started in a coffee line, in {brand.established}
          </h2>
          <p className="story__body">
            Two friends met waiting for the same cafe and decided coffee should be
            fresher, more traceable, and a lot more fun. We work directly with
            farmers, roast in small batches, and ship the day after - so what lands
            on your counter still tastes like the farm it came from.
          </p>

          <dl className="specs">
            {FACTS.map(([k, v]) => (
              <div className="spec" key={k}>
                <dt className="spec__k mono">{k}</dt>
                <dd className="spec__v">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
