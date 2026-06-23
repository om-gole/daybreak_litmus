import { motion, useReducedMotion } from "framer-motion";
import { brand } from "../data/content";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid">
        <motion.div
          className="hero__copy"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mono hero__eyebrow">
            Roasted in {brand.city.split(",")[0]} - Est. {brand.established}
          </p>

          <h1 id="hero-title" className="hero__title">
            Fresh
            <br />
            single-origin
            <br />
            coffee<span className="hero__dot">.</span>
          </h1>

          <p className="hero__sub">
            Every week we pick a new coffee from a single farm, roast it the day
            before it ships, and land it at your door within two days.
          </p>

          <div className="hero__actions">
            <a href="#quiz" className="btn btn-solid">
              Find your roast
            </a>
            <a href="#coffees" className="btn-link">
              This week's coffees →
            </a>
          </div>
        </motion.div>

        <div className="hero__media" aria-hidden="true">
          {/* Bleeds off the right edge. Paused first-frame under reduced motion. */}
          {!reduce && (
            <video
              className="hero__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              tabIndex={-1}
            >
              <source src="/hero-loop.mp4" type="video/mp4" />
            </video>
          )}
          <span className="hero__media-tag mono">No. 001 - The pour</span>
        </div>
      </div>

      <ul className="hero__meta mono" aria-label="What you get">
        <li>Roasted to order</li>
        <li>Ships in 2 days</li>
        <li>Pause / cancel anytime</li>
        <li>US &amp; Canada</li>
      </ul>
    </section>
  );
}
