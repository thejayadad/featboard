import { AdminRequestBoard } from "@/features/requests/components/admin-request-board";
import { mockRequests } from "@/features/requests/mock-data";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4">
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-base-content/45">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-orange-500"
        />
        Feedback management
      </p>

      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        From idea to shipped.
      </h1>

      <p className="mt-2 text-sm text-base-content/55">
        Review requests and move each idea forward.
      </p>

      <AdminRequestBoard initialRequests={mockRequests} />
    </main>
  );
}