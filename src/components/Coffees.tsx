import { Section, SectionHeader } from "./Section";
import { Picture } from "./Picture";
import { coffees, roastLabel } from "../data/content";

export function Coffees() {
  return (
    <Section id="coffees" titleId="coffees-title">
      <SectionHeader
        index="02 - This week"
        title="Four single-origins, roasted this week"
        titleId="coffees-title"
      />

      <ul className="ctable">
        {coffees.map((coffee, i) => (
          <li className="crow" key={coffee.id}>
            <span className="crow__idx mono">0{i + 1}</span>
            <h3 className="crow__origin">
              {coffee.origin}
              <span className="crow__region mono">{coffee.region}</span>
            </h3>
            <p className="crow__notes mono">{coffee.notes.join(" · ")}</p>
            <p className="crow__roast mono">{roastLabel[coffee.roast]}</p>
          </li>
        ))}
      </ul>

      {/* Breaks out of the container, bleeding off the right edge. */}
      <div className="coffee-bleed">
        <Picture
          src="/coffees-flatlay"
          alt="Four kraft coffee bags on cream linen with scattered single-origin beans, a brass scoop, and dried botanicals."
          width={2000}
          height={1342}
          className="coffee-bleed__img"
        />
        <span className="coffee-bleed__cap mono">New single-origins every Monday</span>
      </div>
    </Section>
  );
}
