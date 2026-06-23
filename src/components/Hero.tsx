import { motion, useReducedMotion } from "framer-motion";
import { brand } from "../data/content";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      {/* Ambient loop sits behind the cream scrim. Paused (first frame only)
          under prefers-reduced-motion; the gradient is the load fallback. */}
      {!reduce && (
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Decorative sunrise scrim — pure CSS gradient, keeps headline legible
          (AA) over the video while letting it show through lower in the frame. */}
      <div className="hero__sky" aria-hidden="true">
        <div className="hero__sun" />
      </div>

      <div className="container hero__inner">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Roasted in {brand.city.split(",")[0]} · Est. {brand.established}
        </motion.p>

        <motion.h1
          id="hero-title"
          className="hero__title"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Fresh single-origin coffee,
          <br />
          delivered every week.
        </motion.h1>

        <motion.p
          className="hero__lead"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          Every week we pick a new coffee from a single farm, roast it the day
          before it ships, and get it to your door within two days. Pause, skip,
          or cancel anytime.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <a href="#quiz" className="btn btn-primary">
            Find your roast
          </a>
          <a href="#coffees" className="btn btn-ghost">
            See this week's coffees
          </a>
        </motion.div>

        <motion.ul
          className="hero__trust"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <li>Roasted to order</li>
          <li>Ships in 2 days</li>
          <li>Cancel anytime</li>
        </motion.ul>
      </div>
    </section>
  );
}
