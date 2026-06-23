import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Coffees } from "./components/Coffees";
import { QuizFunnel } from "./components/QuizFunnel";
import { Plans } from "./components/Plans";
import { Testimonials } from "./components/Testimonials";
import { Story } from "./components/Story";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Coffees />
        <QuizFunnel />
        <Plans />
        <Testimonials />
        <Story />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
