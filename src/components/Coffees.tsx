import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "./Reveal";
import { RoastChip } from "./RoastChip";
import { coffees } from "../data/content";

export function Coffees() {
  return (
    <Section id="coffees" titleId="coffees-title" tone="warm">
      <SectionHeader
        eyebrow="On the roaster"
        title="This week's coffees"
        lead="Four single-origins, roasted this week. New ones land every Monday."
        titleId="coffees-title"
      />

      <ul className="coffee-grid">
        {coffees.map((coffee, i) => (
          <Reveal as="li" key={coffee.id} delay={i * 0.06}>
            {/* hover lift lives on this inner child, separate from the
                Reveal wrapper's entry transform */}
            <motion.article
              className="coffee-card"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="coffee-card__top">
                <RoastChip roast={coffee.roast} />
                <span className="coffee-card__index" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="coffee-card__origin">
                {coffee.origin}
                <span className="coffee-card__region">{coffee.region}</span>
              </h3>
              <ul className="coffee-card__notes" aria-label="Tasting notes">
                {coffee.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </motion.article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
