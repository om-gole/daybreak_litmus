import { useId, useState, type FormEvent } from "react";

interface SignupFormProps {
  prompt: string;
  cta: string;
  successMessage: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm({ prompt, cta, successMessage }: SignupFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <p className="signup__success mono" role="status">
        {successMessage}
      </p>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <label className="signup__label mono" htmlFor={`${id}-email`}>
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
        <button type="submit" className="btn btn-solid signup__submit">
          {cta}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="signup__error mono" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
