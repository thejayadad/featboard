import Link from "next/link";
import { RequestCard } from "@/features/requests/components/request-card";
import { mockRequests } from "@/features/requests/mock-data";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-3 py-5 sm:px-4 sm:py-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-base-content/45">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-orange-500"
            />
            Product feedback
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            What should we build next?
          </h1>

          <p className="mt-2 text-sm text-base-content/55">
            Share an idea. Support a request. Follow its progress.
          </p>
        </div>

        <Link
          href="/requests/new"
          className="btn btn-sm shrink-0 self-start border-orange-500 bg-orange-500 text-white shadow-none hover:border-orange-600 hover:bg-orange-600 sm:self-auto"
        >
          <span aria-hidden="true">+</span>
          Suggest a feature
        </Link>
      </div>

      <section
        aria-label="Feature requests"
        className="mt-5 space-y-2"
      >
        {mockRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </section>
    </main>
  );
}