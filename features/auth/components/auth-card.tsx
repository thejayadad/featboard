import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="mx-auto w-full max-w-md px-3 py-5 sm:px-4 sm:py-10">
      <Link
        href="/"
        className="text-xs text-base-content/55 hover:text-base-content"
      >
        ← Back to feedback
      </Link>

      <section className="mt-4 overflow-hidden rounded-xl border border-base-300">
        <div className="p-4 sm:p-5">
          <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-base-content/45">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-orange-500"
            />
            Your voice matters
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-base-content/55">
            {description}
          </p>

          {children}
        </div>

        <div className="border-t border-base-300 bg-base-200/30 px-4 py-4 text-center text-xs text-base-content/60">
          {footer}
        </div>
      </section>
    </main>
  );
}