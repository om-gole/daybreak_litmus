import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** stagger offset in seconds */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}

/**
 * Scroll-in wrapper. Owns ONLY the entry transform (fade + rise) so that any
 * hover/tap motion on child elements never fights this motion value
 * (wrapper/child separation). Honors prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
