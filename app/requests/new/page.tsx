import Link from "next/link";
import { RequestForm } from "@/features/requests/components/request-form";

export default function NewRequestPage() {
  return (
    <main className="mx-auto max-w-2xl px-3 py-5 sm:px-4 sm:py-7">
      <Link
        href="/"
        className="text-xs text-base-content/55 hover:text-base-content"
      >
        ← All requests
      </Link>

      <div className="mt-4">
        <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-base-content/45">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-orange-500"
          />
          Share your idea
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Suggest a feature
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-base-content/55">
          Tell us what you’d like to see and how it would help.
        </p>
      </div>

      <RequestForm />
    </main>
  );
}