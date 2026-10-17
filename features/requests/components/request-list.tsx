"use client";

import { useState } from "react";
import type { FeatureRequest, RequestStatus } from "../types";
import { requestStatuses } from "../statuses";
import { RequestCard } from "./request-card";

type RequestListProps = {
  requests: FeatureRequest[];
};

type SortOrder = "votes" | "newest";

const PAGE_SIZE = 2;

const statusOptions = Object.entries(requestStatuses) as [
  RequestStatus,
  (typeof requestStatuses)[RequestStatus],
][];

function isRequestStatus(value: string): value is RequestStatus {
  return Object.prototype.hasOwnProperty.call(requestStatuses, value);
}

export function RequestList({ requests }: RequestListProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RequestStatus | "ALL">("ALL");
  const [sort, setSort] = useState<SortOrder>("votes");
  const [page, setPage] = useState(1);

  const query = search.trim().toLowerCase();

  // Filter first, then sort the matching requests.
  const filteredRequests = requests
    .filter((request) => {
      const matchesSearch =
        `${request.title} ${request.description}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "ALL" || request.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return (
          Date.parse(b.createdAt) - Date.parse(a.createdAt) ||
          a.id.localeCompare(b.id)
        );
      }

      return b.votes - a.votes || a.id.localeCompare(b.id);
    });

  // Keep the displayed page valid if the supplied data changes.
  const totalResults = filteredRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  // Select only the requests for the current page.
  const visibleRequests = filteredRequests.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const firstResult = totalResults === 0 ? 0 : startIndex + 1;
  const lastResult = Math.min(startIndex + PAGE_SIZE, totalResults);
  const hasFilters = query.length > 0 || status !== "ALL";

  function changeSort(value: SortOrder) {
    setSort(value);
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setStatus("ALL");
    setPage(1);
  }

  return (
    <section aria-label="Browse feature requests" className="mt-5">
      <label htmlFor="request-search" className="sr-only">
        Search feature requests
      </label>

      <input
        id="request-search"
        type="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        placeholder="Search ideas before suggesting one..."
        className="input input-sm w-full border-base-300 bg-base-200/40 text-xs"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-base-300 pb-3">
        <div
          role="group"
          aria-label="Sort requests"
          className="flex items-center gap-1"
        >
          <button
            type="button"
            onClick={() => changeSort("votes")}
            aria-pressed={sort === "votes"}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              sort === "votes"
                ? "bg-base-200 text-base-content"
                : "text-base-content/50 hover:bg-base-200/60"
            }`}
          >
            Most voted
          </button>

          <button
            type="button"
            onClick={() => changeSort("newest")}
            aria-pressed={sort === "newest"}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              sort === "newest"
                ? "bg-base-200 text-base-content"
                : "text-base-content/50 hover:bg-base-200/60"
            }`}
          >
            Newest
          </button>
        </div>

        <select
          aria-label="Filter requests by status"
          value={status}
          onChange={(event) => {
            const value = event.target.value;

            if (value === "ALL" || isRequestStatus(value)) {
              setStatus(value);
              setPage(1);
            }
          }}
          className="select select-xs w-36 border-base-300 bg-base-100 text-xs"
        >
          <option value="ALL">All statuses</option>

          {statusOptions.map(([value, configuration]) => (
            <option key={value} value={value}>
              {configuration.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex min-h-10 items-center justify-between gap-2">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-[11px] text-base-content/50"
        >
          {totalResults === 0
            ? "No requests to show"
            : `Showing ${firstResult}–${lastResult} of ${totalResults} ${
                totalResults === 1 ? "request" : "requests"
              }`}
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] text-base-content/60 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="space-y-2">
        {visibleRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}

        {totalResults === 0 && (
          <div className="rounded-xl border border-dashed border-base-300 bg-base-200/30 px-4 py-10 text-center">
            <h2 className="text-sm font-semibold">
              {hasFilters ? "No matching requests" : "No requests yet"}
            </h2>

            <p className="mt-2 text-xs text-base-content/55">
              {hasFilters
                ? "Try a different search or status filter."
                : "Be the first to suggest an improvement."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-ghost btn-sm mt-3"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Request pagination"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-3"
        >
          <p className="text-[11px] text-base-content/50">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="btn btn-outline btn-xs border-base-300"
            >
              ← Previous
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="btn btn-outline btn-xs border-base-300"
            >
              Next →
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}