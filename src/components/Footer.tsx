import { brand } from "../data/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="nav__brand" aria-label={`${brand.name}, home`}>
            <span className="nav__sun" aria-hidden="true" />
            Daybreak
          </a>
          <p className="footer__tag">
            Fresh single-origin coffee, roasted in {brand.city.split(",")[0]} and
            delivered weekly.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__h">Explore</h2>
          <a href="#how">How it works</a>
          <a href="#coffees">This week's coffees</a>
          <a href="#plans">Plans</a>
          <a href="#quiz">Find your roast</a>
        </nav>

        <div className="footer__col">
          <h2 className="footer__h">Say hello</h2>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a
            href={`https://instagram.com/${brand.instagramHandle}`}
            target="_blank"
            rel="noreferrer"
          >
            Instagram {brand.instagram}
          </a>
          <span className="footer__muted">{brand.city}</span>
        </div>
      </div>

      <div className="container footer__legal">
        <span>
          © {new Date().getFullYear()} {brand.name} · Prices in USD
        </span>
        <span className="footer__muted">Made for mornings.</span>
      </div>
    </footer>
  );
}
