import Link from "next/link";
import type { FeatureRequest } from "../types";
import { RequestStatusBadge } from "./request-status-badge";

type RequestCardProps = {
  request: FeatureRequest;
};

export function RequestCard({ request }: RequestCardProps) {
  return (
    <article className="flex min-w-0 items-start gap-3 rounded-xl border border-base-300 bg-base-100 p-3 sm:p-4">
      <div
        aria-label={`${request.votes} votes`}
        className="flex h-14 w-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-base-300 bg-base-200/40 text-xs font-semibold text-base-content/60"
      >
        <span aria-hidden="true">↑</span>
        <span>{request.votes}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-3">
          <h2 className="break-words text-sm font-semibold leading-relaxed">
            <Link
              href={`/requests/${request.id}`}
              className="hover:underline"
            >
              {request.title}
            </Link>
          </h2>

          <RequestStatusBadge status={request.status} />
        </div>

        <p className="mt-1.5 break-words text-xs leading-relaxed text-base-content/60">
          {request.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-base-content/55">
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="flex size-5 items-center justify-center rounded-full bg-base-200 text-[9px] font-medium"
            >
              {request.author.name.charAt(0)}
            </span>

            {request.author.name}
          </span>

          <span aria-hidden="true">·</span>

          <Link
            href={`/requests/${request.id}#comments`}
            className="hover:underline"
          >
            {request.comments} comments
          </Link>
        </div>
      </div>
    </article>
  );
}