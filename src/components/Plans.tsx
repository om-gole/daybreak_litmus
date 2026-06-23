import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "./Reveal";
import { plans, planNote } from "../data/content";

export function Plans() {
  return (
    <Section id="plans" titleId="plans-title">
      <SectionHeader
        eyebrow="Plans"
        title="Pick your pace"
        lead="Every plan ships fresh, weekly. Change or cancel whenever you like."
        titleId="plans-title"
      />

      <ul className="plan-grid">
        {plans.map((plan, i) => (
          <Reveal as="li" key={plan.name} delay={i * 0.06}>
            <motion.article
              className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {plan.popular && <span className="plan-card__badge">Most popular</span>}
              <h3 className="plan-card__name">{plan.name}</h3>
              <p className="plan-card__bags">{plan.bags}</p>
              <p className="plan-card__price">
                <span className="plan-card__amount">${plan.price}</span>
                <span className="plan-card__cadence">/{plan.cadence.replace("per ", "")}</span>
              </p>
              <p className="plan-card__blurb">{plan.blurb}</p>
              <a
                href="#quiz"
                className={`btn ${plan.popular ? "btn-primary" : "btn-ghost"} plan-card__cta`}
              >
                Start {plan.name}
              </a>
            </motion.article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="plan-note">
        <p>{planNote}</p>
      </Reveal>
    </Section>
  );
}
