import { useReducer } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { RoastChip } from "./RoastChip";
import { SignupForm } from "./SignupForm";
import {
  coffees,
  quizSteps,
  recommend,
  roastLabel,
  type QuizOption,
} from "../data/content";

interface QuizState {
  step: number; // 0..quizSteps.length (last index = result)
  answers: (QuizOption | undefined)[];
}

type Action =
  | { type: "answer"; index: number; option: QuizOption }
  | { type: "back" }
  | { type: "reset" };

const initialState: QuizState = {
  step: 0,
  answers: Array(quizSteps.length).fill(undefined),
};

// Pure reducer - no side effects, so StrictMode's double-invoke is harmless.
function quizReducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "answer": {
      const answers = state.answers.slice();
      answers[action.index] = action.option;
      return { step: state.step + 1, answers };
    }
    case "back":
      return { ...state, step: Math.max(0, state.step - 1) };
    case "reset":
      return { step: 0, answers: Array(quizSteps.length).fill(undefined) };
    default:
      return state;
  }
}

export function QuizFunnel() {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const isResult = state.step >= quizSteps.length;

  const variants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -40 }),
  };

  return (
    <Section id="quiz" titleId="quiz-title">
      <SectionHeader
        index="03 - Taste profile"
        title="Find your roast in 30 seconds"
        lead="Three quick questions. We'll match you to this week's coffee that fits how you drink."
        titleId="quiz-title"
      />

      <div className="quiz">
        {/* Progress */}
        <div className="quiz__progress" aria-hidden="true">
          {quizSteps.map((s, i) => (
            <span
              key={s.id}
              className={`quiz__pip${
                i < state.step ? " is-done" : i === state.step ? " is-active" : ""
              }`}
            />
          ))}
        </div>

        <div className="quiz__stage">
          {/* mode="wait" => exiting step fully unmounts before the next mounts;
              no opacity:0 orphans left in the DOM */}
          <AnimatePresence mode="wait" custom={1} initial={false}>
            {!isResult ? (
              <motion.div
                key={quizSteps[state.step].id}
                className="quiz__step"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="quiz__count mono">
                  Question {String(state.step + 1).padStart(2, "0")} /{" "}
                  {String(quizSteps.length).padStart(2, "0")}
                </p>
                <h3 className="quiz__question">{quizSteps[state.step].question}</h3>
                <p className="quiz__helper">{quizSteps[state.step].helper}</p>

                <div
                  className="quiz__options"
                  role="group"
                  aria-label={quizSteps[state.step].question}
                >
                  {quizSteps[state.step].options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className="quiz__option"
                      onClick={() =>
                        dispatch({ type: "answer", index: state.step, option })
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {state.step > 0 && (
                  <button
                    type="button"
                    className="quiz__back"
                    onClick={() => dispatch({ type: "back" })}
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <Result
                key="result"
                answers={state.answers}
                variants={variants}
                onReset={() => dispatch({ type: "reset" })}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Result({
  answers,
  variants,
  onReset,
}: {
  answers: (QuizOption | undefined)[];
  variants: Variants;
  onReset: () => void;
}) {
  const coffee = recommend(answers);
  const number = coffees.findIndex((c) => c.id === coffee.id) + 1;

  return (
    <motion.div
      className="quiz__result"
      custom={1}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="quiz__result-head">
        <p className="quiz__count mono">Your match - No. 0{number}</p>
        <RoastChip roast={coffee.roast} />
      </div>

      <h3 className="quiz__match-name">
        {coffee.origin} <span className="mono">{coffee.region}</span>
      </h3>
      <p className="quiz__match-why">{coffee.match}</p>
      <ul className="quiz__match-notes mono" aria-label="Tasting notes">
        {coffee.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      <SignupForm
        prompt={`Enter your email for 10% off your first ${coffee.origin} ${roastLabel[
          coffee.roast
        ].toLowerCase()}.`}
        cta="Claim 10% off"
        successMessage={`You're in - your ${coffee.origin} ${coffee.region} ships Monday. Check your inbox for the code.`}
      />

      <button type="button" className="quiz__back" onClick={onReset}>
        ↺ Start over
      </button>
    </motion.div>
  );
}
