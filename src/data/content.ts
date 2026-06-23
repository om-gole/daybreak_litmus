// Single source of truth for all Daybreak copy.
// The original site hardcoded everything inline; here it's typed data the
// UI (and the Taste Profile quiz) read from.

export type RoastLevel = "light" | "medium" | "dark";
export type Brew = "espresso" | "pourover" | "drip" | "frenchpress";
export type FlavorFamily = "bright" | "balanced" | "bold" | "chocolatey";

export type CoffeeId = "ethiopia" | "colombia" | "sumatra" | "guatemala";

export interface Coffee {
  id: CoffeeId;
  origin: string;
  region: string;
  notes: string[];
  roast: RoastLevel;
  /** one-line pitch shown on the quiz result card */
  match: string;
}

export const coffees: Coffee[] = [
  {
    id: "ethiopia",
    origin: "Ethiopia",
    region: "Yirgacheffe",
    notes: ["Floral", "Citrus", "Tea-like"],
    roast: "light",
    match: "Delicate and aromatic — a light roast that tastes like morning.",
  },
  {
    id: "colombia",
    origin: "Colombia",
    region: "Huila",
    notes: ["Caramel", "Red apple", "Balanced"],
    roast: "medium",
    match: "The everyday crowd-pleaser — sweet, smooth, and endlessly drinkable.",
  },
  {
    id: "sumatra",
    origin: "Sumatra",
    region: "Mandheling",
    notes: ["Cocoa", "Cedar", "Full body"],
    roast: "dark",
    match: "Deep and earthy — a dark roast with weight and a long finish.",
  },
  {
    id: "guatemala",
    origin: "Guatemala",
    region: "Antigua",
    notes: ["Chocolate", "Orange", "Spice"],
    roast: "medium",
    match: "Rich and rounded — chocolate and warm spice with a citrus lift.",
  },
];

export const roastLabel: Record<RoastLevel, string> = {
  light: "Light roast",
  medium: "Medium roast",
  dark: "Dark roast",
};

export interface Step {
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    title: "Tell us how you brew",
    body: "Espresso, pour over, drip, or French press — we tune the grind and pick to match.",
  },
  {
    title: "We roast to order",
    body: "Every week we choose a single-origin coffee and roast it the day before it ships.",
  },
  {
    title: "It lands within 2 days",
    body: "Fresh coffee arrives at your door within two days of roasting. You brew it. You're happy.",
  },
  {
    title: "Stay in control",
    body: "Pause, skip, or cancel anytime from your account. No commitment, ever.",
  },
];

export interface Plan {
  name: string;
  bags: string;
  price: number;
  cadence: string;
  blurb: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Solo",
    bags: "One 12oz bag",
    price: 18,
    cadence: "per week",
    blurb: "Just enough for one serious morning ritual.",
  },
  {
    name: "Duo",
    bags: "Two 12oz bags",
    price: 32,
    cadence: "per week",
    blurb: "For households that go through it — or a generous solo habit.",
    popular: true,
  },
  {
    name: "Office",
    bags: "Five 12oz bags",
    price: 75,
    cadence: "per week",
    blurb: "Keep the whole team caffeinated and slightly more pleasant.",
  },
];

export const planNote =
  "Shipping included. Cancel anytime. First bag ships within 3 days of signup.";

export interface Testimonial {
  quote: string;
  name: string;
}

// Deduped: the original listed "Sarah M." twice.
export const testimonials: Testimonial[] = [
  { quote: "Best coffee I've ever had.", name: "Sarah M." },
  { quote: "I look forward to it every Monday.", name: "James T." },
  { quote: "The Ethiopia one changed my life, honestly.", name: "Priya K." },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  { q: "Can I pause?", a: "Yes — pause anytime from your account page." },
  { q: "Do you ship internationally?", a: "Currently the US and Canada only." },
  {
    q: "Is it organic?",
    a: "Most of our roasts are organic; a few aren't. It's always marked on the bag.",
  },
  {
    q: "What if I don't like it?",
    a: "Email us and we'll make it right. We want you drinking coffee you love.",
  },
  { q: "Where are you located?", a: "Oakland, California." },
];

export const brand = {
  name: "Daybreak Coffee Co.",
  established: 2019,
  city: "Oakland, California",
  email: "hello@daybreak.example",
  instagram: "@daybreakcoffee",
  instagramHandle: "daybreakcoffee",
};

/* ------------------------------------------------------------------ */
/* Taste Profile quiz                                                  */
/* ------------------------------------------------------------------ */

export interface QuizOption {
  label: string;
  /** weights added to each coffee when this option is picked */
  weights: Partial<Record<CoffeeId, number>>;
}

export interface QuizStep {
  id: string;
  question: string;
  helper: string;
  options: QuizOption[];
}

export const quizSteps: QuizStep[] = [
  {
    id: "brew",
    question: "How do you brew?",
    helper: "We tune the pick to the cup you actually make.",
    options: [
      { label: "Espresso", weights: { sumatra: 2, guatemala: 1 } },
      { label: "Pour over", weights: { ethiopia: 2, colombia: 1 } },
      { label: "Drip", weights: { colombia: 2, guatemala: 1 } },
      { label: "French press", weights: { sumatra: 2, guatemala: 1 } },
    ],
  },
  {
    id: "flavor",
    question: "What flavors pull you in?",
    helper: "Chase the notes you reach for first.",
    options: [
      { label: "Bright & fruity", weights: { ethiopia: 3 } },
      { label: "Sweet & balanced", weights: { colombia: 3 } },
      { label: "Rich & bold", weights: { sumatra: 3 } },
      { label: "Chocolatey & spiced", weights: { guatemala: 3 } },
    ],
  },
  {
    id: "roast",
    question: "How dark do you take it?",
    helper: "Roast level shapes everything after the first sip.",
    options: [
      { label: "Light", weights: { ethiopia: 2 } },
      { label: "Medium", weights: { colombia: 1, guatemala: 1 } },
      { label: "Dark", weights: { sumatra: 2 } },
    ],
  },
];

/**
 * Pure, deterministic recommender. Sums option weights per coffee and returns
 * the top scorer. Order of `coffees` is the stable tiebreak. Exported so it can
 * be exercised directly in verification.
 */
export function recommend(answers: (QuizOption | undefined)[]): Coffee {
  const scores = new Map<CoffeeId, number>(coffees.map((c) => [c.id, 0]));
  for (const answer of answers) {
    if (!answer) continue;
    for (const [id, w] of Object.entries(answer.weights)) {
      scores.set(id as CoffeeId, (scores.get(id as CoffeeId) ?? 0) + (w ?? 0));
    }
  }
  let best = coffees[0];
  let bestScore = -1;
  for (const coffee of coffees) {
    const score = scores.get(coffee.id) ?? 0;
    if (score > bestScore) {
      best = coffee;
      bestScore = score;
    }
  }
  return best;
}
