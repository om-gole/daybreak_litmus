import { brand } from "../data/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#top" className="footer__brand" aria-label={`${brand.name}, home`}>
            Daybreak<span aria-hidden="true">®</span>
          </a>
          <a href="#quiz" className="footer__cta">
            Find your roast →
          </a>
        </div>

        <div className="footer__cols">
          <nav className="footer__col" aria-label="Explore">
            <h2 className="footer__h mono">Explore</h2>
            <a href="#how">How it works</a>
            <a href="#coffees">This week's coffees</a>
            <a href="#plans">Plans</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="footer__col">
            <h2 className="footer__h mono">Contact</h2>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a
              href={`https://instagram.com/${brand.instagramHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              {brand.instagram}
            </a>
            <span>{brand.city}</span>
          </div>
        </div>

        <div className="footer__legal mono">
          <span>
            © {new Date().getFullYear()} {brand.name} - Prices in USD
          </span>
          <span>Made for mornings</span>
        </div>
      </div>
    </footer>
  );
}
