import { useId, useState, type FormEvent } from "react";

interface SignupFormProps {
  /** Headline above the field, e.g. the 10%-off offer. */
  prompt: string;
  cta: string;
  /** Shown after a valid submit. */
  successMessage: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Client-side email capture (no backend). Real <form> + labelled <input> so
 * it's keyboard-navigable and submits on Enter. Validates, then swaps to a
 * success state.
 */
export function SignupForm({ prompt, cta, successMessage }: SignupFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <p className="signup__success" role="status">
        <span aria-hidden="true">✦ </span>
        {successMessage}
      </p>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <label className="signup__label" htmlFor={`${id}-email`}>
        {prompt}
      </label>
      <div className="signup__row">
        <input
          id={`${id}-email`}
          className="signup__input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
        />
        <button type="submit" className="btn btn-primary signup__submit">
          {cta}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="signup__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
