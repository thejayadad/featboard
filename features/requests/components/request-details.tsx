import Link from "next/link";
import type { FeatureRequest } from "../types";
import { RequestStatusBadge } from "./request-status-badge";

type RequestDetailsProps = {
  request: FeatureRequest;
};

export function RequestDetails({ request }: RequestDetailsProps) {
  const submittedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(request.createdAt));

  return (
    <main className="mx-auto max-w-3xl px-3 py-5 sm:px-4 sm:py-7">
      <Link
        href="/"
        className="text-xs text-base-content/55 hover:text-base-content"
      >
        ← All requests
      </Link>

      <article className="mt-4 rounded-xl border border-base-300 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div
            aria-label={`${request.votes} votes`}
            className="flex h-14 w-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-base-300 bg-base-200/40 text-xs font-semibold text-base-content/65"
          >
            <span aria-hidden="true">↑</span>
            {request.votes}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-base-content/40">
                REQ-{request.id.padStart(3, "0")}
              </span>

              <RequestStatusBadge status={request.status} />
            </div>

            <h1 className="mt-2 break-words text-xl font-semibold tracking-tight sm:text-2xl">
              {request.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-base-content/55">
              <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-full bg-base-200 text-[10px] font-medium"
              >
                {request.author.name.charAt(0)}
              </span>

              <span>{request.author.name}</span>

              <span aria-hidden="true">·</span>

              <time dateTime={request.createdAt}>{submittedDate}</time>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-base-300 pt-4">
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-base-content/45">
            About this idea
          </h2>

          <p className="mt-2 whitespace-pre-line break-words text-sm leading-7 text-base-content/75">
            {request.description}
          </p>
        </div>
      </article>

      <section
        id="comments"
        aria-labelledby="discussion-heading"
        className="mt-4 scroll-mt-4 overflow-hidden rounded-xl border border-base-300"
      >
        <div className="flex items-center justify-between gap-2 border-b border-base-300 px-4 py-3">
          <h2 id="discussion-heading" className="text-sm font-semibold">
            Discussion
          </h2>

          <span className="rounded-md bg-base-200 px-2 py-1 text-[10px] text-base-content/55">
            Coming next
          </span>
        </div>

        <div className="bg-base-200/20 px-4 py-8 text-center">
          <p className="text-sm font-medium">
            Good ideas start conversations.
          </p>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-base-content/55">
            This space will hold comments, questions, and updates from
            the product team.
          </p>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p className="text-base-content/50">
          Have a different improvement in mind?
        </p>

        <Link
          href="/requests/new"
          className="font-medium text-orange-600 hover:underline"
        >
          Suggest a feature →
        </Link>
      </div>
    </main>
  );
}