"use client";

import { useState, type FormEvent } from "react";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";

  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();

    if (isSignUp && name.length < 2) {
      setNotice("Enter a name with at least two characters.");
      return;
    }

    setNotice(
      isSignUp
        ? "The form passed the preview checks. Account creation is not connected yet."
        : "The form passed the preview checks. Sign-in is not connected yet.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setNotice("")}
      className="mt-5 space-y-4"
    >
      {isSignUp && (
        <div>
          <label htmlFor="name" className="text-xs font-semibold">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            className="input input-sm mt-2 w-full border-base-300 bg-base-100 text-xs"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="text-xs font-semibold">
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="input input-sm mt-2 w-full border-base-300 bg-base-100 text-xs"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-xs font-semibold">
          Password
        </label>

        <div className="mt-2 flex items-center gap-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            minLength={isSignUp ? 12 : undefined}
            maxLength={128}
            placeholder={
              isSignUp ? "Create a password" : "Enter your password"
            }
            aria-describedby={isSignUp ? "password-hint" : undefined}
            className="input input-sm min-w-0 flex-1 border-base-300 bg-base-100 text-xs"
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-controls="password"
            aria-pressed={showPassword}
            aria-label="Show password"
            className="btn btn-ghost btn-xs w-12 shrink-0"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {isSignUp && (
          <p
            id="password-hint"
            className="mt-2 text-[10px] text-base-content/50"
          >
            Use at least 12 characters. A longer passphrase works well.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-sm w-full border-orange-500 bg-orange-500 text-white shadow-none hover:border-orange-600 hover:bg-orange-600"
      >
        {isSignUp ? "Check sign-up form" : "Check sign-in form"}
      </button>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-xs leading-relaxed text-base-content/55"
      >
        {notice || "Preview only. Authentication is not connected yet."}
      </p>
    </form>
  );
}