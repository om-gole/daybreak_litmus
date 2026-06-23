import { useEffect, useState } from "react";

/**
 * Persistent glassmorphic CTA, always in peripheral vision once you're past the
 * hero - but suppressed while the quiz or footer is on screen (where it would be
 * redundant). One IntersectionObserver, disconnected on unmount (StrictMode-safe).
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#top");
    const quiz = document.querySelector("#quiz");
    const footer = document.querySelector("footer");
    const watched = [hero, quiz, footer].filter(Boolean) as Element[];
    if (!watched.length) return;

    const onScreen = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) onScreen.set(e.target, e.isIntersecting);
        const heroVisible = hero ? onScreen.get(hero) : false;
        const quizVisible = quiz ? onScreen.get(quiz) : false;
        const footerVisible = footer ? onScreen.get(footer) : false;
        // Show only once the hero has scrolled away and we're not at quiz/footer.
        setVisible(!heroVisible && !quizVisible && !footerVisible);
      },
      { threshold: 0 }
    );

    watched.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#quiz"
      className={`sticky-cta mono${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Find your roast <span aria-hidden="true">→</span>
    </a>
  );
}
