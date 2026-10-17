"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function RequestForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim().length < 5) {
      setNotice("Enter a title with at least 5 non-padding characters.");
      return;
    }

    if (description.trim().length < 20) {
      setNotice("Enter a description with at least 20 non-padding characters.");
      return;
    }

    setNotice(
      "Your form passed the preview checks. Saving will be connected after authentication and database setup.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 overflow-hidden rounded-xl border border-base-300"
    >
      <div className="space-y-5 p-4 sm:p-5">
        <div>
          <label htmlFor="title" className="text-xs font-semibold">
            Feature title
            <span aria-hidden="true" className="ml-1 text-orange-600">
              *
            </span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setNotice("");
            }}
            required
            minLength={5}
            maxLength={120}
            placeholder="Example: Export notes as PDF"
            aria-describedby="title-hint title-count"
            className="input input-sm mt-2 w-full border-base-300 bg-base-100 text-xs"
          />

          <div className="mt-2 flex justify-between gap-3 text-[10px] text-base-content/50">
            <p id="title-hint">Required. Keep it clear and specific.</p>
            <span id="title-count" className="shrink-0">
              {title.length}/120
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-xs font-semibold">
            Description
            <span aria-hidden="true" className="ml-1 text-orange-600">
              *
            </span>
          </label>

          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setNotice("");
            }}
            required
            minLength={20}
            maxLength={3000}
            rows={7}
            placeholder="What problem would this solve? How would you use it?"
            aria-describedby="description-hint description-count"
            className="textarea mt-2 w-full resize-y border-base-300 bg-base-100 text-sm leading-relaxed"
          />

          <div className="mt-2 flex justify-between gap-3 text-[10px] text-base-content/50">
            <p id="description-hint">
              Required. Include at least 20 characters and a practical example.
            </p>
            <span id="description-count" className="shrink-0">
              {description.length}/3000
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-base-300 bg-base-200/40 p-3">
          <p className="text-xs font-medium">Check for a similar idea</p>

          <p className="mt-1 text-xs leading-relaxed text-base-content/55">
            Supporting an existing request keeps votes and discussion together.
          </p>

          <Link
            href="/"
            className="mt-2 inline-block text-[11px] font-medium text-orange-600 hover:underline"
          >
            Browse existing requests →
          </Link>
        </div>
      </div>

      <div className="border-t border-base-300 bg-base-200/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="btn btn-ghost btn-sm">
            Cancel
          </Link>

          <button
            type="submit"
            className="btn btn-sm border-orange-500 bg-orange-500 text-white shadow-none hover:border-orange-600 hover:bg-orange-600"
          >
            Check request
          </button>
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-3 text-xs leading-relaxed text-base-content/60"
        >
          {notice || "Preview only. Requests are not saved yet."}
        </p>
      </div>
    </form>
  );
}