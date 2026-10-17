import Link from "next/link";
import { Suspense } from "react";
import { SiteNavigation } from "./site-navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-base-300">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2 sm:px-4">
        <Link
          href="/"
          aria-label="FeatureBoard home"
          className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-lg bg-neutral text-xs font-bold text-neutral-content"
          >
            F
          </span>

          <span className="text-sm font-semibold">FeatureBoard</span>
        </Link>

        <div className="order-last w-full border-t border-base-300 pt-2 sm:order-none sm:w-auto sm:border-0 sm:pt-0">
          <Suspense fallback={<NavigationFallback />}>
            <SiteNavigation />
          </Suspense>
        </div>

        <nav
          aria-label="Account navigation"
          className="flex shrink-0 items-center gap-1"
        >
          <Link
            href="/sign-in"
            className="btn btn-ghost btn-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Sign in
          </Link>

          <Link
            href="/sign-up"
            className="btn btn-neutral btn-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavigationFallback() {
  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-1"
    >
      <Link
        href="/"
        className="rounded-md px-3 py-2 text-xs font-medium text-base-content/55 hover:bg-base-200/60 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        Feedback
      </Link>

      <Link
        href="/admin"
        className="rounded-md px-3 py-2 text-xs font-medium text-base-content/55 hover:bg-base-200/60 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        Admin preview
        <span
          aria-hidden="true"
          className="ml-1.5 inline-block size-1.5 rounded-full bg-orange-500"
        />
      </Link>
    </nav>
  );
}