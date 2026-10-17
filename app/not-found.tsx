import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-3 py-12 sm:px-4 sm:py-20">
      <div className="overflow-hidden rounded-xl border border-base-300">
        <div className="p-5 sm:p-7">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-base-content/50">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-orange-500"
            />
            Page not found
          </p>

          <span
            aria-hidden="true"
            className="mt-5 block text-7xl font-semibold tracking-tighter text-base-content/15"
          >
            404
          </span>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            We couldn’t find that page.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-base-content/60">
            The address may be incorrect, or the content may no longer
            be available. Head back to the feedback board to explore
            the latest requests.
          </p>

          <Link
            href="/"
            className="btn btn-sm mt-6 border-orange-500 bg-orange-500 text-white shadow-none hover:border-orange-600 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            ← Back to feedback
          </Link>
        </div>

        <div className="border-t border-base-300 bg-base-200/30 px-5 py-3 sm:px-7">
          <p className="text-xs leading-relaxed text-base-content/50">
            Looking for an idea? Search the board by title or keyword.
          </p>
        </div>
      </div>
    </main>
  );
}