import { useEffect, useState } from "react";
import { brand } from "../data/content";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#coffees", label: "Coffees" },
  { href: "#plans", label: "Plans" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label={`${brand.name}, home`}>
          <span className="nav__sun" aria-hidden="true" />
          Daybreak
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#quiz" className="btn btn-primary nav__cta">
          Find your roast
        </a>
      </div>
    </header>
  );
}
